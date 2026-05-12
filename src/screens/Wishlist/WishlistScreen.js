import * as React from 'react';
import { Container, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/WishlistStyle';
import Icon from 'react-native-vector-icons/Feather';
import HeaderMain from '../../components/HeaderMain';
import { Colors, Images } from '../../theme';
import CommanHeading from '../../components/CommanHeading';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, RefreshControl } from 'react-native';
import { PropertyService } from '../../services';
import { imageUrl } from '../../services/api';

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await PropertyService.wishLists();
      const list = res?.data?.data || res?.data || [];
      setWishlist(list);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const property = item.property || item;
    const imgPath = property?.property_images?.[0]?.original;
    const imageSource = imgPath
      ? { uri: imageUrl(imgPath) }
      : Images.SliderHomeHouseImageOne;

    return (
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={() => navigation.navigate('PopularDetails', { item: property })}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 12 }}
          source={imageSource}
          style={{ width: '100%', height: 200, borderRadius: 12 }}
        />
        <View style={{ marginTop: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>{property?.title || 'Property'}</Text>
          <Text style={{ fontSize: 13, color: '#666' }}>{property?.city || property?.address || ''}</Text>
          {property?.price && (
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#D80621', marginTop: 2 }}>
              ${Number(property.price).toLocaleString()} / month
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<Icon name={'bell'} size={25} color={Colors.black} />}
        rightIconPress={() => navigation.navigate('Notification')}
        centerImageColor={Colors.lightWhite}
        containerStyle={{ paddingHorizontal: 20 }}
        customRightIcon={true}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.flexRow}>
          <CommanHeading
            headingText
            heading="Wishlists"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            commanHeadingTextStyle={styles.commanHeadingTextStyle}
            navigation={navigate}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={wishlist}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchWishlist(); }} tintColor={Colors.primary} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Icon name="heart" size={48} color="#ccc" />
                <Text style={{ fontSize: 16, color: '#999', marginTop: 12 }}>Your wishlist is empty</Text>
              </View>
            }
          />
        )}
      </Content>
    </Container>
  );
};
export default WishlistScreen;
