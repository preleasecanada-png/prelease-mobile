import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDrawerContent from '../components/CustomDrawer/CustomDrawerContent'
import WishlistScreen from '../screens/Wishlist/WishlistScreen'
import ChatDetailsScreen from '../screens/Chat/ChatDetailsScreen'
import ChatScreen from '../screens/Chat/ChatScreen'
import CurrentLocationScreen from '../screens/CurrentLocation/CurrentLocationScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import ProfileEditScreen from '../screens/ProfileEdit/ProfileEditScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashboardNavigation from './DashboardNavigation'

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (

        <Drawer.Navigator
    
          screenOptions={{
            drawerStyle: {
              width: '100%'
            },
            // ...topToBottomAnimation,
    
            // drawerIcon:(props)=>{
            //   console.log("Menu", props.color)
            //   return (
            //     <Image source={Icons.chat}
            //       style={{ width: 24, height: 24, tintColor: props.active ? Colors.black : Colors.darkGray }}
            //     />
            //   )
            // },
            headerTitle: ''
          }}
    
    
          drawerContent={props => <CustomDrawerContent closeDrawer={props.navigation.closeDrawer} {...props} />}
        >
          <Drawer.Screen
            name="DashboardMain" component={DashboardNavigation}
            options={{
              headerShown: false,
              header: () => null,
    
    
            }}
    
          />
    
          <Drawer.Screen name="Wishlist" component={WishlistScreen} options={{
            headerShown: false,
            header: () => null,
          }}
          />
          <Drawer.Screen name="ChatAISCreen" component={ChatDetailsScreen} />
          <Drawer.Screen name="Message" component={ChatScreen} options={{
            headerShown: false,
            header: () => null,
          }} />
          <Drawer.Screen name="Location" component={CurrentLocationScreen} options={{
            headerShown: false,
            header: () => null,
          }} />
          <Drawer.Screen name="Settings" component={ProfileScreen} options={{
            headerShown: false,
            header: () => null,
          }} />
          <Drawer.Screen name="ProfileEdit" component={ProfileEditScreen} options={{
            headerShown: false,
            header: () => null,
          }} />
    
        </Drawer.Navigator>
      )
}

export default DrawerNavigation

const styles = StyleSheet.create({})