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
  Button,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Post from "../components/Post";
import { useRoute } from "@react-navigation/native";

export default function PostScreen({navigation}){
    const route = useRoute();
    const postInfo = route.params?.item;
    const getComments = () =>{
        return [{"username": "Cem", "comment": "Lukaku is trash", "profilePicture": require("../assets/dummy_pics/image2.png")},
        {"username": "Rob", "comment": "I agree!", "profilePicture": require("../assets/dummy_pics/image1.png")}]
    }
    const [comment, commentTyped] = useState("");
    const sendComment = () => {
        return;
    }
    const backButton = () => {
      console.log("nav");
      navigation.goBack();
    }
    return(
    <View style={styles.backgroundContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={backButton}>
          <Image style={styles.backIcon} source={require("../assets/back.png")}/>
        </TouchableOpacity>
        <Image style={{marginLeft: "12%"}} source={require("../assets/favicon.jpeg")}></Image>
        <Text style={styles.header}>appFanatic.</Text>
        <View style={{marginLeft: "20%"}}></View>
      </View>
        <View style={{width: "90%"}}>
        <Post username={postInfo.username}
            profilePic={postInfo.profilePic}
            text={postInfo.text}></Post>
        </View>    
        <FlatList 
        data={getComments()}
        renderItem={({item})=>(
            <View style={{flexDirection: "row", marginRight: "50%", marginBottom: "10%"}}>
                <View style={{borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', width: 50, height:50}}>
                <Image style={{width: "100%", height:"100%"}} source={item.profilePicture} />
                </View>
                <Text>{item.username}: {item.comment}</Text>               
            </View>)}/>
        <View style={{flexDirection: "row", flex:1}}>
        <TextInput placeholder="Drop a comment" style={styles.commentContainer} value={comment} 
        onChangeText={(text) => {commentTyped(text)}}
        />
        <TouchableOpacity style={styles.button} onPress={sendComment}>
            <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
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
    button: {
        marginTop: "5%",
        backgroundColor: '#007bff', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100, 
        height: 50,
      },
      buttonText: {
        color: '#fff', 
        fontSize: 16,
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
     
    },
    commentContainer: {
      height: "50%",
      width: "70%",
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