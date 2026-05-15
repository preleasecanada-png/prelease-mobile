import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../theme';
import {ApplicationService} from '../../services';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const statusColors = {
  submitted: '#0d6efd',
  under_review: '#0dcaf0',
  approved: '#198754',
  rejected: '#dc3545',
  withdrawn: '#6c757d',
};

const ApplicationsScreen = ({navigation}) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(s => s.app?.user);
  const role =
    user?.role === 'host' || user?.role === 'landlord' ? 'host' : 'renter';

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await ApplicationService.list(role);
      if (res?.status === 200) {
        setApps(res?.data?.data || res?.data || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchApps();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ApplicationDetail', {id: item.id})}>
      <View style={styles.cardHeader}>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {item.property?.title || 'Property'}
        </Text>
        <View
          style={[
            styles.badge,
            {backgroundColor: statusColors[item.status] || '#6c757d'},
          ]}>
          <Text style={styles.badgeText}>
            {item.status?.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardCol}>
          <Text style={styles.cardLabel}>Move-in</Text>
          <Text style={styles.cardValue}>
            {item.desired_move_in
              ? new Date(item.desired_move_in).toLocaleDateString()
              : '—'}
          </Text>
        </View>
        <View style={styles.cardCol}>
          <Text style={styles.cardLabel}>Duration</Text>
          <Text style={styles.cardValue}>
            {item.desired_lease_duration?.replace('_', ' ')}
          </Text>
        </View>
        <View style={styles.cardCol}>
          <Text style={styles.cardLabel}>Income</Text>
          <Text style={styles.cardValue}>
            ${Number(item.monthly_income || 0).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {role === 'host' ? 'Received Applications' : 'My Applications'}
        </Text>
        <View style={{width: 40}} />
      </View>
      <FlatList
        data={apps}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="file-text" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {role === 'host'
                ? 'No applications received yet'
                : 'No applications yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {width: 40, height: 40, justifyContent: 'center'},
  headerTitle: {fontSize: 18, fontWeight: '700'},
  list: {padding: 16},
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyTitle: {fontSize: 16, fontWeight: '600', flex: 1, marginRight: 8},
  badge: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4},
  badgeText: {color: '#fff', fontSize: 11, fontWeight: '600'},
  cardRow: {flexDirection: 'row', justifyContent: 'space-between'},
  cardCol: {flex: 1},
  cardLabel: {fontSize: 12, color: '#999', marginBottom: 2},
  cardValue: {fontSize: 14, color: '#333', fontWeight: '500'},
  empty: {alignItems: 'center', marginTop: 60},
  emptyText: {fontSize: 16, color: '#999', marginTop: 12},
});

export default ApplicationsScreen;
