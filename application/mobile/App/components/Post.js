import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Post(props) {
  const viewProfile = () => {
    console.log(props.username);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={viewProfile}>
        <View style={styles.headerContainer}>
          <Image source={require("../assets/favicon.jpeg")} />
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
