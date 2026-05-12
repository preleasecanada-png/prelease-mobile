import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, Pressable, Image, View, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { Colors, Fonts, Icons, Images } from '../../theme';
import ProfileInformation from '../Profile/ProfileInformation';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import LineSeperator from '../LineSeperator';
import { Divider } from 'react-native-paper';
import CommanBtnScreen from '../CommanBtn';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AuthService } from '../../services';
import { LOGOUT } from '../../actions/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function CustomDrawerContent({ closeDrawer, state, descriptors }) {
    const navigation = useNavigation()
    const [active, setActive] = useState('Dashboard');
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(s => s.app);

    useEffect(() => {
        const index = state.index;
        const route = state.routes[index];
        setActive(route?.name);
    }, [state]);

    const navigateTo = (pathname) => {
        setActive(pathname)
        try {
            navigation.getParent().navigate(pathname);
            closeDrawer()
        }
        catch {
            navigation.navigate(pathname)
            closeDrawer()
        }
    }

    const handleLogout = async () => {
        closeDrawer();
        try {
            await AuthService.logout();
        } catch (e) {}
        dispatch({ type: LOGOUT });
        navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: 'Auth' }] })
        );
    };

    const VectorListItem = ({ title, iconName, route, onPress }) => (
        <Pressable style={[styles?.listItem, active === route && styles.activeListItem]} onPress={onPress || (() => navigateTo(route))} >
            <FeatherIcon name={iconName} size={22} color={Colors.white} />
            <Text style={styles?.listItemText}>{title}</Text>
        </Pressable>
    );

    const ListItem = ({
        title,
        icon,
        activeIcon,
        active,
        onPress,
        route
    }) => {
        return (
            <Pressable style={[styles?.listItem, active == route && styles.activeListItem]} onPress={onPress} >
                <Image source={active == route ? activeIcon : icon} style={{ width: 25, height: 25, tintColor: Colors.white }} />
                <Text style={styles?.listItemText} >{title}</Text>
            </Pressable>
        )
    }

    const isHost = user?.role === 'host';

    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '100%', position: "absolute", top: 0, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
                    <Image source={Icons.leave3x} resizeMode='contain' style={{ width: 100, height: 50 }} />
                </View>

                <Pressable style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
                    <TouchableOpacity onPress={closeDrawer} style={{ paddingVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.shadowLighterBlack, borderRadius: 50 }}>
                        <FeatherIcon name='x' color={Colors.white} size={28} />
                    </TouchableOpacity>
                </Pressable>

                <View style={styles.cardContainer}>
                    <ScrollView>
                        <View style={styles.card}>
                            <ProfileInformation
                                customContatinerStyle={{ backgroundColor: Colors.transparent }}
                                customEmailStyle={{ color: Colors.white }}
                                customUsernameStyle={{ color: Colors.white }}
                            />
                        </View>

                        {isLoggedIn && (
                            <View style={styles.roleBadge}>
                                <FeatherIcon name={isHost ? 'home' : 'user'} size={12} color={Colors.white} />
                                <Text style={styles.roleBadgeText}>{isHost ? 'Host / Landlord' : 'Renter'}</Text>
                            </View>
                        )}

                        <LineSeperator />
                        <View style={{ marginTop: 10 }}></View>

                        {/* Common — Home & Dashboard */}
                        <ListItem title={'Home'} icon={Icons.home_outlined3x} activeIcon={Icons.home_filled3x} active={active} route={"DashboardMain"} onPress={() => navigateTo("DashboardMain")} />
                        <VectorListItem title="Dashboard" iconName="bar-chart-2" route="DashboardStats" />

                        {/* Host-only */}
                        {isHost && (
                            <VectorListItem title="My Properties" iconName="home" route="MyRentalProperty" />
                        )}

                        {/* Renter-only */}
                        {!isHost && (
                            <>
                                <ListItem title={'Wishlist'} icon={Icons.heart_outlined3x} activeIcon={Icons.heart_filled3x} active={active} route={"Wishlist"} onPress={() => navigateTo("Wishlist")} />
                                <ListItem title={'Message'} icon={Icons.chat_outlined3x} activeIcon={Icons.chat_filled3x} active={active} route={"Message"} onPress={() => navigateTo("Message")} />
                            </>
                        )}

                        <LineSeperator />

                        {/* Common */}
                        <VectorListItem title="Notifications" iconName="bell" route="Notification" />
                        <VectorListItem title="Applications" iconName="file-text" route="ApplicationsList" />
                        <VectorListItem title="Leases" iconName="file" route="LeasesList" />
                        <VectorListItem title="Payments" iconName="credit-card" route="PaymentsList" />
                        <VectorListItem title="Reviews" iconName="star" route="ReviewsList" />
                        <VectorListItem title="Maintenance" iconName="tool" route="MaintenanceList" />

                        <LineSeperator />

                        {/* Renter-only */}
                        {!isHost && (
                            <>
                                <VectorListItem title="Preferences" iconName="sliders" route="PreferencesScreen" />
                                <VectorListItem title="Insurance" iconName="shield" route="InsuranceList" />
                            </>
                        )}

                        {/* Common */}
                        <VectorListItem title="Referrals" iconName="gift" route="ReferralsList" />
                        <VectorListItem title="Support" iconName="help-circle" route="SupportList" />
                        <VectorListItem title="Verification" iconName="check-circle" route="VerificationScreen" />

                        <LineSeperator />

                        <ListItem title={'Settings'} icon={Icons.setting_outlined} activeIcon={Icons.setting} active={active} route={"Profile"} onPress={() => navigateTo("Profile")} />

                        {isLoggedIn ? (
                            <VectorListItem title="Logout" iconName="log-out" route="logout" onPress={handleLogout} />
                        ) : (
                            <CommanBtnScreen
                                btnText="SIGNIN / SIGNUP"
                                commanBtnStyle={styles.signUpLogInBtn}
                                commanBtnTextStyle={styles.signUpLogInBtnTextStyle}
                                onBtnPress={() => {
                                    closeDrawer();
                                    navigation.dispatch(
                                        CommonActions.reset({ index: 0, routes: [{ name: 'Auth' }] })
                                    );
                                }}
                            />
                        )}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        // padding: 16,
        flex: 1,
        backgroundColor: Colors.primary
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 30,

        // width: "77%"
    },
    listItemText: {
        color: Colors.white,
        marginLeft: 5,
        fontSize: 16,
        letterSpacing: 0.2,
        ...Fonts.style.lightText,
        marginLeft: 20,
        letterSpacing: 0.8
        // fontFamily: fontFamilySemiBold,
    },
    navigationContainer: {
    },
    drawerCloseButton: {
        alignSelf: "flex-end",
    },
    cardContainer: {
        flex: 1,
    },
    card: {
        // width: (windowWidth / 1.4) - 15,
        // height: 150,
        // margin: 6
    },
    cardHeading: {
        fontSize: windowWidth / 20,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
        textAlignVertical: "center",
        display: "flex",
        paddingHorizontal: 7,
        height: 150
    },

    icon_badge: {
        backgroundColor: Colors.black,
        position: 'absolute',
        top: "60%",
        bottom: "50%",
        right: -10,
        borderRadius: 20,
        width: 20,
        height: 20,
        justifyContent: "center"
    },
    icon_badge_text: {
        color: Colors.primary,
        fontWeight: '700',
        fontSize: 10,
        textAlign: 'center',
        // fontFamily: fontFamilyBold,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 6,
        gap: 6,
    },
    roleBadgeText: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 12,
        letterSpacing: 0.5,
        marginLeft: 6,
    },
    activeListItem: {
        backgroundColor: Colors.boxShadowLighterBlack,
        // height: 100,

        // paddingVertical: 15,
        // width: "77%"

    },
    
  signUpLogInBtn: {
    borderRadius: 50,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 20,
    // marginTop: 'auto',

  },
  signUpLogInBtnTextStyle:{
    color: Colors.black,
    textTransform: 'none'
  }
});

export default CustomDrawerContent