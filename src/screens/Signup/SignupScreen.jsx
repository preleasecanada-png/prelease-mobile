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
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [role, setRole] = React.useState('renter');
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
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim() || !dateOfBirth.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (including date of birth, format YYYY-MM-DD).');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await AuthService.register({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        date_of_birth: dateOfBirth.trim(),
        password,
        confirm_password: passwordConfirm,
        role,
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
      <CommanText commanText="First name" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="First name"
        type="default"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setFirstName}
        value={firstName}
      />
      <CommanText commanText="Last name" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="Last name"
        type="default"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setLastName}
        value={lastName}
      />
      <CommanText commanText="Date of birth (YYYY-MM-DD)" commanTextstyle={styles.labelStyle} />
      <TextInput
        defaultInput
        placeholder="1990-01-15"
        type="default"
        navigation={navigation}
        inputStyle={[styles.inputStyle, { marginBottom: 10 }]}
        onChangeText={setDateOfBirth}
        value={dateOfBirth}
      />
      <CommanText commanText="I am a..." commanTextstyle={styles.labelStyle} />
      <View style={{ flexDirection: 'row', marginBottom: 14, marginTop: 4 }}>
        <TouchableOpacity
          onPress={() => setRole('renter')}
          style={{ flex: 1, padding: 12, marginRight: 6, borderRadius: 8, borderWidth: 1, borderColor: role === 'renter' ? Colors.primary : '#ccc', backgroundColor: role === 'renter' ? Colors.primary : 'transparent' }}
        >
          <Text style={{ textAlign: 'center', color: role === 'renter' ? '#fff' : '#333', fontWeight: '600' }}>Tenant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRole('landlord')}
          style={{ flex: 1, padding: 12, marginLeft: 6, borderRadius: 8, borderWidth: 1, borderColor: role === 'landlord' ? Colors.primary : '#ccc', backgroundColor: role === 'landlord' ? Colors.primary : 'transparent' }}
        >
          <Text style={{ textAlign: 'center', color: role === 'landlord' ? '#fff' : '#333', fontWeight: '600' }}>Landlord</Text>
        </TouchableOpacity>
      </View>
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
