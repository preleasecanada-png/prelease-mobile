import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../theme';
import {NotificationService} from '../../services';
import Icon from 'react-native-vector-icons/Feather';

function NotificationScreen({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await NotificationService.list();
      if (res?.data) {
        setNotifications(
          Array.isArray(res.data) ? res.data : res.data.data || [],
        );
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleMarkAllRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      fetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[nStyles.card, !item.read_at && nStyles.unread]}
      onPress={async () => {
        if (!item.read_at) {
          await NotificationService.markAsRead(item.id);
          fetchNotifications();
        }
      }}>
      <View style={nStyles.iconWrap}>
        <Icon
          name={
            item.type === 'payment'
              ? 'credit-card'
              : item.type === 'lease'
              ? 'file-text'
              : item.type === 'maintenance'
              ? 'tool'
              : 'bell'
          }
          size={20}
          color={Colors.primary}
        />
      </View>
      <View style={nStyles.content}>
        <Text style={nStyles.title} numberOfLines={1}>
          {item.title || 'Notification'}
        </Text>
        <Text style={nStyles.message} numberOfLines={2}>
          {item.message || item.data?.message || ''}
        </Text>
        <Text style={nStyles.time}>
          {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={nStyles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={nStyles.container}>
      <View style={nStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={nStyles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={nStyles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead} style={nStyles.backBtn}>
          <Icon name="check-circle" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={nStyles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchNotifications();
            }}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={nStyles.empty}>
            <Icon name="bell-off" size={48} color="#ccc" />
            <Text style={nStyles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
}

const nStyles = StyleSheet.create({
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontWeight: '700'},
  list: {padding: 16},
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  unread: {backgroundColor: '#fef2f2', borderColor: '#fecdd3'},
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {flex: 1},
  title: {fontSize: 15, fontWeight: '600', marginBottom: 2},
  message: {fontSize: 13, color: '#555', marginBottom: 4, lineHeight: 17},
  time: {fontSize: 11, color: '#999'},
  empty: {alignItems: 'center', marginTop: 60},
  emptyText: {fontSize: 16, color: '#999', marginTop: 12},
});

export default NotificationScreen;
