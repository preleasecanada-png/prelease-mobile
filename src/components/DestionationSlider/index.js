import * as React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../theme';
import styles from './Styles/index';
import {Colors} from '../../theme';

const STATIC_DESTINATIONS = [
  {
    id: 1,
    title: 'Toronto',
    text: 'Known for its vibrant communities and multicultural environment.',
    image: Images.DestToronto,
  },
  {
    id: 2,
    title: 'Montreal',
    text: 'A blend of European charm and North American dynamism.',
    image: Images.DestMontreal,
  },
  {
    id: 3,
    title: 'Vancouver',
    text: 'Stunning mountains meet the Pacific in this coastal gem.',
    image: Images.DestVancouver,
  },
  {
    id: 4,
    title: 'Edmonton',
    text: 'Gateway to the Rockies with a booming urban lifestyle.',
    image: Images.DestEdmonton,
  },
  {
    id: 5,
    title: 'Ottawa',
    text: "Canada's capital city, rich in history and culture.",
    image: Images.DestOttawa,
  },
  {
    id: 6,
    title: 'Quebec City',
    text: 'Old-world charm with cobblestone streets and French heritage.',
    image: Images.DestQuebec,
  },
];

function DestionationSlider(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  let renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={[styles.sliderContainer, props.sliderContainerStyle]}>
        <Image
          source={item.image}
          style={[styles.sliderMainImage, props.sliderBgImagestyle]}
          resizeMode="cover"
        />
        {/* <LinearGradient
          colors={['#0D0D0D', '#353232cc', '#35323200']}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.sliderTextBackground}>
          <Text style={styles.sliderHeading}>{item.title}</Text>
          <View style={styles.sliderLoacationText}>
            <Image
              source={item.locationImg}
              resizeMode="contain"
              style={styles.sliderLocationImg}
            />
            <Text style={styles.sliderPeregraph}>{item.text}</Text>
          </View>
        </LinearGradient> */}
        {/* <View style={styles.sliderRatingContainer}>
          <Image
            source={item.ratingStarImg}
            resizeMode="contain"
            style={styles.sliderRatingStarImg}
          />
          <Text style={styles.sliderRatingStarText}>{item.ratingText}</Text>
        </View> */}
      </TouchableOpacity>
      {/* <LinearGradient
          colors={['#0D0D0D', '#353232cc', '#35323200']}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0.5 }} */}
      {/* style={styles.sliderTextBackground}> */}
      <Text style={styles.sliderHeading}>{item.title}</Text>
      <View style={styles.sliderLoacationText}>
        {/* <Image
              source={item.locationImg}
              resizeMode="contain"
              style={styles.sliderLocationImg}
            /> */}
        <Text style={styles.sliderPeregraph}>{item.text}</Text>
      </View>
      {/* </LinearGradient> */}
    </>
  );

  return (
    <>
      <View
        style={[
          styles.carouselSliderContainer,
          props.carouselSliderContainerStyle,
        ]}>
        <Carousel
          data={STATIC_DESTINATIONS}
          renderItem={renderItem}
          sliderWidth={props.fullSliderWidth ? windowWidth : windowWidth}
          itemWidth={props.itemWidthStyle ? windowWidth : windowWidth - 80}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderHeight={windowHeight}
          activeSlideAlignment={'start'}
          onSnapToItem={i => setIndex(i)}
        />
        <View style={styles.carouselSliderPagination}>
          <Pagination
            dotContainerStyle={[styles.dotContainerStyle]}
            carouselRef={isCarousel}
            dotsLength={STATIC_DESTINATIONS.length}
            activeDotIndex={index}
            dotStyle={styles.paginationActiveDot}
            inactiveDotStyle={styles.paginationInActiveDot}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
          />
        </View>
      </View>
    </>
  );
}

export default DestionationSlider;
