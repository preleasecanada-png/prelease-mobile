import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IdentityVerificationScreen from '../screens/IdentityVerification/IdentityVerificationScreen';
import SelectProofScreen from '../screens/SelectProof/SelectProofScreen';
import EmergencyContactScreen from '../screens/EmergencyContact/EmergencyContactScreen';
import EmergencyContactDetailScreen from '../screens/EmergencyContact/EmergencyContactDetailScreen';
import SelectLanguageScreen from '../screens/EmergencyContact/SelectLanguageScreen';
import MyRentalPropertyScreen from '../screens/MyRentalProperty/MyRentalPropertyScreen';
import ActivePropertyScreen from '../screens/MyRentalProperty/ActivePropertyScreen';
import HistoryPropertyScreen from '../screens/MyRentalProperty/HistoryPropertyScreen';
import PaymentNavigator from './PaymentNavigator';
import ChatAISCreen from '../screens/ChatAISCreen/';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import SafetyCenterScreen from '../screens/SafetyCenter/SafetyCenterScreen';
import CallEmergencyServicesScreen from '../screens/SafetyCenter/CallEmergencyServicesScreen';
import SelectCountryScreen from '../screens/SelectCountry/SelectCountryScreen';
import HelpCenterScreen from '../screens/HelpCenter/HelpCenterScreen';
import TermsofServiceScreen from '../screens/TermsofService/TermsofServiceScreen';
import FeedbackScreen from '../screens/Feedback/FeedbackScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import PopularDetailsScreen from '../screens/PopularDetails/PopularDetailsScreen';
import ConfirmPayPropertyScreen from '../screens/PopularDetails/ConfirmPayPropertyScreen';
import PopularDestionationScreen from '../screens/PopularDestionation/PopularDestionationScreen';
import ChatDetailsScreen from '../screens/Chat/ChatDetailsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import CameraScreen from '../screens/Camera/CameraScreen';
import BookScreen from '../screens/Book/BookScreen';
import SearchScreenMain from '../screens/Search/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import ApplicationsScreen from '../screens/Applications/ApplicationsScreen';
import LeasesScreen from '../screens/Leases/LeasesScreen';
import PaymentsScreen from '../screens/Payments/PaymentsScreen';
import SupportScreen from '../screens/Support/SupportScreen';
import ReferralsScreen from '../screens/Referrals/ReferralsScreen';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import MaintenanceScreen from '../screens/Maintenance/MaintenanceScreen';
import ReviewsScreen from '../screens/Reviews/ReviewsScreen';
import InsuranceScreen from '../screens/Insurance/InsuranceScreen';
import DashboardStatsScreen from '../screens/Dashboard/DashboardScreen';
import PreferencesScreen from '../screens/Preferences/PreferencesScreen';
import ApplyScreen from '../screens/Applications/ApplyScreen';
import ApplicationDetailScreen from '../screens/Applications/ApplicationDetailScreen';


const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Stack = createStackNavigator();
const routes = [
  {
    name: 'Drawer',
    component: DrawerNavigation,
  },
  {
    name: 'IdentityVerification',
    component: IdentityVerificationScreen,
  },
  {
    name: 'SelectProof',
    component: SelectProofScreen,
  },
  {
    name: 'EmergencyContact',
    component: EmergencyContactScreen,
  },
  {
    name: 'EmergencyContactDetail',
    component: EmergencyContactDetailScreen,
  },
  {
    name: 'SelectLanguage',
    component: SelectLanguageScreen,
  },
  {
    name: 'MyRentalProperty',
    component: MyRentalPropertyScreen,
  },
  {
    name: 'ActiveProperty',
    component: ActivePropertyScreen,
  },
  {
    name: 'HistoryProperty',
    component: HistoryPropertyScreen,
  },
  {
    name: 'ChoosPaymentOption',
    component: PaymentNavigator,
  },
  {
    name: 'ChatAISCreen',
    component: ChatAISCreen,
  },
  {
    name: 'ChangePassword',
    component: ChangePasswordScreen,
  },
  {
    name: 'SafetyCenter',
    component: SafetyCenterScreen,
  },
  {
    name: 'CallEmergencyServices',
    component: CallEmergencyServicesScreen,
  },
  {
    name: 'SelectCountry',
    component: SelectCountryScreen,
  },
  {
    name: "HelpCenter",
    component: HelpCenterScreen
  },
  {
    name: "TermsofService",
    component: TermsofServiceScreen,

  },
  {
    name: "Feedback",
    component: FeedbackScreen,

  },
  {
    name: "Notification",
    component: NotificationScreen,
    options: leftToRightAnimation,

  },
  {
    name: "PopularDetails",
    component: PopularDetailsScreen,
  },
  {
    name: 'ConfirmPayProperty',
    component: ConfirmPayPropertyScreen,
  },
  {
    name: "PopularDestionation",
    component: PopularDestionationScreen,
  },
  {
    name: "chatDetails",
    component: ChatDetailsScreen,
  },
  {
    name: "Camera",
    component: CameraScreen,
  },
  {
    name: "Filter",
    component: BookScreen,
  },
  {
    name: "Search",
    component: SearchScreenMain,
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
  },
  {
    name: 'ApplicationsList',
    component: ApplicationsScreen,
  },
  {
    name: 'LeasesList',
    component: LeasesScreen,
  },
  {
    name: 'PaymentsList',
    component: PaymentsScreen,
  },
  {
    name: 'SupportList',
    component: SupportScreen,
  },
  {
    name: 'ReferralsList',
    component: ReferralsScreen,
  },
  {
    name: 'VerificationScreen',
    component: VerificationScreen,
  },
  {
    name: 'MaintenanceList',
    component: MaintenanceScreen,
  },
  {
    name: 'ReviewsList',
    component: ReviewsScreen,
  },
  {
    name: 'InsuranceList',
    component: InsuranceScreen,
  },
  {
    name: 'DashboardStats',
    component: DashboardStatsScreen,
  },
  {
    name: 'PreferencesScreen',
    component: PreferencesScreen,
  },
  {
    name: 'ApplyToRent',
    component: ApplyScreen,
  },
  {
    name: 'ApplicationDetail',
    component: ApplicationDetailScreen,
  },
]

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {routes.map(({ name, component, options }) => (
        <Stack.Screen key={name} name={name} component={component} options={options}  />
      ))}
    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})