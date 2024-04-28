import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Post(props) {
  const viewProfile = () => {
    console.log(props.username);
  };

  const sa = {
    pp1: require("../assets/dummy_pics/pp1.png"),
    pp2: require("../assets/dummy_pics/pp2.png"),
    image1: require("../assets/dummy_pics/image1.png"),
    image2: require("../assets/dummy_pics/image2.png"),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={viewProfile}>
        <View style={styles.headerContainer}>
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} source={sa[props.profilePic]} />
          </View>
          <Text>{props.username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/icon.jpeg")} />
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "10%",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 35,
    width: "100%",
  },
  profilePicContainer: {
    height: "100%",
    width: "10%",
    marginRight: "2%",
  },
  profilePic: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 360,
  },
  imageContainer: {
    height: 300,
    width: "100%",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  text: {
    fontSize: 15,
  },
});
