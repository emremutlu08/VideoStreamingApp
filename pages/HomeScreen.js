import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';

const apiURL = "http://127.0.0.1:1337"
const videosAPI = `${apiURL}/videos`

export default class HomeScreen extends React.Component {

  state = {
    videos: [],
    isLoaded: false
  }

  componentDidMount() {
    this.fetchVideos()
  }

  async fetchVideos() {
    return fetch(videosAPI)
      .then(result => result.json())
      .then(json => {
        this.setState({
          videos: json,
          isLoaded: true
        })
      })
      .catch(error => console.log(error));

  }

  render() {
    if (this.state.isLoaded) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.videos}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {

              return (
                <TouchableOpacity
                  onPress={() => { 

                    this.props.navigation.navigate("VideoScreen",{
                        videoURL: item.video_link,
                        thumbnail: item.thumbnail.url,
                        title: item.title,
                        description: item.description
                    })

                  }}
                >

                  <View style={styles.card}>

                    <Image
                      source={{
                        uri: `${apiURL}${item.thumbnail.url}`,
                        width: Dimensions.get("window").width - 40,
                        height: 270
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                      }}
                    >{item.title}</Text>

                  </View>

                </TouchableOpacity>
              )

            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <AppLoading />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  card: {
    margin: 20,
    flex: 1
  }
});
