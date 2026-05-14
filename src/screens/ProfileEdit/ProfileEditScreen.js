import * as React from 'react';
import { View, Image, Text, TouchableOpacity, Alert, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Container, Content } from '../../components';
import { Colors, Icons, Images } from '../../theme';
import CommanText from '../../components/SignUpLogIn/CommanText';
import ProfilePhoto from '../../components/ProfilePhoto';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileEditStyle';
import HeaderMain from '../../components/HeaderMain';
import CommanHeadingScreen from '../../components/CommanHeading';
import { useSelector, useDispatch } from 'react-redux';
import { AuthService } from '../../services';
import { SET_USER } from '../../actions/types';
import api from '../../services/api';

function ProfileEditScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(s => s.app?.user);
  const [name, setName] = React.useState(user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : ''));
  const [email, setEmail] = React.useState(user?.email || '');
  const [phone, setPhone] = React.useState(user?.phone_no || user?.phone || '');
  const [saving, setSaving] = React.useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required.');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      if (phone.trim()) formData.append('phone', phone.trim());

      const res = await api.post('/profile-update', formData);
      if (res?.user || res?.data) {
        const updatedUser = res.user || res.data;
        dispatch({ type: SET_USER, payload: updatedUser });
        Alert.alert('Success', 'Profile updated!');
        navigation.goBack();
      } else if (res?.errors) {
        Alert.alert('Error', Object.values(res.errors).flat().join('\n'));
      } else {
        Alert.alert('Error', res?.message || 'Failed to update profile.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
    setSaving(false);
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    marginBottom: 6,
  };

  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        containerStyle={{ paddingHorizontal: 20 }}
        customRightIcon={true}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanHeadingScreen
          headingText
          heading="Edit Profile"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          commanHeadingTextStyle={styles.commanHeadingTextStyle}
          navigation={navigate}
        />
        <ProfilePhoto source={0} />

        <View>
          <CommanHeadingScreen
            headingText
            heading="Basic Information"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <CommanText commanText="Full Name" commanTextstyle={styles.inputLabelText} />
          <RNTextInput
            style={inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
          />

          <CommanText commanText="Email" commanTextstyle={styles.inputLabelText} />
          <RNTextInput
            style={[inputStyle, { backgroundColor: '#f0f0f0' }]}
            value={email}
            editable={false}
            placeholder="Email"
          />
        </View>

        <View>
          <CommanHeadingScreen
            headingText
            heading="Contact Information"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <CommanText commanText="Phone Number" commanTextstyle={styles.inputLabelText} />
          <RNTextInput
            style={inputStyle}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          <CommanText
            commanText={'This info helps us keep in touch. We won\'t share your private details with other Prelease users.'}
            commanTextstyle={styles.inputHelpingTextStyle}
          />
        </View>

        <CommanBtnScreen
          btnText={saving ? "Saving..." : "Update"}
          commanBtnStyle={[styles.profileSaveChangeBtn, saving && { opacity: 0.7 }]}
          onBtnPress={handleUpdate}
          disabled={saving}
        />
      </Content>
    </Container>
  );
}

export default ProfileEditScreen;
