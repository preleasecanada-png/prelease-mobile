import { StyleSheet, Text, View, Alert } from 'react-native'
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
  const navigation = useNavigation()


  const onConitnueGuest = ()=> {
    navigation.navigate("Dashboard")
  }

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
                  btnText="Continue with Google"
                  googleFaceBookBtn={styles.googleFaceBookBtnStyle}
                  onPress={() => Alert.alert('Google Sign-In', 'Google Sign-In requires additional setup. Please use email/password login for now.')}
                />
                <GoogleFaceBookBtn
                  btnImage={Images.Facebook}
                  btnText="Continue with Facebook"
                  onPress={() => Alert.alert('Facebook Login', 'Facebook Login requires additional setup. Please use email/password login for now.')}
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