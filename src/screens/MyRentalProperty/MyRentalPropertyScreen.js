import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Container, Content, Header} from '../../components';
import {navigate} from '../../navigation/ReduxNavigation';
import {Colors, Images} from '../../theme';
import styles from './Styles/MyRentalPropertyStyle';
import {PropertyService} from '../../services';
import {imageUrl} from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';

const MyRentalPropertyScreen = ({navigation}) => {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await PropertyService.myProperties();
      const list = res?.data?.data || res?.data || [];
      setProperties(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('Failed to load my properties:', e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    const imgPath = item?.property_images?.[0]?.original;
    const imageSource = imgPath
      ? {uri: imageUrl(imgPath)}
      : Images.SliderHomeHouseImageOne;

    return (
      <TouchableOpacity
        style={{marginBottom: 16, marginHorizontal: 16}}
        onPress={() => navigation.navigate('PopularDetails', {item})}>
        <ImageBackground
          imageStyle={{borderRadius: 12}}
          source={imageSource}
          style={{width: '100%', height: 180, borderRadius: 12}}
        />
        <View style={{marginTop: 6}}>
          <Text style={{fontSize: 15, fontWeight: '600'}}>
            {item.title || 'Property'}
          </Text>
          <Text style={{fontSize: 13, color: '#666'}}>
            {[item.address, item.city].filter(Boolean).join(', ')}
          </Text>
          {item.price && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#D80621',
                marginTop: 2,
              }}>
              ${Number(item.price).toLocaleString()} / month
            </Text>
          )}
          <Text style={{fontSize: 12, color: '#999', marginTop: 2}}>
            Status: {item.status || 'active'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="My Properties"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={{paddingTop: 10}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{marginTop: 30}}
          />
        ) : (
          <FlatList
            data={properties}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchProperties();
                }}
              />
            }
            ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 60}}>
                <Icon name="home" size={48} color="#ccc" />
                <Text style={{fontSize: 16, color: '#999', marginTop: 12}}>
                  No properties listed yet
                </Text>
              </View>
            }
          />
        )}
      </Content>
    </Container>
  );
};
export default MyRentalPropertyScreen;
