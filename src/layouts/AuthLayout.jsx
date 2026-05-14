import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Container, Content } from '../components'
import styles from './Styles/AuthLayout'
import LogoHeading from '../components/SignUpLogIn/LogoHeading'
import GoogleFaceBookBtn from '../components/SignUpLogIn/GoogleFaceBookBtn'
import { Colors, Images } from '../theme'
import CommanText from '../components/SignUpLogIn/CommanText'
import { Image } from 'react-native'
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { AuthService } from '../services'
import { CommonActions } from '@react-navigation/native'
import { LOGIN_SUCCESS } from '../actions/types'

const AuthLayout = ({
  heading,
  children,
  otherSignMethod,
  bottomAccountText,
  bottomAccountLinkText,
  bottomAccountTextPress,
  bottomTextEnabled = false,
  backButton = false,
  renderHeaderImage
}) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.configureGoogleSignIn();
  }, []);

  const onConitnueGuest = () => {
    navigation.navigate("Dashboard");
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const res = await AuthService.googleSignIn();
      if (res?.token && res?.user) {
        dispatch({ type: LOGIN_SUCCESS, payload: { user: res.user, token: res.token } });
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] }));
      } else {
        Alert.alert('Google Sign-In Failed', res?.message || res?.error || 'Could not sign in with Google.');
      }
    } catch (e) {
      if (e?.code === '12501') {
        // User cancelled
      } else {
        Alert.alert('Google Sign-In Error', e?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container} extraScrollHeight={1}>
        <LogoHeading
          heading={heading}
          logoHeadingStyle={{ alignItems: "center" }}
          backButton={backButton}
        />
        <View style={styles.signupLoginInputGroup}>
        {renderHeaderImage && renderHeaderImage()}
          {children}
          {otherSignMethod &&
            <>

              <CommanText
                commanText="OR"
                commanTextstyle={styles.otherTextStyle}
              />
              <View style={styles.googleFaceBookBtnRow}>
                <GoogleFaceBookBtn
                  googleImg
                  btnImage={Images.Google}
                  btnText={googleLoading ? "Signing in..." : "Continue with Google"}
                  googleFaceBookBtn={styles.googleFaceBookBtnStyle}
                  onPress={googleLoading ? null : handleGoogleSignIn}
                />
                <GoogleFaceBookBtn
                  btnImage={Images.Facebook}
                  btnText="Continue with Facebook"
                  onPress={() => Alert.alert('Facebook Login', 'Facebook Login is not available yet.')}
                />
              </View>

              <Text onPress={onConitnueGuest} style={styles.bottomGuestText}>
                Continue as a guest?{' '}
              </Text>

            </>}

        </View>


        {bottomTextEnabled && <Text style={styles.bottomAccountText}>
          {bottomAccountText}{' '}
          <Text
            style={styles.loginSignupBtnText}
            onPress={bottomAccountTextPress}>
            {bottomAccountLinkText}
          </Text>
        </Text>}



      </Content>
    </Container>
  )
}

export default AuthLayout