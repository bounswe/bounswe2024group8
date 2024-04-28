import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Post from "../components/Post";

export default function FeedScreen() {
  const getPosts = () => {
    return [
      {
        id: 1,
        profilePic: "pp1",
        username: "Can Öztemiz",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "Sizce Fenerbahçe'nin Trabzonspor karşısındaki hücum hattı nasıl olmalı?",
        imageUrl: "image1",
        likes: 278,
        dislikes: 12,
        commentsCount: 124,
      },
      {
        id: 2,
        profilePic: "pp2",
        username: "GalaGala123",
        community: "Galatasaray",
        communityLink: "galatasaraylink",
        text: "Icardi'nin bugünkü performansı çok iyi değil miydi?",
        imageUrl: "image2",
        likes: 543,
        dislikes: 23,
        commentsCount: 87,
      },
      {
        id: 3,
        profilePic: "https://example.com/profilepic2.jpg",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
      {
        id: 4,
        profilePic: "https://example.com/profilepic2.jpg",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
      {
        id: 5,
        profilePic: "https://example.com/profilepic2.jpg",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
    ];
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/favicon.jpeg")}></Image>
        <Text style={styles.header}>Fanatic</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" />
      </View>
      <FlatList
        data={getPosts()}
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "blue",
    fontSize: 25,
    fontWeight: "600",
  },
  searchContainer: {
    height: "5%",
    width: "90%",
    marginTop: "5%",
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: "#0001",
  },
  flatList: {
    width: "90%",
    marginVertical: "5%",
  },
});
