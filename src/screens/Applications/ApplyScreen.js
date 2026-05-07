import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert, ScrollView,
  TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Colors } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import { ApplicationService } from '../../services';

const LEASE_OPTIONS = ['month_to_month', '6_months', '1_year', '2_years'];

function ApplyScreen({ navigation, route }) {
  const property = route?.params?.property;
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('1_year');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!monthlyIncome || !moveInDate) {
      Alert.alert('Error', 'Please fill in income and move-in date.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await ApplicationService.create({
        property_id: property?.id,
        monthly_income: parseFloat(monthlyIncome),
        desired_move_in: moveInDate,
        desired_lease_duration: leaseDuration,
        message: message.trim() || undefined,
      });
      if (res?.data || res?.application || res?.id) {
        Alert.alert('Success', 'Your application has been submitted!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else if (res?.errors) {
        Alert.alert('Error', Object.values(res.errors).flat().join('\n'));
      } else {
        Alert.alert('Error', res?.message || 'Failed to submit application.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Apply to Rent</Text>
        <View style={s.backBtn} />
      </View>
      <ScrollView contentContainerStyle={s.content}>
        {property && (
          <View style={s.propertyCard}>
            <Icon name="home" size={20} color={Colors.primary} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={s.propertyTitle}>{property.title}</Text>
              <Text style={s.propertyAddr}>{[property.address, property.city].filter(Boolean).join(', ')}</Text>
              {property.price && (
                <Text style={s.propertyPrice}>${Number(property.price).toLocaleString()} / month</Text>
              )}
            </View>
          </View>
        )}

        <Text style={s.label}>Monthly Income ($)</Text>
        <TextInput
          style={s.input}
          value={monthlyIncome}
          onChangeText={setMonthlyIncome}
          placeholder="e.g. 5000"
          keyboardType="numeric"
        />

        <Text style={s.label}>Desired Move-in Date</Text>
        <TextInput
          style={s.input}
          value={moveInDate}
          onChangeText={setMoveInDate}
          placeholder="YYYY-MM-DD"
        />

        <Text style={s.label}>Lease Duration</Text>
        <View style={s.pillRow}>
          {LEASE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[s.pill, leaseDuration === opt && s.pillActive]}
              onPress={() => setLeaseDuration(opt)}
            >
              <Text style={[s.pillText, leaseDuration === opt && s.pillTextActive]}>
                {opt.replace(/_/g, ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Message to Host (optional)</Text>
        <TextInput
          style={[s.input, { height: 80, textAlignVertical: 'top' }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Tell the host about yourself..."
          multiline
        />

        <TouchableOpacity
          style={[s.submitBtn, submitting && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.submitText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 40 },
  propertyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 20 },
  propertyTitle: { fontSize: 15, fontWeight: '600' },
  propertyAddr: { fontSize: 13, color: '#666', marginTop: 2 },
  propertyPrice: { fontSize: 14, fontWeight: '700', color: '#D80621', marginTop: 2 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 14 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, backgroundColor: '#fafafa' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 8, marginBottom: 8 },
  pillActive: { backgroundColor: '#D80621' },
  pillText: { fontSize: 13, color: '#333' },
  pillTextActive: { color: '#fff', fontWeight: '600' },
  submitBtn: { backgroundColor: '#D80621', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ApplyScreen;
