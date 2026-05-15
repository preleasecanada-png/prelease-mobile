import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Container, Content} from '../../components';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import styles from '../Signup/Styles/SignupStyle';
import {Images, Colors} from '../../theme';
import {useDispatch} from 'react-redux';
import AuthLayout from '../../layouts/AuthLayout';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthService} from '../../services';
import {LOGIN_SUCCESS} from '../../actions/types';

function LogInScreen({navigation}) {
  const dispatch = useDispatch();
  const {dispatch: ndispatch} = navigation;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const renderHeaderLogo = React.useCallback(() => {
    return (
      <View
        style={[
          {
            alignItems: 'center',
            paddingVertical: WINDOW_HEIGHT * 0.03,
            paddingBottom: 40,
          },
        ]}>
        <Image
          source={Images.logoVertical4X}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    );
  }, []);

  const nextScreen = React.useCallback(screenName => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    });
    ndispatch(resetAction);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await AuthService.login(email.trim(), password);
      if (res?.token && res?.user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: res.user, token: res.token},
        });
        nextScreen('Dashboard');
      } else {
        Alert.alert(
          'Login Failed',
          res?.message || res?.error || 'Invalid credentials.',
        );
      }
    } catch (err) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      heading={'Log In'}
      otherSignMethod={true}
      bottomAccountText={"Don't have an account yet?"}
      bottomAccountLinkText={'Sign up'}
      bottomAccountTextPress={() => navigation.navigate('Signup')}
      bottomTextEnabled={true}
      renderHeaderImage={renderHeaderLogo}>
      <CommanText
        commanText="Enter your email"
        commanTextstyle={styles.labelStyle}
      />
      <TextInput
        defaultInput
        placeholder="abc@example.com"
        type="email-address"
        navigation={navigation}
        inputStyle={styles.inputStyle}
        onChangeText={setEmail}
        value={email}
      />
      <CommanText commanText="Password" commanTextstyle={styles.labelStyle} />
      <TextInput
        passwordInput
        placeholder="Password"
        type="default"
        navigation={navigation}
        inputStyle={styles.inputStyle}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={styles.forgotPasswordLink}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
      <CommanBtnScreen
        btnText={loading ? 'Signing in...' : 'Log in'}
        commanBtnStyle={[styles.signUpLogInBtn, loading && {opacity: 0.7}]}
        onBtnPress={handleLogin}
        disabled={loading}
      />
    </AuthLayout>
  );
}

export default LogInScreen;
