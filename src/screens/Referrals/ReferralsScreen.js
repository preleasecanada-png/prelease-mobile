import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, StyleSheet, Alert, RefreshControl, Share,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors } from '../../theme';
import { ReferralService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const FRONTEND_URL = 'https://preleasecanada.ca';

const ReferralsScreen = ({ navigation }) => {
  const [referrals, setReferrals] = useState([]);
  const [code, setCode] = useState(null);
  const [link, setLink] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const buildLink = (c) => (c ? `${FRONTEND_URL}/sign-up?ref=${c}` : null);

  const fetchData = async () => {
    try {
      const res = await ReferralService.myReferrals();
      if (res?.data) {
        const existingCode = res.data.current_referral_code || null;
        setCode(existingCode);
        setLink(buildLink(existingCode));
        setReferrals(res.data.referrals || []);
        setStats(res.data.stats || {});
      }
    } catch (e) { console.error('myReferrals error', e); }
    setLoading(false);
    setRefreshing(false);
  };

  const handleGenerate = async () => {
    try {
      const res = await ReferralService.generateCode();
      const newCode = res?.data?.referral_code;
      if (newCode) {
        setCode(newCode);
        setLink(res?.data?.referral_link || buildLink(newCode));
        Alert.alert('Success', 'Referral code generated!');
        fetchData();
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to generate code.');
    }
  };

  const copyCode = () => {
    if (code) {
      Clipboard.setString(code);
      Alert.alert('Copied!', 'Referral code copied to clipboard.');
    }
  };

  const shareLink = async () => {
    if (!link) return;
    try {
      await Share.share({
        message: `Join Prelease Canada with my referral code ${code} and I'll earn a 5% bonus on your first payment!\n${link}`,
      });
    } catch (e) { console.log('share error', e); }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Referrals</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.codeSection}>
        {code ? (
          <>
            <TouchableOpacity style={styles.codeBox} onPress={copyCode}>
              <Text style={styles.codeLabel}>Your Referral Code</Text>
              <Text style={styles.codeText}>{code}</Text>
              <Text style={styles.copyHint}>Tap to copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={shareLink}>
              <Icon name="share-2" size={18} color="#fff" />
              <Text style={styles.generateText}>Share Link</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
            <Icon name="gift" size={20} color="#fff" />
            <Text style={styles.generateText}>Generate Referral Code</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.bonusHint}>Earn <Text style={styles.bonusPct}>{stats?.bonus_percentage || 5}%</Text> when your referral completes their first payment.</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats?.total_referrals || 0}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#198754' }]}>{stats?.completed || 0}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#ffc107' }]}>{stats?.pending_referrals || stats?.registered || 0}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#D80621' }]}>${Number(stats?.total_earned || 0).toFixed(0)}</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Referrals</Text>
      <FlatList
        data={referrals}
        renderItem={({ item }) => {
          const referredName = item.referred
            ? `${item.referred.first_name || ''} ${item.referred.last_name || ''}`.trim()
            : (item.referred_user?.name || 'Pending');
          const badgeColor = item.status === 'completed' ? '#198754' : item.status === 'registered' ? '#0dcaf0' : '#ffc107';
          return (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.name}>{referredName}</Text>
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                  <Text style={styles.badgeText}>{item.status?.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.date}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</Text>
                {item.remuneration_paid ? (
                  <Text style={styles.reward}>+${Number(item.remuneration_amount || 0).toFixed(2)}</Text>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={Colors.primary} />}
        ListEmptyComponent={<View style={styles.empty}><Icon name="users" size={48} color="#ccc" /><Text style={styles.emptyText}>No referrals yet</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  codeSection: { padding: 16 },
  codeBox: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  codeLabel: { fontSize: 13, color: '#999', marginBottom: 6 },
  codeText: { fontSize: 28, fontWeight: '800', color: '#D80621', letterSpacing: 3 },
  copyHint: { fontSize: 11, color: '#bbb', marginTop: 6 },
  generateBtn: { backgroundColor: '#D80621', paddingVertical: 14, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  shareBtn: { backgroundColor: '#D80621', paddingVertical: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 12 },
  generateText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  bonusHint: { fontSize: 12, color: '#666', marginTop: 12, textAlign: 'center' },
  bonusPct: { color: '#D80621', fontWeight: '700' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8, gap: 8 },
  statBox: { flex: 1, backgroundColor: '#f8f8f8', borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#000' },
  statLabel: { fontSize: 11, color: '#777', marginTop: 2 },
  reward: { fontSize: 13, fontWeight: '700', color: '#198754' },
  sectionTitle: { fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginTop: 10, marginBottom: 6 },
  list: { paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '600' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  date: { fontSize: 12, color: '#999', marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 14, color: '#999', marginTop: 10 },
});

export default ReferralsScreen;
