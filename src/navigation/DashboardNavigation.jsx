import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Colors } from '../theme';
import { isIphoneX } from '../libs/Utils';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ChatAISCreen from '../screens/ChatAISCreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/TabBar';
import { useKeyboardStatus } from '../hooks/useKeyboardStatus';
import { display } from 'styled-system';

const Tab = createBottomTabNavigator();


const tabRoutes = [
    {
        name: 'Home', title: 'Home', component: HomeScreen,
        nextScreen: 'Wishlist'
    },
    {
        name: 'Wishlist', title: 'Wishlist', component: WishlistScreen,
        nextScreen: 'PreLease AI'
    },
    {
        name: 'PreLease AI', title: 'PreLease AI',
        component: ChatAISCreen,
        options: {
            tabBarStyle: {
                display: "none",
            }
        },
        nextScreen: 'Message'
    },
    {
        name: 'Message', title: 'Message', component: ChatScreen,
        nextScreen: 'Profile'
    },
    {
        name: 'Profile', title: 'Profile', component: ProfileScreen,
        nextScreen: 'Home'
    },
];


const DashboardNavigation = () => {
    const state = useSelector(s => s?.app);
    return (
        <Tab.Navigator
            initialRouteName='Home'


            screenOptions={({ route }) => {
                console.log("route?.name", route?.name == "Home")

                return ({

                    tabBarHideOnKeyboard: true,
                    tabBarVisibilityAnimationConfig: {
                        hide: route?.name == "Home"
                    },

                    headerShown: false,
                    tabBarStyle: {
                        paddingHorizontal: 0,
                        backgroundColor: Colors.white,
                        borderTopWidth: 0,
                        borderTopLeftRadius: 40,
                        margin: 0,
                        justifyContent: "space-between",
                        borderTopRightRadius: 40,
                        height: isIphoneX() ? 90 : 72,
                        paddingVertical: 3,
                        elevation: 40,
                        shadowColor: Colors.boxShadowLighterBlack,
                        shadowOffset: { height: -10 },
                        shadowOpacity: 0.1,
                        shadowRadius: 40,
                        display: route?.name == "Home" ? "none" : "flex"
                    },
                })
            }
            }

            tabBar={props => <>
                <MyTabBar {...props} />
            </>}
        >
            {tabRoutes.map(({
                name, component, nextScreen, options = {}
            }) => (
                <Tab.Screen
                    key={name}
                    name={name}

                    options={({ route }) => ({
                        tabBarHideOnKeyboard: true,
                        tabBarVisibilityAnimationConfig: {
                            hide: route?.name == "Home"
                        },
                        tabBarStyle: {
                            display: route?.name == "Home" ? "none" : "flex"
                        }

                    })}
                    initialParams={{
                        nextScreen,
                    }}
                    component={component}
                />
            ))}


        </Tab.Navigator>
    );
};

export default DashboardNavigation;