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


export default function DeleteAccount({navigation}){
    const [oldPass, setOld] = useState("");
    const backButton = () => {
        navigation.goBack();
      }

    const deleteAccount = () => {
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
                <Text>Enter Your Password: </Text>
                <TextInput autoCapitalize="none"
                 secureTextEntry style={styles.textInContainer} value={oldPass} onChange={(val) => {setOld(val)}}/>
            </View>
            <TouchableOpacity onPress={deleteAccount} style={styles.button}>
                <Text  style={{fontSize: 16, color: "white"}}>Delete Account</Text>
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