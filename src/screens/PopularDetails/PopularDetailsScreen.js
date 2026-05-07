import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import BookPropertyImgText from '../../components/BookPropertyImgText';
import FacilitiesRules from '../../components/FacilitiesRules';
import CommanHeading from '../../components/CommanHeading';
import MapView, { Marker } from 'react-native-maps';
import {
  facilitiesList,
  bookPropertySubImgData,
  ratingStarImgData,
  ratingCategoryListData,
  amenitiesList
} from '../../assets/data';
import styles from './Styles/PopularDetailsStyle';
import { Colors, Icons, Images } from '../../theme';
import CommanBtn from '../../components/CommanBtn';
import CommanHeadingScreen from '../../components/CommanHeading';
import Raiting from '../../components/Rating';
import { fontWeight, paddingTop } from 'styled-system';
import HeaderMain from '../../components/HeaderMain';
import { Surface } from 'react-native-paper';
import { ReviewService, PropertyService } from '../../services';
import Icon from 'react-native-vector-icons/Feather';

function PopularDetailsScreen({ navigation, route }) {
  const {item} = route?.params;
  const [textShown, settextShown] = useState(-1);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const lat = item?.latitude ? parseFloat(item.latitude) : 43.6532;
  const lng = item?.longitude ? parseFloat(item.longitude) : -79.3832;
  const price = item?.price ? `$${Number(item.price).toLocaleString()} / month` : '$0 / month';

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      if (item?.id) {
        const res = await ReviewService.propertyReviews(item.id);
        const list = res?.data?.data || res?.data || [];
        setReviews(list);
      }
    } catch (e) { console.error(e); }
    setLoadingReviews(false);
  };
  const toggleNumberOfLines = (index) => {
    settextShown(textShown === index ? -1 : index);
  };

  const renderItem = ({ item, index }) => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="cover"
      style={
        index === 0
          ? [styles.propertyDetaileImgs, { marginLeft: 20 }]
          : index === bookPropertySubImgData.length - 1
            ? [styles.propertyDetaileImgs, { marginRight: 20 }]
            : [styles.propertyDetaileImgs]
      }
    />
  );
  const renderStarItem = ({ item }) => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="contain"
      style={styles.propertyDetaileRatingStarImg}
    />
  );
  const renderRatingListItem = ({ item }) => (
    <View style={styles.ratingCategoryListRow}>
      <Text style={styles.ratingCategoryListHeading}>{item.name}</Text>
      <View style={styles.ratingCategoryBgLine}>
        <View style={[styles.ratingCategoryFillLine, { width: item.width }]} />
      </View>
    </View>
  );
  const renderReviewsListItem = ({ item: rev, index }) => (
    <View style={styles.surface}>
      <View style={styles.reviewContent}>
        <View style={styles.reviewUserImgText}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="user" size={18} color="#999" />
          </View>
          <View style={styles.reviewUserRightText}>
            <Text style={styles.reviewUserNameText}>
              {rev.user?.name || 'User'}{' '}
            </Text>
            <View style={styles.reviewRatingStarTextRow}>
              <View style={styles.flexRow}>
                <Text style={styles.reviewUserDateText}>{rev.created_at ? new Date(rev.created_at).toLocaleDateString() : ''}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Raiting
                  icon={Images.StarInactive}
                  color={Colors.white}
                  ratingText={String(rev.rating || 0)}
                  iconStyle={{
                    width: 10,
                    height: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <Text
          style={styles.reviewRatingStarParegraph}
          numberOfLines={textShown === index ? undefined : 3}>
          {rev.comment || ''}
        </Text>
        {rev.comment?.length > 100 && (
          <Text
            style={styles.readMoreLessText}
            onPress={() => toggleNumberOfLines(index)}>
            {textShown === index ? 'Read Less' : 'Read More'}
          </Text>
        )}
      </View>
    </View>
  );
  return (
    <Container safeAreaView={false} statusBarColor="transparent">
      <Content nestedScrollEnabled contentContainerStyle={styles.container}>
        {/* <Header
            transparent
            hasBackBtn
            style={styles.popularDetailsHeader}
            onBackPress={() => navigation.goBack()}
          /> */}


        <HeaderMain
          centerImage={false}
          leftIcon="chevron-thin-left"
          leftIconPress={() => navigation.goBack()}
          rightIcon="heart-outlined"
          rightIconPress={() => { }}
          
          isBlur={true}
          containerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10
          }}
        />


        <BookPropertyImgText
        item={item}
          propertyDetaileImgContentStyle={
            styles.propertyDetaileImgContentStyle
          }
          propertyDetaileImgStyle={styles.propertyDetaileImgStyle}
          propertyDetaileContentStyle={styles.propertyDetaileContentStyle}
          sendMsgPress={() => navigation.navigate('chatDetails')}
          likeBtnPress={() => navigation.navigate('Wishlist')}
        />
        <View style={styles.propertyDetaileContainer}>
          {item?.amenities?.length > 0 && (
            <FacilitiesRules
              facilitiesListData={item.amenities.slice(0, 9).map((a, i) => ({
                id: i,
                name: typeof a === 'string' ? a : a?.name || a?.amenity_name || '',
              }))}
              FacilitiesRulesHeading="Amenities"
              facilitiesHeadingStyle={styles.facilitiesHeadingStyle}
            />
          )}
          {/* <CommanHeading
              headingBtn
              heading="Photos"
              moreBtn="View all"
              commanHeadingContainerStyle={styles.photoHeadingStyle}
              navigation={navigate}
            /> */}
        </View>
        {/* <View style={styles.propertyDetailePhotoRow}>
            <FlatList
              horizontal
              data={bookPropertySubImgData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View> */}
        <View style={styles.propertyDetaileContainer}>
          {/* <CommanHeading
              headingBtn
              heading="Location"
              moreBtn="View on map"
              navigation={navigate}
            /> */}
          <CommanHeadingScreen
            headingText
            heading={"Location"}
            commanHeadingContainerStyle={[
              styles.headingStyle,
            ]}
          />
          {/* <View style={styles.propertyDetaileLocationTextRow}>
              <Image
                source={Images.LocationLineIcon}
                resizeMode="contain"
                style={styles.propertyDetaileLocationImg}
              />
              <Text style={styles.propertyDetaileLocationText}>
                A-6 Om sai row house, Vip road, Vesu, Surat
              </Text>
            </View> */}
          <View style={styles.propertyDetaileMap}>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}>
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: lng
                }}
                title={item?.title || 'Property'}
                description={item?.address || ''}
              />
            </MapView>
          </View>
          {/* <CommanHeading
              headingText
              heading="Raiting"
              navigation={navigate}
            />
            <View style={styles.propertyDetaileRatingStarRow}>
              <Text style={styles.propertyDetaileRatingStarText}>9.6</Text>
              <View style={styles.propertyDetaileRatingStars}>
                <FlatList
                  bounces={false}
                  data={ratingStarImgData}
                  renderItem={renderStarItem}
                  numColumns={5}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View> */}
          {/* <View style={styles.ratingCategoryList}>
              <FlatList
                bounces={false}
                data={ratingCategoryListData}
                renderItem={renderRatingListItem}
                keyExtractor={(item) => item.id}
              />
            </View> */}
          <CommanHeading
            headingText
            heading="Reviews"
            moreBtn={`(${reviews.length} reviews)`}
            morBtnStyle={styles.morBtnStyle}
          />
          {loadingReviews ? (
            <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: 10 }} />
          ) : reviews.length > 0 ? (
            <FlatList
              bounces={false}
              data={reviews}
              renderItem={renderReviewsListItem}
              keyExtractor={(r) => String(r.id)}
            />
          ) : (
            <Text style={{ color: '#999', fontSize: 13, paddingHorizontal: 16, marginBottom: 10 }}>No reviews yet</Text>
          )}
        </View>

        <View>
          <CommanBtn
            btnText="Apply to Rent"
            commanBtnStyle={styles.seeMoreButttonStyle}
            commanBtnTextStyle={styles.seeMoreButttonTextStyle}
            onBtnPress={() => navigation.navigate('ApplyToRent', { property: item })}
          />
          <CommanBtn
            btnText="Message Host"
            commanBtnStyle={styles.seeMoreButttonStyle}
            commanBtnTextStyle={styles.feedbackButttonTextStyle}
            onBtnPress={() => navigation.navigate('chatDetails', { hostId: item?.user_id })}
          />
        </View>
      </Content>




      <View style={styles.bookNowBtnContent}>
        <View style={styles.bookNowBtnPriceTexts}>
          <Text style={styles.bookNowBtnPriceText}>{price}</Text>
        </View>
        <CommanBtn
          btnText="Apply to Rent"
          commanBtnStyle={styles.bookNowBtn}
          commanBtnTextStyle={styles.bookNowBtnText}
          onBtnPress={() => {
            navigation.navigate('ApplyToRent', { property: item })
          }}
        />
      </View>
    </Container>
  );
}

export default PopularDetailsScreen;
