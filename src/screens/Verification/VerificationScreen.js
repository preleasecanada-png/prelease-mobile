import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, StyleSheet, Alert, ScrollView,
} from 'react-native';
import { Colors } from '../../theme';
import { VerificationService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const VerificationScreen = ({ navigation }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStatus(); }, []);

  const fetchStatus = async () => {
    try {
      const res = await VerificationService.status();
      if (res?.data) setStatus(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  const isVerified = status?.identity_verified && status?.address_verified;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.statusCard, { borderColor: isVerified ? '#198754' : '#ffc107' }]}>
          <Icon name={isVerified ? 'check-circle' : 'alert-circle'} size={40} color={isVerified ? '#198754' : '#ffc107'} />
          <Text style={styles.statusText}>{isVerified ? 'Verified' : 'Verification Needed'}</Text>
          <Text style={styles.statusSub}>{isVerified ? 'Your identity has been verified.' : 'Please submit documents to verify your identity.'}</Text>
        </View>

        <View style={styles.itemCard}>
          <View style={styles.itemRow}>
            <Icon name="user" size={20} color="#333" />
            <Text style={styles.itemTitle}>Identity Verification</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: status?.identity_verified ? '#198754' : '#ffc107' }]}>
            <Text style={styles.badgeText}>{status?.identity_verified ? 'VERIFIED' : 'PENDING'}</Text>
          </View>
        </View>

        <View style={styles.itemCard}>
          <View style={styles.itemRow}>
            <Icon name="home" size={20} color="#333" />
            <Text style={styles.itemTitle}>Address Verification</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: status?.address_verified ? '#198754' : '#ffc107' }]}>
            <Text style={styles.badgeText}>{status?.address_verified ? 'VERIFIED' : 'PENDING'}</Text>
          </View>
        </View>

        {!isVerified && (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => Alert.alert('Info', 'Document upload will be available in the next update.')}
          >
            <Icon name="upload" size={18} color="#fff" />
            <Text style={styles.submitText}>Submit Documents</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16 },
  statusCard: { alignItems: 'center', padding: 24, borderRadius: 16, borderWidth: 2, marginBottom: 20, backgroundColor: '#fafafa' },
  statusText: { fontSize: 20, fontWeight: '700', marginTop: 10 },
  statusSub: { fontSize: 13, color: '#666', marginTop: 4, textAlign: 'center' },
  itemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemTitle: { fontSize: 15, fontWeight: '600' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  submitBtn: { backgroundColor: '#D80621', paddingVertical: 14, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default VerificationScreen;
