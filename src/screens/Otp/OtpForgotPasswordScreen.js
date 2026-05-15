import * as React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {Container, Content} from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import OtpInputs from 'react-native-otp-inputs';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import styles from './Styles/OtpStyle';
import AuthLayout from '../../layouts/AuthLayout';
import {Image} from 'react-native';
import {Images} from '../../theme';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
let interval = 0;

function OtpForgotPasswordScreen({navigation}) {
  let optConfirm = '123456';
  const [otpInputFill, setOtpInputFill] = useState(true);

  const [timer, setTimer] = useState(59);

  const ResendOtpTimer = React.memo(() => {
    const startTimer = () => {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };
    React.useEffect(() => {
      startTimer();
      return () => clearInterval(interval);
    }, [interval]);

    return (
      <View style={styles.resendOtpContainer}>
        <Text style={styles.resendOtpText}>Resend OTP</Text>
        <Text style={styles.resendOtpTimerText}>
          {/* format should be like 59:00 */}
          00:{timer < 10 ? `0${timer}` : timer}
        </Text>
      </View>
    );
  });

  const renderHeaderImage = React.useCallback(() => {
    return (
      <View
        style={[{alignItems: 'center', paddingVertical: WINDOW_HEIGHT * 0.02}]}>
        <Image
          source={Images.Otp}
          resizeMode="center"
          style={{width: WINDOW_WIDTH * 0.46, height: WINDOW_HEIGHT * 0.25}}
        />
      </View>
    );
  }, []);

  return (
    <AuthLayout
      heading="Verify"
      backButton
      renderHeaderImage={renderHeaderImage}>
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <Text style={styles.heading}>{'Enter OTP'}</Text>
      </View>
      <CommanText
        commanText="An 4 digit OTP has been sent to"
        commanTextstyle={styles.confirmNumberText}
      />

      <CommanText
        commanText="abc@example.com"
        commanTextstyle={styles.verificationEmailText}
      />
      {otpInputFill ? (
        <OtpInputs
          handleChange={code => {
            if (optConfirm === code) {
              setOtpInputFill(false);
              setTimeout(() => {
                navigation.navigate('ResetPassword');
              }, 3000);
            } else {
              setTimeout(() => {
                navigation.navigate('OtpForgotPassword');
              }, 3000);
            }
          }}
          numberOfInputs={4}
          style={styles.otpInputContainer}
          inputStyles={styles.otpInputStyle}
          autofillFromClipboard={false}
        />
      ) : (
        <View style={styles.loaderContent}>
          <AnimatedEllipsis
            numberOfDots={5}
            minOpacity={0.4}
            animationDelay={200}
            style={styles.loaderDotsStyle}
          />
        </View>
      )}
      <View style={styles.bottomContinueBtn}>
        <CommanBtnScreen
          btnText="Verify"
          commanBtnStyle={styles.otpContinueBtn}
          onBtnPress={() => navigation.navigate('ResetPassword')}
        />
      </View>

      {timer > 0 && <ResendOtpTimer />}

      {timer == 0 && (
        <Text style={styles.bottomAccountText}>
          Didn’t get a code? {''}
          <Text style={styles.loginSignupBtnText}>Resend</Text>
        </Text>
      )}
    </AuthLayout>
  );
}

export default OtpForgotPasswordScreen;
