import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

const CommonPopup = ({ children }) => {
    return (
        <View style={{
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "flex-end",
            // alignItems: "center"
        }}>
            <Card style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                width: "100%",
                height: "90%",
                // maxWidth: 300
            }}>
                <Card.Content>
                    {children}
                </Card.Content>
            </Card>
        </View>
    )


}

export default CommonPopup

const styles = StyleSheet.create({})