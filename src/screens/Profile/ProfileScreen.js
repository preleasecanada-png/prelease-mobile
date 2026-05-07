import * as React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content } from '../../components';
import { Colors, Icons, Images } from '../../theme';
import { profileList } from '../../assets/data';
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

function ProfileScreen({ navigation }) {
  const user = useSelector(s => s.app?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try { await AuthService.logout(); } catch (e) {}
    dispatch({ type: LOGOUT });
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Auth' }] }));
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.profileLinkList}
      onPress={() => navigation.navigate(item.pageName)}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={[styles.profileLinkImg]}
      />
      <Text style={[styles.profileLinkText]}>{item.text}</Text>
      <Image source={Images.ViewAllArrow} resizeMode='contain' style={[styles.profileLinkImg, styles.rightArrowIcon]} />
    </TouchableOpacity>
  );
  return (
    <>
      <Container>
        <HeaderMain
          absolute={false}
          leftIcon="chevron-thin-left"
          leftIconPress={() => navigation.goBack()}
          rightIcon={<FeatherIcon name={'bell'} size={25} color={Colors.black} />}
          rightIconPress={() => { }}
          centerImageColor={Colors.lightWhite}
          containerStyle={{
            paddingHorizontal: 20,
          }}
          customRightIcon={true}
        />

        <Content hasHeader contentContainerStyle={styles.container}>

          <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
            <CommanHeadingScreen
              headingText
              heading="Profile"
              commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
              commanHeadingTextStyle={styles.commanHeadingTextStyle}
              navigation={navigate}
            />
          </View>
          <TouchableOpacity
            style={styles.profileEditContent}
          >
            <View style={styles.profileImageContent}>
              <Image
                source={user?.profile_picture ? { uri: user.profile_picture } : Images.UserImage}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userNameEmailText}>
              <Text style={styles.userNameText}>{user?.name || 'Guest'}</Text>
              <Text style={styles.designation}>{user?.role || 'renter'}</Text>
            </View>
          </TouchableOpacity>
          {user?.phone ? (
            <View style={styles.flexRow}>
              <Foundation name='telephone' size={24} color={Colors.black} />
              <Text style={styles.userEmailText}>{user.phone}</Text>
            </View>
          ) : null}
          <View style={styles.flexRow}>
            <MaterialCommunityIcons name='email' size={24} color={Colors.black} />
            <Text style={styles.userEmailText}>{user?.email || ''}</Text>
          </View>

          <CommanBtnScreen
            btnText={"Edit Profile"}
            commanBtnStyle={styles.editProfileBtn}
            icon={<Image
              source={Icons.editPen}
              resizeMode="contain"
              style={styles.editProfileIcon}
            />}
          onBtnPress={() => navigation.navigate('ProfileEdit')}
          />

          <View style={styles.profileLinkListContent}>

            <Card style={styles.cardContainer}>
              <Card.Content style={{paddingVertical: 0}}>
                <FlatList
                  data={profileList}
                  renderItem={renderItem}
                  bounces={false}
                  ListHeaderComponent={()=>(
                    <View style={{ paddingTop: 15 }}>
                    <CommanHeadingScreen
                      headingText
                      heading="Settings"
                      commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
                      navigation={navigate}
                    />
                  </View>
                  )}

                  ListFooterComponent={() => (
                    <TouchableOpacity
                      style={[styles.profileLinkList, {borderBottomWidth: 0}]}
                      onPress={handleLogout}>
                      <Image
                        source={Icons.logout}
                        resizeMode="contain"
                        style={[styles.profileLinkImg, { tintColor: Colors.primary }]}
                      />
                      <Text style={[styles.profileLinkText, { color: Colors.primary }]}>{'Logout'}</Text>
                    </TouchableOpacity>
                  )}
                />
              </Card.Content>
            </Card>
          </View>
        </Content>
      </Container >
    </>
  );
}

export default ProfileScreen;
