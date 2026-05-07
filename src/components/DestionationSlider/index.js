import * as React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../theme';
import styles from './Styles/index';
import { PropertyService } from '../../services';
import { Colors } from '../../theme';

const fallbackSlides = [
  { id: 1, title: 'Toronto', text: 'Vibrant communities and multicultural environment.', image: Images.SliderHomeHouseImageOne },
  { id: 2, title: 'Vancouver', text: 'Beautiful mountains and ocean views.', image: Images.SliderHouseImageTwo },
  { id: 3, title: 'Montreal', text: 'Rich culture and European charm.', image: Images.SliderHomeHouseImageOne },
  { id: 4, title: 'Ottawa', text: 'Canada\'s capital city.', image: Images.SliderHouseImageTwo },
];

function DestionationSlider(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [index, setIndex] = React.useState(0);
  const [slides, setSlides] = React.useState(fallbackSlides);
  const [loading, setLoading] = React.useState(true);
  const isCarousel = React.useRef(null);

  React.useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await PropertyService.list();
      const list = res?.data?.data || res?.data || [];
      if (list.length > 0) {
        const mapped = list.slice(0, 6).map(p => ({
          id: p.id,
          title: p.city || p.title || 'Property',
          text: p.address || p.title || '',
          image: p.images?.[0]?.image_url
            ? { uri: p.images[0].image_url }
            : Images.SliderHomeHouseImageOne,
          raw: p,
        }));
        setSlides(mapped);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };
  let renderItem = ({ item }) => (
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
          props.carouselSliderContainerStyle
        ]}>
        <Carousel
          data={slides}
          renderItem={renderItem}
          sliderWidth={props.fullSliderWidth ? windowWidth : windowWidth}
          itemWidth={
            props.itemWidthStyle ? windowWidth : windowWidth - 80
          }
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderHeight={windowHeight}
          activeSlideAlignment={'start'}
          onSnapToItem={(i) => setIndex(i)}
        />
        <View style={styles.carouselSliderPagination}>
          <Pagination
            dotContainerStyle={[styles.dotContainerStyle]}
            carouselRef={isCarousel}
            dotsLength={slides.length}
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
