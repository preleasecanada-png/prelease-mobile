import { StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view';
import React from 'react'
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { Images } from '../../theme';
import styles from "../Welcome/Styles/WelcomeStyle"

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
        title2: 'Places to Call Home!',
        text:
            'Discover all the amazing features designed to enhance your experience and make things easier.',
        image: Images.OnBoardingImage2,
        imageStyle: styles.welcomeTwoSlideImg,
        skip: false,
    },
    {
        id: 3,
        title1: 'Find, Choose, & Book!',
        title2: "All with your finger tips!",
        text:
            'Discover all the amazing features designed to enhance your experience and make things easier.',
        image: Images.OnBoardingImage3,
        imageStyle: styles.welcomeSlideImg,

        skip: false,
    }
];
const OnBoarding = () => {
    return (
        <PagerView style={{ flex: 1 }} initialPage={0}>
            <View key="1">
                <Screen1 item={slides[0]} />
            </View>
            <View key="2">
                <Screen1 item={slides[1]} />
            </View>
            <View key="2">
                <Screen1 item={slides[2]} />
            </View>
        </PagerView>
    )
}

export default OnBoarding
