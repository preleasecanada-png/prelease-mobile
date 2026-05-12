import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, StyleSheet, RefreshControl,
} from 'react-native';
import { Colors } from '../../theme';
import { LeaseService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const statusColors = {
  draft: '#6c757d',
  pending_signature: '#0d6efd',
  active: '#198754',
  terminated: '#dc3545',
  expired: '#ffc107',
};

const LeasesScreen = ({ navigation }) => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(s => s.app?.user);
  const role = user?.role === 'host' ? 'host' : 'renter';

  useEffect(() => { fetchLeases(); }, []);

  const fetchLeases = async () => {
    try {
      const res = await LeaseService.list(role);
      if (res?.data) setLeases(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>{item.property?.title || 'Lease'}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[item.status] || '#6c757d' }]}>
          <Text style={styles.badgeText}>{item.status?.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Start</Text>
          <Text style={styles.value}>{item.start_date ? new Date(item.start_date).toLocaleDateString() : '—'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>End</Text>
          <Text style={styles.value}>{item.end_date ? new Date(item.end_date).toLocaleDateString() : '—'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Rent</Text>
          <Text style={styles.value}>${Number(item.monthly_rent || 0).toLocaleString()}/mo</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Leases</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={leases}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchLeases(); }} tintColor={Colors.primary} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="file" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No leases yet</Text>
          </View>
        }
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
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#eee', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { flex: 1 },
  label: { fontSize: 12, color: '#999', marginBottom: 2 },
  value: { fontSize: 14, color: '#333', fontWeight: '500' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#999', marginTop: 12 },
});

export default LeasesScreen;
