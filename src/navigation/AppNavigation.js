import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/Welcome/WelcomeScreen';

import {Colors, Fonts, Icons, Images} from '../theme';

import HomeSVG from '../assets/svg/HomeSvg';
import WishlistSVG from '../assets/svg/WishlistSvg';
import BookingSVG from '../assets/svg/BookingSvg';

import {MainTabsParams} from './types';
import OnBoarding from '../screens/OnBoarding';
import {useSelector, useDispatch} from 'react-redux';
import {Image, View, ActivityIndicator} from 'react-native';
import HeadNavbar from '../components/Header/HeadNavbar';
import SearchLocationScreen from '../screens/SearchLocation';
import TripSlotSelection from '../screens/Search/TripSlotSelection';
import TripSlotCalendar from '../screens/Search/TripSlotCalendar';
import SearchScreenMain2 from '../screens/Search/SearchScreenMain2';
import SearchInputScreen from '../components/SearchInput/Index';
import BookNowBtnComponent from '../components/BookNowBtnComponent';
import BokkingPriceDetailsScreen from '../components/BokkingPriceDetails';
import ChatAISCreen from '../screens/ChatAISCreen/';
import ChatScreen from '../screens/Chat/ChatScreen';
import ChatDetailsScreen from '../screens/Chat/ChatDetailsScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './ReduxNavigation';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const tabs = props => {
  return {
    Home: {
      labelStyle: {
        color: Colors.white,
        ...Fonts.style.textInputText,
      },
      icon: {
        component: HomeSVG,
        activeColor: Colors.white,
        inactiveColor: Colors.darkGray,
      },
      background: {
        activeColor: Colors.primary,
        inactiveColor: Colors.transparent,
      },
    },
    Wishlist: {
      labelStyle: {
        color: Colors.white,
        ...Fonts.style.textInputText,
      },
      icon: {
        component: WishlistSVG,
        activeColor: Colors.white,
        inactiveColor: Colors.darkGray,
      },
      background: {
        activeColor: Colors.primary,
        inactiveColor: Colors.transparent,
      },
    },
    Booking: {
      labelStyle: {
        color: Colors.white,
        ...Fonts.style.textInputText,
      },
      icon: {
        component: BookingSVG,
        activeColor: Colors.white,
        inactiveColor: Colors.darkGray,
      },
      background: {
        activeColor: Colors.primary,
        inactiveColor: Colors.transparent,
      },
    },
    Message: {
      labelStyle: {
        color: Colors.white,
        ...Fonts.style.textInputText,
      },
      icon: {
        component: () => {
          return (
            <Image
              source={Icons.chat}
              style={{
                width: 24,
                height: 24,
                tintColor: props.active ? Colors.white : Colors.darkGray,
              }}
            />
          );
        },
        activeColor: Colors.white,
        inactiveColor: Colors.darkGray,
      },
      background: {
        activeColor: Colors.primary,
        inactiveColor: Colors.transparent,
      },
    },
  };
};
const topToBottomAnimation = {
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const leftToRightAnimation = {
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const AppNavigation = () => {
  const {user, intro, isLoggedIn} = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [restoring, setRestoring] = useState(true);

  React.useEffect(() => {
    const restoreAuth = async () => {
      try {
        const {AuthService} = require('../services');
        const session = await AuthService.restoreSession();
        if (session) {
          dispatch({type: 'LOGIN_SUCCESS', payload: session});
        }
      } catch (e) {
        console.log('Session restore failed:', e);
      }
      setRestoring(false);
      SplashScreen.hide();
    };
    restoreAuth();
  }, []);

  const getInitialRouteName = React.useCallback(() => {
    if (isLoggedIn || user) {
      return 'Dashboard';
    } else {
      if (!intro) {
        return 'Welcome';
      }
      return 'Auth';
    }
  }, [user, intro, isLoggedIn]);

  if (restoring) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // isReadyRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={getInitialRouteName()}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Dashboard" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TripSlotNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          header: () => <HeadNavbar />,
        }}
        name="TripSlotSelection"
        component={TripSlotSelection}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          header: () => null,
        }}
        name="TripSlotCalendar"
        component={TripSlotCalendar}
      />
    </Stack.Navigator>
  );
};
export default AppNavigation;
