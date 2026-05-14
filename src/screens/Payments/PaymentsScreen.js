import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, StyleSheet, RefreshControl,
} from 'react-native';
import { Colors } from '../../theme';
import { PaymentService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const statusColors = {
  pending: '#ffc107',
  completed: '#198754',
  failed: '#dc3545',
  refunded: '#0dcaf0',
};

const PaymentsScreen = ({ navigation }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(s => s.app?.user);
  const role = (user?.role === 'host' || user?.role === 'landlord') ? 'host' : 'renter';

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      const res = await PaymentService.list(role);
      if (res?.data) setPayments(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>${Number(item.amount || 0).toLocaleString()}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[item.status] || '#6c757d' }]}>
          <Text style={styles.badgeText}>{item.status?.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{item.lease?.property?.title || 'Payment'}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Method: {item.payment_method || '—'}</Text>
        <Text style={styles.label}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</Text>
      </View>
    </View>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={payments}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchPayments(); }} tintColor={Colors.primary} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="credit-card" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No payments yet</Text>
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  title: { fontSize: 20, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, color: '#999' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#999', marginTop: 12 },
});

export default PaymentsScreen;
