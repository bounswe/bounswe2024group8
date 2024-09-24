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
import { useRoute } from "@react-navigation/native"

export default function Comment(attrs){

    const [likeCount, setLikeCount] = useState(attrs.likeCount);
    const [dislikeCount, setDislikeCount] = useState(attrs.dislikeCount);
    const [commentLiked, likeComment] = useState(false);
    const [commentDisliked, dislikeComment] = useState(false);
    const [commentBookmarked, bookmarkComment] = useState(false);
    const likePressed = () =>{
        if(commentDisliked){
            dislikeComment(false);
            setDislikeCount(dislikeCount-1);
        }
        if(!commentLiked){
            likeComment(true);
            setLikeCount(likeCount+1);
            return;
        }
        likeComment(false);
        setLikeCount(likeCount-1);
    }
    const disLikePressed = () => {
        if(commentLiked){
            likeComment(false);
            setLikeCount(likeCount-1);
        }
        if(!commentDisliked){
            dislikeComment(true);
            setDislikeCount(dislikeCount+1);
            return
        }
        dislikeComment(false);
        setDislikeCount(dislikeCount-1);
        
    }
    const bookmarkPressed = () => {
        bookmarkComment(!commentBookmarked);
    }
    return(
        <View style={{flexDirection:"row"}}>
            <View style={{borderRadius: 20, marginRight:"3%", overflow: 'hidden', justifyContent: 'center', alignItems: 'center', width: 50, height:50}}>
                <Image style={{width: "100%", height:"100%"}} source={attrs.profilePicture} />
            </View>        
            <View>
                            
                <Text style={{marginBottom: "2%"}}>{attrs.username}: {attrs.comment}</Text>
                <View style={{flexDirection: "row"}}>  
                <TouchableOpacity onPress={likePressed} style={styles.interactionContainer}>
                    <Image style={styles.interactionIcon} source={require("../assets/like.png")} />
                    <Text style={commentLiked ? ({color: "green"}): ({color: "black"})}>{likeCount}</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={disLikePressed} style={styles.interactionContainer}>
                    <Image style={styles.interactionIcon}  source={require("../assets/dislike.png")} /> 
                    <Text style={commentDisliked ? ({color: "red"}): ({color: "black"})}>{dislikeCount}</Text> 
                </TouchableOpacity> 
                <TouchableOpacity onPress={bookmarkPressed} style={styles.interactionContainer}>
                    <Image style={styles.interactionIcon} source={commentBookmarked ? (require("../assets/bookmarked.png")): (require("../assets/bookmark.png"))} />  
                </TouchableOpacity> 
                </View>
            </View> 
        </View>
    )
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
    interactionIcon: {
      width: 40,
      height: 40
    },
    interactionContainer:{
      flexDirection: "row",
      marginRight: "5%"
    }
  });