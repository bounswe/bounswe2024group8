import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import axios from "axios";
import Post from "../components/Post";

export default function SearchResultScreen({ navigation, route }) {
  const [error, setError] = useState();

  const listSearchResults = () => {
    console.log(route.params.param);
    axios
      .get(
        "http://192.168.64.163:8080/api/v1/posts?param=" + route.params.param,
        {
          headers: { Authorization: `Bearer ${route.params.authToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setError("1");
        console.log(error.response);
      });

    return [
      { userId: 1, title: "galata", text: "galata", team: "galatasaray" },
    ];
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/favicon.jpeg")} />
          <Text style={styles.header}>appFanatic.</Text>
        </View>
      </View>
      <FlatList
        data={listSearchResults()}
        renderItem={({ item }) => (
          <Post
            username={item.username}
            profilePic={item.profilePic}
            text={item.text}
          ></Post>
        )}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: Math.round(Dimensions.get("window").height),
  },

  headerContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
  },
  logoContainer: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "15%",
  },
  header: {
    color: "blue",
    fontSize: 25,
    fontWeight: "600",
  },
  flatList: {
    width: "90%",
    marginTop: "5%",
  },
});
