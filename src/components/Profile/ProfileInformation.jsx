import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors, Images } from '../../theme'
import Icon from 'react-native-vector-icons/Feather'
import styles from './Style'
import { useSelector } from 'react-redux'

const ProfileInformation = ({ customContatinerStyle, customUsernameStyle, customEmailStyle }) => {
    const navigation = useNavigation()
    const user = useSelector(state => state.app?.user)
    const userName = user?.name || 'Guest'
    const userEmail = user?.email || ''
    const profilePic = user?.profile_picture
        ? { uri: user.profile_picture }
        : Images.UserImage

    return (
        <TouchableOpacity
            style={[styles.profileEditContent, customContatinerStyle]}
            onPress={() => navigation.navigate('ProfileEdit')}>
            <View style={{flexDirection:"row", justifyContent: "space-between"}}>
                <View style={styles.profileImageContent}>
                    <Image
                        source={profilePic}
                        resizeMode="cover"
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.userNameEmailText}>
                    <Text style={[styles.userNameText, customUsernameStyle]}>{userName}</Text>
                    <Text style={[styles.userEmailText, customEmailStyle]}>{userEmail}</Text>
                </View>
            </View>
            <View style={[styles.userEditIcon, { backgroundColor: Colors.opacityBlack, padding: 7, borderRadius: 50 }]}>
                <Icon
                    name='edit'
                    color={Colors.white}
                    size={15}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ProfileInformation
