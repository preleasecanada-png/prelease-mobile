import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/Signup/SignupScreen';
import LogInScreen from '../screens/LogIn/LogInScreen';
import ForgotPasswordScreen from '../screens/LogIn/ForgotPasswordScreen';
import ResetPasswordScreen from '../components/SignUpLogIn/ResetPassword';
import OtpSignUpNumberScreen from '../screens/Otp/OtpSignUpNumberScreen';
import OtpForgotPasswordScreen from '../screens/Otp/OtpForgotPasswordScreen';
import SuccessPasswordScreen from '../screens/Success/SuccessPasswordScreen';
import SuccessNumberScreen from '../screens/Success/SuccessNumberScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import { CommonActions } from '@react-navigation/native';

const authRoutes = [

  // { name: 'WelCome', component: WelcomeScreen },
  { name: 'Login', component: LogInScreen },
  { name: 'Signup', component: SignupScreen },
  { name: 'ForgotPassword', component: ForgotPasswordScreen },
  { name: 'ResetPassword', component: ResetPasswordScreen },
  { name: 'OtpSignUpNumber', component: OtpSignUpNumberScreen },
  { name: 'OtpForgotPassword', component: OtpForgotPasswordScreen },
  { name: 'SuccessPassword', component: SuccessPasswordScreen },
  { name: 'SuccessNumber', component: SuccessNumberScreen },


]

const Stack = createStackNavigator();


const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        authRoutes?.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{ headerShown: false }}
          />
        ))
      }
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})