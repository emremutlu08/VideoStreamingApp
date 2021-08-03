import React from "react";

import { Text, View, StyleSheet } from "react-native";

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'

export default class VideoScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <VideoPlayer
                    height={270}
                    videoProps={{
                        source: {
                            uri: `${this.props.route.params.videoURL}`
                        },
                        shouldPlay: true,

                    }}
                    sliderColor="#FF00000"
                />

                <Text
                    style={{
                        fontSize: 22,
                        margin: 10
                    }}
                >{this.props.route.params.title}</Text>
                <Text
                    style={{
                        fontSize: 18,
                        marginHorizontal: 10
                    }}
                >{this.props.route.params.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
