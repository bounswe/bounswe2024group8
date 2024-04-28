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
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Post from "../components/Post";

export default function FeedScreen({ navigation }) {
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
        profilePic: "image1",
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
        profilePic: "image2",
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
        profilePic: "pp1",
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

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    console.log("Toggle menu");
    setIsMenuVisible(!isMenuVisible);
  };

  const createPost = () => {
    console.log("create post");
  };
  const viewProfile = () => {
    console.log("view profile");
  };
  const settings = () => {
    console.log("settings");
  };
  const logout = () => {
    console.log("logout");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/favicon.jpeg")}></Image>
        <Text style={styles.header}>Fanatic</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon
            name="dots-three-vertical"
            size={20}
            style={styles.headerMenuIcon}
          ></Icon>
        </TouchableOpacity>
      </View>
      <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={createPost}>
            <Icon name="edit" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Create Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={viewProfile}>
            <Icon name="user" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={settings}>
            <Icon name="cog" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Icon name="log-out" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Icon name="cross" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  headerMenuIcon: {
    right: -100,
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
    marginTop: "5%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    fontSize: 20,
    color: "#fff",
    padding: 10,
    backgroundColor: "tomato",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    paddingLeft: 4,
  },
  menuItemIcon: {
    paddingHorizontal: 4,
  },
});
