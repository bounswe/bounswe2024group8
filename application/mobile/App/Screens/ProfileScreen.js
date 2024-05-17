import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import DropDownPicker from "react-native-dropdown-picker";
import Post from "../components/Post";
export default function ProfileScreen({navigation}){
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const route = useRoute();
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    
    const profile = route.params?.profile;
    const toggleMenu = () => {
        console.log("Toggle menu");
        setIsMenuVisible(!isMenuVisible);
      };

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
          }]};
    
    const getFollowStatus = () =>{

      return route.params?.selfP ? -1: 0;
    }
    const [followStatus, setFollowStatus] = useState(getFollowStatus());
    const getUserPosts = () => {
        return getPosts().slice(0,1);
    };

    const getUserLikes = () =>{
      return getPosts().slice(1,2);
    }

    const getUserDislikes = () =>{
      return;
    }

    const getUserBookmarks = () =>{
      return;
    }

      const sa = {
        pp1: require("../assets/dummy_pics/pp1.png"),
        pp2: require("../assets/dummy_pics/pp2.png"),
        image1: require("../assets/dummy_pics/image1.png"),
        image2: require("../assets/dummy_pics/image2.png"),
      };
    
      const createPost = () => {
        setIsMenuVisible(false);
        console.log("create post");
        navigation.navigate("Post");
      };
      const viewProfile = () => {
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
      const backButton = () => {
        navigation.goBack();
      }
    const [teamDropdownOpen, teamDropdownSetOpen] = useState(false);
    const [teamDropdownValue, teamDropdownSetValue] = useState("Posts");
    const [teamDropdownItems, teamDropdownSetItems] = useState([
        {"label": "Posts", "value": "Posts"},
        {"label": "Likes", "value": "Likes"},
        {"label": "Dislikes", "value": "Dislikes"},
        {"label": "Bookmarks", "value": "Bookmarks"}]);

    const getUserData = () =>{
      switch(teamDropdownValue){
        case("Posts"):
          return getUserPosts();
        case("Likes"):
          return getUserLikes();
        case("Dislikes"):
          return getUserDislikes();
        case("Bookmarks"):
          return getUserBookmarks();
        default:
          return null;
      }
    }
    const goToProfile = (attrs) =>{
      navigation.navigate("ProfileScreen", {"profile": attrs});
    }
    
    return (
        <View style={styles.backgroundContainer}>
          <View style={styles.headerContainer}>
          
          <View style={{ height: 25, width: 20 }}></View>
            <TouchableOpacity onPress={backButton}>
              <Image style={styles.backIcon} source={require("../assets/back.png")}/>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={require("../assets/favicon.jpeg")} />
              <Text style={styles.header}>appFanatic.</Text>
            </View>
            <View>
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
          <View style={{flexDirection: "row", marginBottom: "5%"}}>
            <View>
              <View
                style={{ borderRadius: 80, overflow: "hidden", marginBottom: "5%", marginTop: "5%", justifyContent:"flex-start"}}>
                <Image style={{resizeMode:"contain",width: 100, height:100,}} source={sa[profile.profilePhoto]} />               
              </View>
              <Text style={{marginBottom: "2%"}}>{profile.username}</Text>   
            </View>
            {followStatus != -1 ? (
              <TouchableOpacity onPress={() => {setFollowStatus(!followStatus)}} style={followStatus == 0 ? (styles.button): ([styles.redButton])}>
                {followStatus == 0 ? (
                  <Text style={styles.buttonText}>Follow</Text>)
                  :(<Text style={styles.buttonText}>Unfollow</Text>)}
              </TouchableOpacity>
            ):<View></View>}
            
          </View>
          <View>
            <DropDownPicker
            style={{marginBottom:"2%"}}
            open={teamDropdownOpen}
            value={teamDropdownValue}
            items={teamDropdownItems}
            setOpen={teamDropdownSetOpen}
            setValue={teamDropdownSetValue}
            setItems={teamDropdownSetItems}
            />
          </View>
          <FlatList data={getUserData()}
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
            </TouchableOpacity>)}
          />
        </View>
      );
}

    
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: "5%",
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: Math.round(Dimensions.get("window").height),
  },
  imageSelect: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
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
  backIcon: {
    width: 40,
    height: 50,
    resizeMode:"stretch",
  },
  textInContainer: {
    height: "5%",
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginBottom: "5%",
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
  logoContainer: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "15%",
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: "8%",
    marginLeft: "20%",
    width: "40%",
    height: "40%",
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: "5%",
  },
  redButton: {
    backgroundColor: '#800000',
    padding: 10,
    marginTop: "8%",
    marginLeft: "20%",
    width: "40%",
    height: "40%",
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: "5%",
  },
  buttonText:{
    color: "white",
    fontSize: 16,
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