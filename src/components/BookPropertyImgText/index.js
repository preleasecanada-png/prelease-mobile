import * as React from 'react';
import {
  Image,
  View,
  Share,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommanHeading from '../CommanHeading';
import {facilitiesList, ratingStarImgData} from '../../assets/data';
import {Colors, Images} from '../../theme';
import {imageUrl} from '../../services/api';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';
import Raiting from '../Rating';
import Reviews from '../Reviews';
import FacilitiesRules from '../FacilitiesRules';
import LineSeperator from '../LineSeperator';
import {backgroundColor, marginBottom} from 'styled-system';
import CommanHeadingScreen from '../CommanHeading';

function BookPropertyImgText(props) {
  const {item} = props;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error) {
      // alert(error.message);
    }
  };
  const renderItem = item => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="cover"
      style={styles.propertyDetaileImage}
    />
  );
  const imgPath = item?.property_images?.[0]?.original;
  const imageSource = imgPath
    ? {uri: imageUrl(imgPath)}
    : item?.image || Images.SliderHomeHouseImageOne;

  const hostName = item?.user?.name || item?.host_name || 'Host';
  const locationStr =
    [item?.address, item?.city, item?.country].filter(Boolean).join(', ') ||
    'Location not specified';
  const description = item?.description || 'No description available.';
  const reviewCount = item?.reviews_count || 0;

  return (
    <>
      <View
        style={[
          styles.propertyDetaileImageContent,
          props.propertyDetaileImgContentStyle,
        ]}>
        <Image
          key={item?.id || 'img'}
          source={imageSource}
          resizeMode="cover"
          style={styles.propertyDetaileImage}
        />
        <LinearGradient
          colors={['rgba(33, 37, 41, 0)', 'rgba(33, 37, 41, 0.4)']}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.7, y: 1.3}}
          style={styles.propertyDetaileImageBackground}
        />
      </View>
      <View style={props.propertyDetaileContentStyle}>
        <View style={styles.propertyDetaileDescriptionContent}>
          <CommanHeading
            headingText
            heading={item?.title || 'Property'}
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
        </View>
        <Text style={styles.hostedBy}>Hosted by {hostName}</Text>
        <View style={styles.flexRow}>
          <Image
            resizeMode="contain"
            style={styles.locationIcon}
            source={Images.location}
          />
          <Text style={styles.locationText}>{locationStr}</Text>
        </View>
        <View style={[styles.flexRow, {marginBottom: 10, marginTop: 10}]}>
          <Raiting ratingText={item?.avg_rating || '—'} />
          <Reviews counts={reviewCount} />
        </View>

        <LineSeperator
          style={{
            backgroundColor: Colors.opacityBlack,
            marginVertical: 10,
          }}
        />

        <FacilitiesRules
          facilitiesListData={
            item?.amenities?.length > 0
              ? item.amenities.slice(0, 9).map((a, i) => ({
                  id: i,
                  name:
                    typeof a === 'string'
                      ? a
                      : a?.name || a?.amenity_name || '',
                }))
              : facilitiesList.slice(0, 9)
          }
          facilitiesHeadingStyle={styles.facilitiesHeadingStyle}
        />
        <LineSeperator
          style={{
            backgroundColor: Colors.opacityBlack,
            marginVertical: 10,
          }}
        />

        <CommanHeadingScreen
          headingText
          heading={'Description'}
          commanHeadingContainerStyle={[styles.headingStyle]}
          navigation={navigate}
        />
        <Text style={styles.propertyDetaileDescriptionPeregraph}>
          {description}
        </Text>
        {props.locationText && (
          <View style={styles.propertyDetaileLocationTextRow}>
            <Image
              source={Images.LocationLineIcon}
              resizeMode="contain"
              style={styles.propertyDetaileLocationImg}
            />
            <Text style={styles.propertyDetaileLocationText}>
              A-6 Om sai row house, Vip road, Vesu, Surat
            </Text>
          </View>
        )}
        {/* <View style={styles.propertyDetaileRatingStarRow}>
          {props.ratingStarText && (
            <Text style={styles.propertyDetaileRatingStarText}>4.6</Text>
          )}
          <View style={styles.propertyDetaileRatingStars}>
            <FlatList
              bounces={false}
              data={ratingStarImgData}
              renderItem={renderItem}
              numColumns={5}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View> */}
      </View>
    </>
  );
}

export default BookPropertyImgText;
