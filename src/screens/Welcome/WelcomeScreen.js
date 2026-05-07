import * as React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { Container, Content } from '../../components';
import Welcome from '../../components/Welcome';
import { Colors, Icons, Images } from '../../theme';
import Carousel from 'react-native-snap-carousel';
import styles from './Styles/WelcomeStyle';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { backgroundColor, flexDirection, layout } from 'styled-system';
import { CommonActions } from '@react-navigation/native';

const slides = [
  {
    id: 1,
    title1: 'Welcome to Prelease',
    text:
      'Discover all the amazing features designed to enhance your experience and make things easier.',
    image: Images.OnBoardingImage1,
    imageStyle: styles.welcomeSlideImg,
    skip: true,
  },
  {
    id: 2,
    title1: 'Filled with beautiful',
    title2: 'places to Call',
    title3: "Home!",
    text:
      'Discover all the amazing features designed to enhance your experience and make things easier.',
    image: Images.OnBoardingImage2,
    imageStyle: styles.welcomeTwoSlideImg,
    skip: true,
  },
  {
    id: 3,
    titlePrimary: 'Find, Choose, & Book!',
    // title1: 'Find, Choose, & Book!',
    title2: "All with your finger tips!",
    text:
      'Discover all the amazing features designed to enhance your experience and make things easier.',
    image: Images.OnBoardingImage3,
    imageStyle: styles.welcomeSlideImg,

    skip: false,
  }
];

// Stepper Component
const Stepper = ({ index, total }) => (
  <View style={styles.stepperContainer}>
    {[...Array(total)].map((_, i) => (
      <View style={[styles.stepper, index == i ? { width: 20, backgroundColor: Colors.primary } : {}]}></View>
    ))}
  </View>
);

function WelcomeScreen({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const [Index, setIndex] = useState(0);
  const {
    dispatch: ndispatch,
    navigate
  } = navigation;


  const nextScreen = React.useCallback((screenName) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    ndispatch(resetAction);
  }, []);


  let renderItem = ({ item }) => (
    <Welcome
      key={item.id}
      titlePrimary={item?.titlePrimary ?? ""}
      heading1={item.title1}
      heading2={item.title2}
      title3={item.title3 ?? ''}
      peregraph={item.text}
      image={item.image}
      skip={item.skip}
      welcomeSlideImgStyle={item.imageStyle}
    />
  );
  return (
    <Container>
      <Content hasHeader contentContainerStyle={[styles.container]}>

        {Index < 2 && <Pressable style={{ paddingTop: 0, paddingRight: 10, position: 'absolute', right: 5, zIndex: 88, top: 10 }} onPress={() => nextScreen('Auth')}>
          <Text style={styles.skip}>{"Skip"}</Text>
        </Pressable>}

        <Carousel
          ref={(c) => {
            renderItem = c;
          }}
          data={slides}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          layout='default'
          inactiveSlideScale={1}
          pagingEnabled
          onSnapToItem={() =>  {
            console.log('Index Changed', renderItem.currentIndex);
            setIndex(renderItem.currentIndex);
          }}
          // disableIntervalMomentum={true}
          enableMomentum={false}
          decelerationRate={'fast'}
        />
        <View style={styles.welcomeBottomBtn}>

          <Stepper
            index={Index}
            total={3}
          />

          {Index > 1 ? (
            <TouchableOpacity
              style={[styles.nextStartBtnView]}
              onPress={() => nextScreen('Auth')}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.nextStartBtn}>Get Started</Text>
                <Image resizeMethod='resize' resizeMode='contain' source={Icons.doubleArrowRight} style={{ width: 20, height: 20 }} />
              </View>

            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={
                Index > 1
                  ? styles.nextStartBtnView
                  : [styles.nextStartBtnView, styles.nextFirstStartBtnView,]
              }
              onPress={() => renderItem.snapToNext()}>
              <Image resizeMethod='resize' resizeMode='contain' source={Icons.doubleArrowRight} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          )}
        </View>
      </Content>
    </Container>
  );
}

export default WelcomeScreen;
