import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'

const LineSeperator = ({style}) => {
  return (
    <View style={[styles.line, style]} />
  )
}

export default LineSeperator

const styles = StyleSheet.create({
    line: {
        height: 0.5,
        backgroundColor: Colors.dividerOpacityWhite,
    },
})