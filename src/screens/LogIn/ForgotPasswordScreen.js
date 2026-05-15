import * as React from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {Container, Content} from '../../components';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import AuthLayout from '../../layouts/AuthLayout';
import styles from '../Signup/Styles/SignupStyle';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {Images} from '../../theme';
import {AuthService} from '../../services';

function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const renderHeaderImage = React.useCallback(() => {
    return (
      <View style={[{alignItems: 'center', marginTop: 30}]}>
        <Image
          source={Images.ForgotPassword}
          resizeMode="contain"
          style={{
            width: WINDOW_WIDTH * 0.5,
            height: WINDOW_HEIGHT * 0.3,
            aspectRatio: 16 / 16,
          }}
        />
      </View>
    );
  }, []);

  const handleSend = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      const res = await AuthService.forgotPassword(email.trim());
      if (res?.message) {
        Alert.alert('Success', res.message);
        navigation.navigate('ResetPassword', {email: email.trim()});
      } else if (res?.errors) {
        Alert.alert('Error', Object.values(res.errors).flat().join('\n'));
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      heading="Forgot"
      backButton
      renderHeaderImage={renderHeaderImage}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>{'Forgot Password?'}</Text>
      </View>
      <CommanText
        commanText="Don't worry! it happens. Please enter your email associated with your account"
        commanTextstyle={styles.forgotPasswordPageText}
      />

      <CommanText
        commanText="Enter Email"
        commanTextstyle={styles.labelStyle}
      />
      <TextInput
        defaultInput
        placeholder="abc@example.com"
        type="email-address"
        inputStyle={[styles.inputStyle, {marginBottom: 10}]}
        navigation={navigation}
        onChangeText={setEmail}
        value={email}
      />
      <CommanBtnScreen
        btnText={loading ? 'Sending...' : 'Send Email'}
        commanBtnStyle={[
          styles.signUpLogInBtn,
          {marginTop: 10},
          loading && {opacity: 0.7},
        ]}
        onBtnPress={handleSend}
        disabled={loading}
      />
    </AuthLayout>
  );
}

export default ForgotPasswordScreen;
