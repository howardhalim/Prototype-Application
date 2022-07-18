import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, Icon } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function TouchButton({ mode, style, ...props }) {
    return (
        <TouchableOpacity
            style = {style}
        >
            <Text
                style = {styles.text}
                {...props}

            >
            </Text> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize : 14
    }
})
