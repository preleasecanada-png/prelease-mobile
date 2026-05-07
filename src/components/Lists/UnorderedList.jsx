import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './Style'
import Icon from 'react-native-vector-icons/Octicons'

const UnorderedList = ({ list, style }) => {

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            {/* Icon Dot */}
            <Icon name='dot-fill' size={15} />
            <Text style={styles.listItemText}>{item.description}</Text>
        </View>
    )
    return (
        <View style={[styles.listStyle, style]}>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default UnorderedList

