import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Icons, Images, Colors } from '../theme'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { buttonStyle, style } from 'styled-system'
import { useKeyboardStatus } from '../hooks/useKeyboardStatus'
import { useSelector } from 'react-redux'
import { orderSelector } from '../redux/reducers/AppReducer'


function MyTabBar({ state, descriptors, navigation }) {
    const { isKeyboardVisible, keyboardVisibilityControl } = useKeyboardStatus();
    const {keyboardVisible} = useSelector(orderSelector)
     // Get the current route name
  const currentRoute = state.routes[state.index].name;
    // Define the screens where the tab bar should be hidden
    const hiddenTabBarScreens = ['PreLease AI']; // Add screens where you want to hide the tab bar

    const shouldHideTabBar = hiddenTabBarScreens.includes(currentRoute);
    // if (shouldHideTabBar) {
    //     return <View style={{ height: 0 }} />; 
    // }

    const tabBarIcons = React.useCallback((index, active) => {
        if (index === 0) {
            return active ? <Image source={Icons.home_filled3x} style={styles.activeTabBarIconsStyle} />
                :
                <Image source={Icons.home_outlined3x} style={styles.tabBarIconStyle} />

        }
        else if (index === 1) {
            return active ? <Image source={Icons.heart_filled3x} style={styles.activeTabBarIconsStyle} />
                :
                <Image source={Icons.heart_outlined3x} style={styles.tabBarIconStyle} />

        }
        else if (index === 2) {
            return active ? <Image source={Icons.ai_chat_filled3x} style={styles.activeTabBarIconsStyle} />
                :
                <Image source={Icons.ai_chat_outlined3x} style={styles.tabBarIconStyle} />


        }
        else if (index === 3) {
            return active ? <Image source={Icons.chat_filled3x} style={styles.activeTabBarIconsStyle} />
                :
                <Image source={Icons.chat_outlined3x} style={styles.tabBarIconStyle} />

        }
        else if (index === 4) {
            return <Image source={Images.UserImage} style={{ width: 35, height: 35 }} />
        }

    }, [])
    return (
        <LinearGradient
            colors={[Colors.boxShadowLighterBlack, Colors.white]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={[styles.container,
            { display: shouldHideTabBar ? "none" : "flex" }
            ]}>
                {state.routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[
                                styles.buttonStyle,
                                isFocused &&
                                styles.activeButtonStyle,
                                { marginLeft: (isFocused && index == 0) ? 10 : 0, }
                            ]}
                        >
                            {tabBarIcons(index, isFocused)}
                            {isFocused && <Text style={styles.tabBarTextStyle}>
                                {label}
                            </Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </LinearGradient>
    );
}

export default MyTabBar

const styles = StyleSheet.create({
    container: { flexDirection: 'row', height: 70, },
    tabBarTextStyle: { color: Colors.white, marginLeft: 10, fontSize: 12 },
    buttonStyle: {
        // flex: 1,
        width: '18%',
        backgroundColor: Colors.transparent,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        // marginRight: (isFocused && index == 4) ? 0 : 0,
        marginVertical: 12,
    },
    activeButtonStyle: {
        width: '25%',
        backgroundColor: Colors.primary,
        marginLeft: 10


    },
    tabBarIconStyle: { width: 25, height: 25, tintColor: "#777776" },
    activeTabBarIconsStyle: { width: 20, height: 20 },
})