import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChoosPaymentOptionScreen from '../screens/MyRentalProperty/ChoosPaymentOptionScreen';
import PaymentMathodScreen from '../screens/PaymentMathod/PaymentMathodScreen';
import AddPaymentMathodScreen from '../screens/PaymentMathod/AddPaymentMathodScreen';
import BokkingPriceDetailsScreen from '../components/BokkingPriceDetails';
import Checkout from '../components/BokkingPriceDetails/Checkout';

const Stack = createStackNavigator();

const PaymentNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: () => null
      }}
    >
      <Stack.Screen
        name="ChoosPaymentOption"
        component={ChoosPaymentOptionScreen}
        initialParams={{
          ...route.params,
        }}
      />
      <Stack.Screen name="PaymentMathod" component={PaymentMathodScreen}  />
      <Stack.Screen
        name="AddPaymentMathod"
        component={AddPaymentMathodScreen}
      />
      <Stack.Screen
        name="BookNow"
        component={Checkout}
      />
    </Stack.Navigator>
  )
}

export default PaymentNavigator
