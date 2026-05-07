import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  ActivityIndicator, StyleSheet, RefreshControl, Alert,
} from 'react-native';
import { Colors } from '../../theme';
import { MaintenanceService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const statusColors = {
  pending: '#ffc107',
  in_progress: '#0dcaf0',
  completed: '#198754',
  cancelled: '#6c757d',
};
const priorityColors = { low: '#198754', medium: '#ffc107', high: '#fd7e14', emergency: '#dc3545' };

const MaintenanceScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try {
      const res = await MaintenanceService.list();
      if (res?.data) setRequests(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
    setRefreshing(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await MaintenanceService.create({ title, description, priority: 'medium' });
      if (res?.data) {
        Alert.alert('Success', 'Maintenance request created!');
        setShowForm(false);
        setTitle('');
        setDescription('');
        fetch();
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to create request.');
    }
    setSubmitting(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[item.status] || '#6c757d' }]}>
          <Text style={styles.badgeText}>{item.status?.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.row}>
        <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority] || '#6c757d' }]}>
          <Text style={styles.badgeText}>{item.priority?.toUpperCase()}</Text>
        </View>
        <Text style={styles.date}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</Text>
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
        <Text style={styles.headerTitle}>Maintenance</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.backBtn}>
          <Icon name={showForm ? 'x' : 'plus'} size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]} placeholder="Describe the issue..." value={description} onChangeText={setDescription} multiline />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
            <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit Request'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetch(); }} tintColor={Colors.primary} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="tool" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No maintenance requests</Text>
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
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  form: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, backgroundColor: '#fafafa', marginBottom: 10 },
  submitBtn: { backgroundColor: '#D80621', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#eee', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: '600', flex: 1, marginRight: 8 },
  desc: { fontSize: 13, color: '#666', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 11, color: '#999' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#999', marginTop: 12 },
});

export default MaintenanceScreen;
