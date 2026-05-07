import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import {
    Pressable,
    StatusBar,
    StyleSheet,
    View,
    Text,
    LayoutChangeEvent,
    TouchableOpacity,
    Animated,
} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import CustomDrawerContent from './CustomDrawerContent'
import { Colors } from '../../theme'
import Icon from 'react-native-vector-icons/Feather'
import ProfileInformation from '../Profile/ProfileInformation'
import { useDispatch } from 'react-redux'

// ------------------------------------------------------------------
const Stack = createStackNavigator()
const CustomDrawer = ({ children, heading, icon }) => {

    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()

    const closeDrawwer = () => {
        setShowMenu(false)
        Animated.timing(scale, {
            toValue: showMenu ? 1 : 0.8,
            duration: 300,
            useNativeDriver: true
        }).start();
        Animated.timing(moveToRight, {
            toValue: showMenu ? 0 : 250,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const openDrawwer = () => {
        Animated.timing(scale, {
            toValue: showMenu ? 1 : 0.8,
            duration: 300,
            useNativeDriver: true
        }).start();
        Animated.timing(moveToRight, {
            toValue: showMenu ? 0 : 270,
            useNativeDriver: true
        }).start()
        setShowMenu(true)
        dispatch({ type: "GO_TO_DETAILS", payload: { drawerOpen: true } })
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.primary }} >

                {
                    showMenu ?
                        <AnimatedTouchable style={{ flex: 1, zIndex: 99, borderRadius: showMenu ? 20 : 0, backgroundColor: Colors.white, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, transform: [{ scale: scale }, { translateX: moveToRight }], opacity: showMenu ? 0.5 : 1 }} onPress={() => {
                            // showMenu ? closeDrawwer() : openDrawwer()
                            showMenu && closeDrawwer()

                        }}>
                            {!icon && <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }} >
                                {
                                    !showMenu &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            Animated.timing(scale, {
                                                toValue: showMenu ? 1 : 0.8,
                                                duration: 300,
                                                useNativeDriver: true
                                            }).start();
                                            Animated.timing(moveToRight, {
                                                toValue: showMenu ? 0 : 300,
                                                useNativeDriver: true
                                            }).start()
                                            setShowMenu(true)
                                            dispatch({ type: "GO_TO_DETAILS", payload: { drawerOpen: true } })
                                        }} style={{ paddingVertical: 10, paddingLeft: 20 }} >


                                        {!showMenu && <Icon name='menu' color="#fff" />}
                                    </TouchableOpacity>}

                                <Text style={{ color: Colors.darkGray, fontSize: 18, fontWeight: '700', textAlign: "center", width: showMenu ? "100%" : "80%", textTransform: "uppercase" }} >{heading}</Text>
                            </View>}
                            {children}
                        </AnimatedTouchable>
                        :
                        <Animated.View style={{ flex: 1, borderRadius: showMenu ? 20 : 0, backgroundColor: Colors.white, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, transform: [{ scale: scale }, { translateX: moveToRight }], opacity: showMenu ? 0.5 : 1 }} >
                            {!icon && <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 0, paddingHorizontal: 20 }} >
                                {
                                    !showMenu &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            Animated.timing(scale, {
                                                toValue: showMenu ? 1 : 0.8,
                                                duration: 300,
                                                useNativeDriver: true
                                            }).start();
                                            Animated.timing(moveToRight, {
                                                toValue: showMenu ? 0 : 300,
                                                useNativeDriver: true
                                            }).start()
                                            setShowMenu(true)

                                            dispatch({ type: "GO_TO_DETAILS", payload: { drawerOpen: true } })
                                        }} style={{ borderWidth: 0.5, borderColor: Colors.gray, borderRadius: 50, padding: 10 }} >


                                        <Icon name={'menu'} size={25} color={Colors.black} />
                                    </TouchableOpacity>
                                }

                                <TouchableOpacity style={{ borderWidth: 0.5, borderColor: Colors.gray, borderRadius: 50, padding: 10 }}  >
                                    <Icon name={'bell'} size={25} color={Colors.black} />
                                </TouchableOpacity>
                                {/* <Text style={{ color: Colors.darkGray, fontSize: 18, fontWeight: '700', textAlign: "center", width: showMenu ? "100%" : "80%", textTransform: "uppercase" }} >{heading}</Text> */}
                            </View>}
                            {children}
                            {/* </Pressable> */}
                        </Animated.View>
                }


                {showMenu &&
                    <>
                        <Pressable style={{ marginTop: 20, flexDirection: "row" }} onPress={() => setShowMenu(false)} >
                            <TouchableOpacity style={{
                                padding: 40
                            }} onPress={() => {
                                closeDrawwer()
                            }} style={{ paddingVertical: 10, paddingHorizontal: 20 }} >

                                <Icon name='x' color={Colors.white} size={28} />
                            </TouchableOpacity>
                        </Pressable>

                        <CustomDrawerContent setShowMenu={setShowMenu} closeDrawwer={closeDrawwer} />
                    </>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        height: 60
    },
    activeBackground: {
        position: 'absolute',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -15
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: Colors.primary,
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 36,
        width: 36,
    },
    tab_icon: {
        marginHorizontal: 10,
        paddingHorizontal: 10

    },
    icon_badge: {
        backgroundColor: 'red',
        color: '#fff',
        position: 'absolute',
        top: -6,
        right: -10,
        borderRadius: 20,
        width: 15,
        height: 15,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center'
    }
})

export default CustomDrawer;
