import React, { useState, useRef } from "react";
import {
    Alert,
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


export default function ChangePassword({navigation}){
    const [oldPass, setOld] = useState("");
    const [newPass, setNew] = useState("");
    const [newPass_, setNew_] = useState("");
    const backButton = () => {
        navigation.goBack();
      }

    const changePass = () => {
        if(newPass.length < 8){
            alert("Password length is too short")
            return;
        }
        if(newPass != newPass_){
            alert("Passwords Are Not Matching")
            return;
        }
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
            <View style={[styles.inputView, {marginTop: "5%"}]}>
                <Text>Your Old Password: </Text>
                <TextInput autoCapitalize="none"
            secureTextEntry style={styles.textInContainer} value={oldPass} onChange={(val) => {setOld(val)}}/>
            </View>
            <View style={styles.inputView}>
                <Text>Your New Password: </Text>
                <TextInput autoCapitalize="none"
            secureTextEntry style={styles.textInContainer} value={newPass} onChange={(val) => {setNew(val)}}/>
            </View>
            <View style={styles.inputView}>
                <View>
                    <Text>Your New Password: </Text>
                    <Text>(Enter Again)</Text>
                </View>
                
                <TextInput autoCapitalize="none"
            secureTextEntry style={styles.textInContainer} value={newPass_} onChange={(val) => {setNew_(val)}}/>
            </View>
            <TouchableOpacity onPress={changePass} style={styles.button}>
                <Text  style={{fontSize: 16, color: "white"}}>Change Password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: StatusBar.currentHeight,
      justifyContent: "flex-start",
      minHeight: Math.round(Dimensions.get("window").height),
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
    textInContainer: {
        height: "50%",
        width: "80%",
        marginTop: "2%",
        marginLeft: "5%",
        marginBottom: "5%",
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: "#0001",
      },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: "5%",
      },
    inputView: {
        flexDirection: "row",
        marginBottom: "5%",
        marginLeft: "5%",
        width: "60%",
    }
})