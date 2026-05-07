import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Icons } from '../../theme'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const HeaderMain = ({
    centerImage = true,
    leftIconPress,
    leftIcon,
    rightIconPress,
    rightIcon,
    isVectorIconLeft = true,
    isVectorIconRight = true,
    containerStyle,
    isBlur = false,
    absolute = true,
    centerImageColor = Colors.primary,
    customRightIcon = false,
    customLeftIcon = false,
    iconBgTransparent = false,
    iconColor = Colors.black,
    noRightIcon=false,

}) => {
    return (
        <View style={[absolute ? styles.absolute : { width: "100%" }]}>
            <View style={[styles.container, containerStyle]}>
                <TouchableOpacity style={[
                    styles.button,
                    iconBgTransparent ? {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#CD061F',
                    } : isBlur ? {
                        backgroundColor: Colors.blurGray
                    } : styles.borderRounded
                ]}
                    onPress={leftIconPress}>

                    {
                        customLeftIcon ?
                            leftIcon
                            :
                            isVectorIconLeft ?
                                <Icon name={leftIcon} size={20} color={iconColor} />
                                :
                                <Image resizeMode='contain' source={leftIcon} style={{ width: 18, height: 18, tintColor: iconColor }} />


                    }
                    {isBlur && <View style={styles.blurOverlay} />}
                </TouchableOpacity>

                {centerImage && <Image
                    source={Icons.leave3x}
                    resizeMode='contain'
                    style={{ width: 100, height: 50, tintColor: centerImageColor, marginBottom: 10 }}
                />}

                {!noRightIcon && <TouchableOpacity style={[styles.button,

                iconBgTransparent ? {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#CD061F',
                } : isBlur ? {
                    backgroundColor: Colors.blurGray
                } : styles.borderRounded

                ]}
                    onPress={rightIconPress}
                >

                    {
                        customRightIcon ?
                            rightIcon
                            :
                            isVectorIconRight ?
                                <Icon name={rightIcon} size={20} color={iconColor} />
                                :
                                <Image resizeMode='contain' source={rightIcon} style={{ width: 20, height: 20, tintColor: iconColor }} />
                    }
                    {isBlur && <View style={styles.blurOverlay} />}
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default HeaderMain

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.white,
        //  paddingHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between",

    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with opacity for blur-like effect
        borderRadius: 25,
    },
    button: {
        borderWidth: 0.5, borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 50,
        // padding: 10,
        width: 50,
        height: 50,
        marginTop: 10,
        borderWidth: 0.25,
        borderColor: Colors.white,
        overflow: 'hidden', // Ensure the blur overlay stays within the button bounds
        justifyContent: 'center',
        alignItems: 'center'
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        height: 100,

    },
    borderRounded: {

        borderWidth: 0.5, borderColor: Colors.gray, borderRadius: 50,
    }

})