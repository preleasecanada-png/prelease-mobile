import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert, StyleSheet,
} from 'react-native';
import { Colors } from '../../theme';
import { ApplicationService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const ApplicationDetailScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApp();
  }, []);

  const fetchApp = async () => {
    try {
      const res = await ApplicationService.get(id);
      if (res?.status === 200) setApp(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleWithdraw = () => {
    Alert.alert('Withdraw', 'Are you sure you want to withdraw this application?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Withdraw', style: 'destructive', onPress: async () => {
          try {
            const res = await ApplicationService.withdraw(id);
            if (res?.status === 200) {
              Alert.alert('Success', 'Application withdrawn');
              fetchApp();
            } else {
              Alert.alert('Error', res?.message || 'Failed');
            }
          } catch (e) {
            Alert.alert('Error', 'Something went wrong');
          }
        },
      },
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  if (!app) return <View style={styles.center}><Text style={styles.emptyText}>Application not found</Text></View>;

  const statusColor = { submitted: '#0d6efd', under_review: '#0dcaf0', approved: '#198754', rejected: '#dc3545', withdrawn: '#6c757d' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application #{app.id}</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.statusBar, { backgroundColor: statusColor[app.status] || '#6c757d' }]}>
          <Text style={styles.statusText}>{app.status?.replace(/_/g, ' ').toUpperCase()}</Text>
        </View>

        <Text style={styles.sectionTitle}>Property</Text>
        <Text style={styles.value}>{app.property?.title || '—'}</Text>

        <Text style={styles.sectionTitle}>Details</Text>
        <InfoRow label="Employment" value={app.employment_status} />
        <InfoRow label="Monthly Income" value={`$${Number(app.monthly_income || 0).toLocaleString()}`} />
        <InfoRow label="Occupants" value={app.number_of_occupants} />
        <InfoRow label="Pets" value={app.has_pets ? `Yes — ${app.pet_details}` : 'No'} />
        <InfoRow label="Move-in Date" value={app.desired_move_in ? new Date(app.desired_move_in).toLocaleDateString() : '—'} />
        <InfoRow label="Lease Duration" value={app.desired_lease_duration?.replace('_', ' ')} />
        <InfoRow label="Current Address" value={app.current_address} />

        {app.cover_letter ? (
          <>
            <Text style={styles.sectionTitle}>Cover Letter</Text>
            <Text style={styles.value}>{app.cover_letter}</Text>
          </>
        ) : null}

        {app.documents?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Documents ({app.documents.length})</Text>
            {app.documents.map((doc) => (
              <View key={doc.id} style={styles.docRow}>
                <View>
                  <Text style={styles.docType}>{doc.document_type?.replace(/_/g, ' ')}</Text>
                  <Text style={styles.docName}>{doc.file_name}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: doc.verification_status === 'verified' ? '#198754' : doc.verification_status === 'rejected' ? '#dc3545' : '#ffc107' }]}>
                  <Text style={styles.badgeText}>{doc.verification_status}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {app.landlord_notes ? (
          <>
            <Text style={styles.sectionTitle}>Landlord Notes</Text>
            <Text style={styles.value}>{app.landlord_notes}</Text>
          </>
        ) : null}

        {app.rejection_reason ? (
          <>
            <Text style={[styles.sectionTitle, { color: '#dc3545' }]}>Rejection Reason</Text>
            <Text style={[styles.value, { color: '#dc3545' }]}>{app.rejection_reason}</Text>
          </>
        ) : null}

        {app.status === 'submitted' && (
          <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
            <Text style={styles.withdrawBtnText}>Withdraw Application</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || '—'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  statusBar: { paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  statusText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  value: { fontSize: 14, color: '#333', lineHeight: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 14, color: '#333', fontWeight: '500' },
  docRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  docType: { fontSize: 14, fontWeight: '500', textTransform: 'capitalize' },
  docName: { fontSize: 12, color: '#999', marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  withdrawBtn: { borderWidth: 1, borderColor: '#dc3545', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
  withdrawBtnText: { color: '#dc3545', fontSize: 16, fontWeight: '600' },
  emptyText: { fontSize: 16, color: '#999' },
});

export default ApplicationDetailScreen;
