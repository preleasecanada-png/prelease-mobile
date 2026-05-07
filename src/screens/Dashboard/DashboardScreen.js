import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StyleSheet, RefreshControl,
} from 'react-native';
import { Colors } from '../../theme';
import { DashboardService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const StatCard = ({ icon, label, value, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      <Icon name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value ?? '—'}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DashboardStatsScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.app?.user);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await DashboardService.stats();
      if (res?.data) setStats(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
    setRefreshing(false);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchStats(); }} tintColor={Colors.primary} />}
      >
        <Text style={styles.welcome}>Welcome, {user?.name || 'User'}</Text>
        <Text style={styles.role}>{user?.role === 'host' ? 'Landlord' : 'Renter'} Dashboard</Text>

        <View style={styles.grid}>
          <StatCard icon="home" label="Properties" value={stats?.properties_count} color="#0d6efd" />
          <StatCard icon="file-text" label="Applications" value={stats?.applications_count} color="#198754" />
          <StatCard icon="file" label="Leases" value={stats?.leases_count} color="#6f42c1" />
          <StatCard icon="credit-card" label="Payments" value={stats?.payments_count} color="#fd7e14" />
          <StatCard icon="bell" label="Notifications" value={stats?.notifications_count} color="#dc3545" />
          <StatCard icon="tool" label="Maintenance" value={stats?.maintenance_count} color="#0dcaf0" />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {[
            { icon: 'file-text', label: 'Applications', screen: 'ApplicationsList' },
            { icon: 'file', label: 'Leases', screen: 'LeasesList' },
            { icon: 'credit-card', label: 'Payments', screen: 'PaymentsList' },
            { icon: 'tool', label: 'Maintenance', screen: 'MaintenanceList' },
            { icon: 'bell', label: 'Notifications', screen: 'Notification' },
          ].map(item => (
            <TouchableOpacity
              key={item.screen}
              style={styles.actionItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.actionLeft}>
                <Icon name={item.icon} size={18} color={Colors.primary} />
                <Text style={styles.actionLabel}>{item.label}</Text>
              </View>
              <Icon name="chevron-right" size={18} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
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
  welcome: { fontSize: 22, fontWeight: '700', color: '#000' },
  role: { fontSize: 14, color: '#666', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '48%', backgroundColor: '#fafafa', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 4 },
  statIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValue: { fontSize: 24, fontWeight: '800', color: '#000' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  quickActions: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  actionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  actionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionLabel: { fontSize: 15, color: '#333' },
});

export default DashboardStatsScreen;
