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
import {VITE_API_URL} from "@env";
import axios from "axios";

export default function FeedScreen({ navigation, route }) {
  const getPosts = () => {
    const [data, setData] = useState(null);
    const apiUrl = `${VITE_API_URL}/api/v1/posts/feed`;
    console.log(route.params.authToken);
    axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${route.params.authToken}`,
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching feed: ", error);
      setData([]);
    });

    return (data ? data : []).map((post) => ({
      id: post.postID,
      profilePic: post.user.profilePicture,
      username: post.username,
      community: post.user.community?.name,
      communityLink: post.communityLink,
      text: post.text,
      imageUrl: post.image,
      likes: post.likes,
      dislikes: post.dislikes,
      commentsCount: post.commentsCount
    }));
  };

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const toggleMenu = () => {
    console.log("Toggle menu");
    setIsMenuVisible(!isMenuVisible);
  };

  const createPost = () => {
    setIsMenuVisible(false);
    navigation.navigate("Post");
    console.log("create post");
  };
  const viewProfile = () => {
    setIsMenuVisible(false);
    navigation.navigate("ProfileScreen", {"profile": {"username": "Jeffrey J.", "profilePhoto": "pp2"}, "selfP": true});
    console.log("view profile");
    
  };
  const settings = () => {
    console.log("settings");
    setIsMenuVisible(false);
    navigation.navigate("Settings");
    
  };
  const logout = () => {
    console.log("logout");
    navigation.navigate("Login");
  };

  const search = () => {
    navigation.navigate("Search", {
      param: text,
      authToken: route.params.accessToken,
    });
  };
  const goToProfile = (attrs) =>{
    navigation.navigate("ProfileScreen", {"profile": attrs});
  }

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.headerContainer}>
        <View style={{ height: 25, width: 25 }}></View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/favicon.jpeg")} />
          <Text style={styles.header}>appFanatic.</Text>
        </View>
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="dots-three-vertical" size={25}></Icon>
          </TouchableOpacity>
        </View>
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
        <TextInput
          placeholder="Search"
          onChangeText={setText}
          value={text}
          onSubmitEditing={search}
        />
      </View>
      <FlatList
        data={getPosts()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate("PostScreen", {"item": item});
          }}>
          <Post
            username={item.username}
            profilePic={item.profilePic}
            text={item.text}
            likes = {item.likes}
            dislikes = {item.dislikes}
            profileFunction = {goToProfile}
          ></Post>
          </TouchableOpacity>
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
  menuButtonContainer: {},
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
