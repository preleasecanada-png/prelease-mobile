import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderMain from '../../HeaderMain'

import { Colors } from '../../../theme'
import { AntDesignIcon, FeatherIcon } from '../../../theme/icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import styles from './Styles'


export const CloseButton = ({ onPress, position="absolute" }) => (
    <TouchableOpacity
        style={[styles.closeButton, position=="relative" && styles.postitionRelative]}
        onPress={onPress}
    >
        <AntDesignIcon name={'close'} size={15} color={Colors.black} />
    </TouchableOpacity>
)

const BackButton = ({ onPress }) => (
    <TouchableOpacity
        style={styles.closeButton}
        onPress={onPress}
    >
        <AntDesignIcon name={'left'} size={22} color={Colors.black} />
    </TouchableOpacity>
)


const Stays = () => {
    return (
        <View style={styles.container}>
            <Text>Stays Screen</Text>
        </View>
    )
}

const Experience = () => {
    return (
        <View style={styles.container}>
            <Text>Experience Screen</Text>
        </View>
    )
}



const HeadNavbar = (
    { backButton }
) => {
    const [index, setIndex] = React.useState(0);
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }
    const [routes] = React.useState([
        { key: 'stays', title: 'Stays', active: true },
        { key: 'experience', title: 'Experience', active: false },
    ])

    const renderScene = SceneMap({
        stays: Stays,
        experience: Experience,
    });


    const renderTabItems = React.useCallback((item, itemIndex) => {
        return (
            <TouchableOpacity onPress={() => setIndex(itemIndex)} style={[styles.tabButton, index == itemIndex && styles.activedtabButton]}>
                <Text style={[styles.tabButtonText, index == itemIndex && styles.activetabButtonText]}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }, [index])

    const renderTabBar = React.useCallback((props) => {
        return (
            <View style={styles.tabsContainer}>

                {props.navigationState.routes.map((item, index) => (
                    renderTabItems(item, index)
                ))}

            </View>
        );
    }, [index])

    return (
        <View style={styles.container}>

            {
                backButton ?

                    <BackButton onPress={goBack} />
                    :

                    <CloseButton onPress={goBack} />
            }




            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                swipeEnabled={false}
                onIndexChange={setIndex}
            />

        </View>
    )
}

export default HeadNavbar
