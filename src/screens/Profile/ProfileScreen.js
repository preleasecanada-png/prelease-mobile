import * as React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Container, Content } from '../../components';
import { Colors, Icons, Images } from '../../theme';
import styles from './Styles/ProfileStyle';
import HeaderMain from '../../components/HeaderMain';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import CommanHeadingScreen from '../../components/CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanBtnScreen from '../../components/CommanBtn';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AuthService } from '../../services';
import { LOGOUT } from '../../actions/types';
import { CommonActions } from '@react-navigation/native';
import { imageUrl } from '../../services/api';

const MENU_ITEMS = [
  { id: 'location',  icon: 'map-pin',    label: 'My Location',      route: 'Location' },
  { id: 'password',  icon: 'lock',       label: 'Change Password',   route: 'ChangePassword' },
  { id: 'language',  icon: 'globe',      label: 'Language',          route: 'SelectLanguage' },
  { id: 'privacy',   icon: 'shield',     label: 'Privacy Policy',    route: 'TermsofService' },
  { id: 'faq',       icon: 'help-circle',label: 'FAQ / Help Center', route: 'HelpCenter' },
  { id: 'support',   icon: 'message-circle', label: 'Support',       route: 'SupportList' },
  { id: 'referrals', icon: 'gift',       label: 'Referrals',         route: 'ReferralsList' },
];

function ProfileScreen({ navigation }) {
  const user = useSelector(s => s.app?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try { await AuthService.logout(); } catch (e) {}
    dispatch({ type: LOGOUT });
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Auth' }] }));
  };

  const avatarSource = user?.profile_picture
    ? { uri: user.profile_picture.startsWith('http') ? user.profile_picture : imageUrl(user.profile_picture) }
    : Images.UserImage;

  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<FeatherIcon name="bell" size={25} color={Colors.black} />}
        rightIconPress={() => navigation.navigate('Notification')}
        centerImageColor={Colors.lightWhite}
        containerStyle={{ paddingHorizontal: 20 }}
        customRightIcon={true}
      />

      <Content hasHeader contentContainerStyle={styles.container}>
        {/* Header title */}
        <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
          <CommanHeadingScreen
            headingText
            heading="Profile"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            commanHeadingTextStyle={styles.commanHeadingTextStyle}
            navigation={navigate}
          />
        </View>

        {/* Avatar + name */}
        <View style={styles.profileEditContent}>
          <View style={styles.profileImageContent}>
            <Image source={avatarSource} resizeMode="cover" style={styles.profileImage} />
          </View>
          <View style={styles.userNameEmailText}>
            <Text style={styles.userNameText}>{user?.name || 'Guest'}</Text>
            <Text style={styles.designation}>
              {user?.role === 'host' ? 'Host / Landlord' : 'Renter'}
            </Text>
          </View>
        </View>

        {/* Contact info */}
        {user?.phone ? (
          <View style={styles.flexRow}>
            <Foundation name="telephone" size={20} color={Colors.black} />
            <Text style={styles.userEmailText}>{user.phone}</Text>
          </View>
        ) : null}
        <View style={styles.flexRow}>
          <MaterialCommunityIcons name="email" size={20} color={Colors.black} />
          <Text style={styles.userEmailText}>{user?.email || ''}</Text>
        </View>

        {/* Edit profile button */}
        <CommanBtnScreen
          btnText="Edit Profile"
          commanBtnStyle={styles.editProfileBtn}
          icon={<Image source={Icons.editPen} resizeMode="contain" style={styles.editProfileIcon} />}
          onBtnPress={() => navigation.navigate('ProfileEdit')}
        />

        {/* Settings menu */}
        <View style={styles.profileLinkListContent}>
          <Card style={styles.cardContainer}>
            <Card.Content style={{ paddingVertical: 0 }}>
              <View style={{ paddingTop: 15 }}>
                <CommanHeadingScreen
                  headingText
                  heading="Settings"
                  commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
                  navigation={navigate}
                />
              </View>

              {MENU_ITEMS.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.profileLinkList,
                    index === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <View style={localStyles.iconWrap}>
                    <FeatherIcon name={item.icon} size={20} color={Colors.primary} />
                  </View>
                  <Text style={styles.profileLinkText}>{item.label}</Text>
                  <FeatherIcon name="chevron-right" size={18} color="#ccc" />
                </TouchableOpacity>
              ))}

              {/* Logout */}
              <TouchableOpacity
                style={[styles.profileLinkList, { borderBottomWidth: 0 }]}
                onPress={handleLogout}
              >
                <View style={[localStyles.iconWrap, { backgroundColor: '#fef2f2' }]}>
                  <FeatherIcon name="log-out" size={20} color={Colors.primary} />
                </View>
                <Text style={[styles.profileLinkText, { color: Colors.primary }]}>Logout</Text>
                <FeatherIcon name="chevron-right" size={18} color="#ccc" />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </Content>
    </Container>
  );
}

const localStyles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
});

export default ProfileScreen;
