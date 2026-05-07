import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  Switch, Alert, ActivityIndicator, StyleSheet,
} from 'react-native';
import { Colors } from '../../theme';
import { PreferencesService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const PreferencesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState({
    preferred_city: '',
    preferred_province: '',
    min_budget: '',
    max_budget: '',
    min_bedrooms: '',
    min_bathrooms: '',
    preferred_property_type: '',
    pet_friendly: false,
    parking_required: false,
    laundry_in_unit: false,
    accessibility_required: false,
    preferred_move_in_date: '',
    preferred_lease_duration: '3_month',
    additional_notes: '',
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const res = await PreferencesService.get();
      if (res?.status === 200 && res?.data) {
        setPrefs(prev => ({ ...prev, ...res.data }));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await PreferencesService.save(prefs);
      if (res?.status === 200) {
        Alert.alert('Success', 'Preferences saved!');
      } else {
        Alert.alert('Error', res?.message || 'Failed to save');
      }
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    }
    setSaving(false);
  };

  const update = (key, value) => setPrefs(prev => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Renter Preferences</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} value={prefs.preferred_city} onChangeText={v => update('preferred_city', v)} placeholder="e.g. Toronto" />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Province</Text>
            <TextInput style={styles.input} value={prefs.preferred_province} onChangeText={v => update('preferred_province', v)} placeholder="e.g. Ontario" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Budget</Text>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Min Budget</Text>
            <TextInput style={styles.input} value={String(prefs.min_budget || '')} onChangeText={v => update('min_budget', v)} keyboardType="numeric" placeholder="$0" />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Max Budget</Text>
            <TextInput style={styles.input} value={String(prefs.max_budget || '')} onChangeText={v => update('max_budget', v)} keyboardType="numeric" placeholder="$5000" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Min Bedrooms</Text>
            <TextInput style={styles.input} value={String(prefs.min_bedrooms || '')} onChangeText={v => update('min_bedrooms', v)} keyboardType="numeric" placeholder="Any" />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Min Bathrooms</Text>
            <TextInput style={styles.input} value={String(prefs.min_bathrooms || '')} onChangeText={v => update('min_bathrooms', v)} keyboardType="numeric" placeholder="Any" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Amenities</Text>
        {[
          { key: 'pet_friendly', label: 'Pet Friendly' },
          { key: 'parking_required', label: 'Parking Required' },
          { key: 'laundry_in_unit', label: 'Laundry In-Unit' },
          { key: 'accessibility_required', label: 'Accessibility Required' },
        ].map(item => (
          <View key={item.key} style={styles.switchRow}>
            <Text style={styles.switchLabel}>{item.label}</Text>
            <Switch value={prefs[item.key]} onValueChange={v => update(item.key, v)} trackColor={{ true: Colors.primary }} />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          value={prefs.additional_notes || ''}
          onChangeText={v => update('additional_notes', v)}
          multiline
          placeholder="Any other preferences..."
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
          <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Preferences'}</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 10, color: '#000' },
  row: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },
  label: { fontSize: 13, color: '#666', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, backgroundColor: '#fafafa' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  switchLabel: { fontSize: 15, color: '#333' },
  saveBtn: { backgroundColor: '#D80621', paddingVertical: 14, borderRadius: 10, marginTop: 24, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default PreferencesScreen;
