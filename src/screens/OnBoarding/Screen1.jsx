import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcome from '../../components/Welcome'

const Screen1 = ({ item }) => {
  return (
    <View style={{ flex: 1 }}>
      <Welcome
        key={item.id}
        heading1={item.title1}
        heading2={item.title2}
        peregraph={item.text}
        image={item.image}
        // welcomeSlideImgStyle={item.imageStyle}
      />
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({})