import * as React from 'react';
import { useRef, useMemo } from 'react';
import { TouchableOpacity, Image, Text, View, ActivityIndicator } from 'react-native';
import { Container, Header, Content } from '../../components';
import PopularDestionationProparty from '../../components/PopularDestionationProparty';
import DestionationSlider from '../../components/DestionationSlider';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/PopularDestionationStyle';
import { navigate } from '../../navigation/ReduxNavigation';
import BottomSheet from '@gorhom/bottom-sheet';
import { Images, Colors } from '../../theme';
import MapView, { Marker } from 'react-native-maps';
import { PropertyService } from '../../services';
import { propertyImageUrl } from '../../services/api';

function PopularDestionationScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const snapPoints = useMemo(() => ['18%', '50%', '100%']);
  const handleSheetChanges = React.useCallback((index) => {
    if (index === 2) {
      setScrollEnabled(true);
    } else {
      setScrollEnabled(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await PropertyService.list();
      const list = res?.data?.data || res?.data || [];
      const mapped = list.map(p => ({
        ...p,
        id: String(p.id),
        proprtyName: p.title || 'Property',
        proceMonthYear: p.price ? `$${Number(p.price).toLocaleString()} / month` : '',
        popularDestionationLocationText: [p.address, p.city].filter(Boolean).join(', '),
        proprtyRatingText: p.avg_rating || '—',
        bedText: p.bedrooms ? `${p.bedrooms} Bed` : '',
        bathText: p.bathrooms ? `${p.bathrooms} Bath` : '',
        sqftText: p.area ? `${p.area} sqft` : '',
        proprtyImg: propertyImageUrl(p)
          ? { uri: propertyImageUrl(p) }
          : Images.SliderHomeHouseImageOne,
        proprtyLocationImg: Images.LocationImage,
        proprtyRatingStarImg: Images.StarActive,
        BedRoomIcon: Images.BedRoomIcon,
        BathRoomIcon: Images.BathRoomIcon,
        sqftIcon: Images.SqftIcon,
        likeBtnIcon: Images.HeartLineIcon,
        chatBtnIcon: Images.SendGrayLineIcon,
        shareBtnIcon: Images.ShareLineIcon,
        raw: p,
      }));
      setProperties(mapped);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const markers = properties
    .filter(p => p.raw?.latitude && p.raw?.longitude)
    .map(p => ({
      lat: parseFloat(p.raw.latitude),
      lng: parseFloat(p.raw.longitude),
      title: p.proprtyName,
      id: p.id,
    }));

  const defaultLat = markers.length > 0 ? markers[0].lat : 43.6532;
  const defaultLng = markers.length > 0 ? markers[0].lng : -79.3832;

  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          filterBtn
          title="Popular Destination"
          onBackPress={() => navigation.goBack()}
          onFilterBtnPress={() => navigation.navigate('Book')}
        />
        <Content>
          <View>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: defaultLat,
                longitude: defaultLng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}>
              {markers.map(m => (
                <Marker
                  key={m.id}
                  coordinate={{ latitude: m.lat, longitude: m.lng }}
                  title={m.title}
                  image={Images.CurrentLocation}
                />
              ))}
            </MapView>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            handleStyle={styles.handleStyle}
            backgroundStyle={styles.backgroundStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            onChange={handleSheetChanges}>
            <Content
              isBottomSheet
              contentContainerStyle={styles.contentContainer}
              scrollEnabled={scrollEnabled}>
              {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
              ) : (
                <>
                  <PopularDestionationProparty
                    data={properties.slice(0, 3)}
                    onDestionationPress={(item) => {
                      navigation.navigate('PopularDetails', { item: item?.raw || item });
                    }}
                    onLikePress={() => navigation.navigate('Wishlist')}
                    onSendMsgPress={() => navigation.navigate('chatDetails')}
                  />
                  <CommanHeading
                    headingBtn
                    heading="Featured Properties"
                    moreBtn="View all"
                    commanHeadingContainerStyle={styles.firstBookingHeadingStyle}
                    navigation={navigate}
                  />
                  <DestionationSlider
                    itemWidthStyle
                    fullSliderWidth
                    sliderContainerStyle={styles.fullScreenSliderContainer}
                    sliderBgImagestyle={styles.sliderBgImagestyle}
                    carouselSliderContainerStyle={
                      styles.carouselSliderContainerStyle
                    }
                  />
                  {properties.length > 3 && (
                    <PopularDestionationProparty
                      data={properties.slice(3, 6)}
                      onDestionationPress={(item) => {
                        navigation.navigate('PopularDetails', { item: item?.raw || item });
                      }}
                    />
                  )}
                </>
              )}
            </Content>
          </BottomSheet>
        </Content>
        {scrollEnabled && (
          <TouchableOpacity
            style={styles.papperMapIconBtn}
            onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
            <Image
              source={Images.PapperMapIcon}
              resizeMode="contain"
              style={styles.papperMapIcon}
            />
            <Text style={styles.papperMapIconBtnText}>Map</Text>
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
}

export default PopularDestionationScreen;
