import * as React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import GoogleFaceBookBtn from '../../components/SignUpLogIn/GoogleFaceBookBtn';
import styles from './Styles/SignupStyle';
import { Colors, Images } from '../../theme';
import AuthLayout from '../../layouts/AuthLayout';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { AuthService } from '../../services';

function SignupScreen({ navigation, route }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Auto-fill referral code from deep link (e.g. preleasecanada://signup?ref=PRL-ABC123)
  React.useEffect(() => {
    const incoming = route?.params?.ref || route?.params?.referral_code;
    if (incoming) setReferralCode(String(incoming).trim());
  }, [route?.params]);

  const renderHeaderLogo = React.useCallback(() => {
    return (
      <View style={[{ alignItems: "center", paddingVertical: WINDOW_HEIGHT * 0.02 }]}>
        <Image source={Images.logoVertical4X} resizeMode="contain" style={styles.logo} />
      </View>
    )
  }, [])

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await AuthService.register({
        name: name.trim(),
        email: email.trim(),
        password,
        password_confirmation: passwordConfirm,
        ...(referralCode.trim() ? { referral_code: referralCode.trim() } : {}),
      });
      if (res?.user || res?.token) {
        Alert.alert('Success', 'Account created! Please log in.');
        navigation.navigate('Login');
      } else if (res?.errors) {
        const msgs = Object.values(res.errors).flat().join('\n');
        Alert.alert('Registration Failed', msgs);
      } else {
        Alert.alert('Error', res?.message || 'Registration failed.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      heading={"Sign Up"}
      otherSignMethod={true}
      bottomAccountText={"Already have an account?"}
      bottomAccountLinkText={'Login'}
      bottomAccountTextPress={() => navigation.navigate('Login')}
      bottomGuestText={"Continue as a guest?"}
      bottomTextEnabled={true}
      renderHeaderImage={renderHeaderLogo}
    >
      <CommanText commanText="Full name" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="Full name"
        type="default"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setName}
        value={name}
      />
      <CommanText commanText="Enter your email" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="E-mail address"
        type="email-address"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setEmail}
        value={email}
      />
      <CommanText commanText="Password" commanTextstyle={styles.labelStyle} />
      <TextInput
        passwordInput
        placeholder="Password"
        type="default"
        navigation={navigation}
        inputStyle={[styles.passwordInputStyle, [styles.inputStyle, { marginBottom: 10 }]]}
        onChangeText={setPassword}
        value={password}
      />
      <CommanText commanText="Confirm Password" commanTextstyle={styles.labelStyle} />
      <TextInput
        passwordInput
        placeholder="Confirm Password"
        type="default"
        navigation={navigation}
        inputStyle={[styles.passwordInputStyle, [styles.inputStyle, { marginBottom: 10 }]]}
        passwordStyle={styles.lastInputStyle}
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
      />
      <CommanText commanText="Referral code (optional)" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="PRL-XXXXXX"
        type="default"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setReferralCode}
        value={referralCode}
        autoCapitalize="characters"
      />
      <CommanBtnScreen
        btnText={loading ? "Creating account..." : "Sign up"}
        commanBtnStyle={[styles.signUpLogInBtn, loading && { opacity: 0.7 }]}
        onBtnPress={handleSignup}
        disabled={loading}
      />
    </AuthLayout>
  );
}

export default SignupScreen;
