import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import {navigate} from '../../navigation/ReduxNavigation';
import AuthLayout from '../../layouts/AuthLayout';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {Images} from '../../theme';
import {Image} from 'react-native';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import {Text} from 'react-native';
import styles from '../Signup/Styles/SignupStyle';
import TextInput from '../../components/SignUpLogIn/TextInput';
import {marginTop} from 'styled-system';

function ResetPasswordScreen({navigation}) {
  const renderHeaderImage = React.useCallback(() => {
    return (
      <View
        style={[{alignItems: 'center', paddingVertical: WINDOW_HEIGHT * 0.02}]}>
        <Image
          source={Images.ResetPassword}
          resizeMode="center"
          style={{width: WINDOW_WIDTH * 0.55, height: WINDOW_HEIGHT * 0.25}}
        />
      </View>
    );
  }, []);

  //   <Header
  //   transparent
  //   hasBackBtn
  //   title="Reset Password"
  //   onBackPress={() => navigation.goBack()}
  // />
  return (
    <AuthLayout
      backButton
      heading={'Reset'}
      renderHeaderImage={renderHeaderImage}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>{'Reset your password'}</Text>
      </View>
      <CommanText
        commanText="Now you can reset your old password"
        commanTextstyle={[styles.forgotPasswordPageText, styles.resetPageText]}
      />
      <CommanText
        commanText="Enter a New Password"
        commanTextstyle={styles.labelStyle}
      />
      <TextInput
        passwordInput
        placeholder="New Password"
        type="default"
        inputStyle={[styles.inputStyle]}
        navigation={navigate}
      />
      <CommanText
        commanText="Enter a Confirm Password"
        commanTextstyle={[styles.labelStyle, {marginTop: 10}]}
      />
      <TextInput
        passwordInput
        placeholder="Confirm Password"
        type="default"
        inputStyle={styles.inputStyle}
        navigation={navigate}
      />
      <CommanBtnScreen
        btnText="Submit"
        commanBtnStyle={[styles.signUpLogInBtn, {marginTop: 20}]}
        onBtnPress={() => navigation.navigate('SuccessPassword')}
      />
    </AuthLayout>
  );
}

export default ResetPasswordScreen;
