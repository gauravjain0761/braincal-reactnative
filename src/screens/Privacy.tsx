import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

type Props = {}

const Privacy = (props: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView style={{ flex: 1 }} source={{ uri: 'https://braincal.com/privacy-policy/' }} />
        </View>
    )
}

export default Privacy

const styles = StyleSheet.create({})