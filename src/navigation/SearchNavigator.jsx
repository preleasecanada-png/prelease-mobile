import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeadNavbar from '../components/Header/HeadNavbar'
import SearchScreenMain from '../screens/Search/SearchScreenMain'
import SearchScreenMain2 from '../screens/Search/SearchScreenMain2'
import WhereTo from '../components/SearchScreenComponents/WhereTo'
import TripSlotCalendar from '../screens/Search/TripSlotCalendar'
import SearchLocationScreen from '../screens/SearchLocation'

const SearchNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false,
                header: () => <HeadNavbar />,

            }}
        >
            <Stack.Screen name="Search" component={SearchScreenMain} />
            <Stack.Screen
                options={{
                    headerShown: false,
                    header: () => null,
                }}


                name="SearchLocation" component={SearchScreenMain2} />
            <Stack.Screen name="WhereTo" component={WhereTo} />
            {/* <Stack.Screen options={{
          headerShown: false,
          header: () => null,
        }} name="TripSlotSelection" component={TripSlotNavigator} /> */}


            <Stack.Screen
                options={{

                    headerShown: false,
                    header: () => null,
                }}
                name="TripSlotCalendar" component={TripSlotCalendar} />

            <Stack.Screen
                options={{
                    header: () => <HeadNavbar backButton={true} />,
                }}
                name="SearchInput"
                component={SearchLocationScreen}
            />




        </Stack.Navigator>
    )
}


export default SearchNavigator

const styles = StyleSheet.create({})