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
import {ReviewService} from '../../services';
import Icon from 'react-native-vector-icons/Feather';

const ReviewsScreen = ({navigation}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await ReviewService.list();
      if (res?.data) {
        setReviews(Array.isArray(res.data) ? res.data : res.data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const renderStars = rating => {
    return Array.from({length: 5}, (_, i) => (
      <Icon
        key={i}
        name="star"
        size={14}
        color={i < rating ? '#ffc107' : '#ddd'}
      />
    ));
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.property} numberOfLines={1}>
          {item.property?.title || 'Property'}
        </Text>
        <View style={styles.stars}>{renderStars(item.rating)}</View>
      </View>
      <Text style={styles.comment} numberOfLines={3}>
        {item.comment}
      </Text>
      <Text style={styles.date}>
        {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
      </Text>
    </View>
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
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{width: 40}} />
      </View>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchReviews();
            }}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="message-square" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No reviews yet</Text>
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
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  property: {fontSize: 15, fontWeight: '600', flex: 1, marginRight: 8},
  stars: {flexDirection: 'row', gap: 2},
  comment: {fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 18},
  date: {fontSize: 11, color: '#999'},
  empty: {alignItems: 'center', marginTop: 60},
  emptyText: {fontSize: 16, color: '#999', marginTop: 12},
});

export default ReviewsScreen;
