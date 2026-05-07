import * as React from 'react';
import { View, Alert, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import cStyles from './Styles/ChangePasswordStyle';
import api from '../../services/api';

function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/reset-password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      if (res?.message?.toLowerCase().includes('success') || res?.status === 200) {
        Alert.alert('Success', 'Password changed successfully!');
        navigation.goBack();
      } else if (res?.errors) {
        Alert.alert('Error', Object.values(res.errors).flat().join('\n'));
      } else {
        Alert.alert('Error', res?.message || 'Failed to change password.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Change Password"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={cStyles.container}>
        <View style={cStyles.signupLoginInputGroup}>
          <CommanText
            commanText="Enter your current password and choose a new one."
            commanTextstyle={cStyles.changePasswordPageText}
          />
          <CommanText commanText="Current Password" commanTextstyle={cStyles.inputLabelText} />
          <RNTextInput
            style={inputStyle}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry
          />
          <CommanText commanText="New Password" commanTextstyle={cStyles.inputLabelText} />
          <RNTextInput
            style={inputStyle}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />
          <CommanText commanText="Confirm New Password" commanTextstyle={cStyles.inputLabelText} />
          <RNTextInput
            style={inputStyle}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm New Password"
            secureTextEntry
          />
          <CommanBtnScreen
            btnText={loading ? "Updating..." : "Change Password"}
            commanBtnStyle={[cStyles.changePasswordBtn, loading && { opacity: 0.7 }]}
            onBtnPress={handleChangePassword}
            disabled={loading}
          />
        </View>
      </Content>
    </Container>
  );
}

export default ChangePasswordScreen;
