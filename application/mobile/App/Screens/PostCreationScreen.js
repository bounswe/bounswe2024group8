import React, { useState, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Button,  
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import AutoExpandingTextInput from "../components/AutoExpandingTextInput";
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import {VITE_API_URL} from "@env";
import TagModal from "../components/TagModal";
import Checkbox from "expo-checkbox";

export default function PostCreationScreen({navigation}){
    const profile = {
        profilePhoto: require("../assets/dummy_pics/pp2.png"),
        username: "james",
        email: "james@gmail.com",
        supportedTeam: "Fenerbahçe",
      };
      const[selectedImage, selectImage] = useState(null);
      const[communityPost, setCommunity] = useState(false);
      const[postMessage, changePost] = useState("");
      const[modalVisible, setModalVisible] = useState(false);
      const[tags, setTags] = useState([]);
      
      

      const [isMenuVisible, setIsMenuVisible] = useState(false);

      const backButton = () => {
        console.log("nav");
        navigation.goBack();
      }
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
      const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
        return;
        }
        

        selectImage({ localUri: pickerResult.assets[0].uri });
      }
      const removeImage = () => {
        selectImage(null);
      }
      const textChanged = (text) =>{
        changePost(text);
      }
      const makeCommunity = () =>{
       
        setCommunity(!communityPost);

      }
      const closeModal = () =>{
        setModalVisible(false);
      }
      const toggleModal = () => {
        setModalVisible(!modalVisible);
      }
      const handleTags = (selectedTags) => {
        setTags(selectedTags);
      }
      const sendPost = () => {
        navigation.navigate("Feed");
        return;
        axios.post(`${VITE_API_URL}/api/v1/posts`, {"user_id": 1, 
        "title": profile.username, "text": postMessage, "teamName": profile.supportedTeam, "user": profile.email}).then( (response) => {
          alert(response);
          navigation.navigate("Feed");}
        ).catch((error) => {
          alert("Something went wrong");
        })
        
      }

    return(
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
      <View style={{flexDirection:"row"}}>
        <View style={styles.profilePicContainer} >
        <Image style={styles.profilePic} source={profile.profilePhoto}/>
        </View>
        <AutoExpandingTextInput onChangeText={textChanged}/>
      </View>
      <TouchableOpacity onPress={removeImage}>
        {selectedImage !== null && (
        <Image source={{ uri: selectedImage.localUri }} style={styles.imageSelect}/>
        )}
      </TouchableOpacity>
      <View style= {{flexDirection: "row", marginRight: "60%"}}>
        <TouchableOpacity onPress={pickImage} >
          <Image source={require("../assets/image.png")} style={[styles.interactionIcon, {marginRight: '200%', marginLeft: '50%'}]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={require("../assets/community.png")} style={styles.interactionIcon}/>
        </TouchableOpacity>
      </View>
      <TagModal 
        isVisible = {modalVisible}
        closeModal = {closeModal}
        onSelectTags = {handleTags}
      />
      <TouchableOpacity style={styles.button} onPress={sendPost}>
        <Text style={styles.buttonText}>Publish Post</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
          <Text style={{marginRight: "5%"}}>Publish This As A Community Post</Text>
          <Checkbox value={communityPost} onValueChange={makeCommunity}/>
      </View>
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
    profilePic: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 100,
        overflow: "hidden"
      },
      profilePicContainer: {
        height: 50,
        width: "10%",
        marginRight: "2%",
      },
  
    headerContainer: {
      marginTop: "5%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    backIcon: {
      width: 40,
      height: 50,
      resizeMode:"stretch",
    },
    header: {
      color: "blue",
      fontSize: 25,
      fontWeight: "600",
    },
    headerMenuIcon: {
      right: -100,
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
    interactionIcon:{
        width: 70,
        height: 70
    },
    imageSelect: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
      },
      button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: "5%",
      },
      logoContainer: {
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "15%",
      },
      buttonText: {
        fontSize: 16,
        color: 'white',
      },
});