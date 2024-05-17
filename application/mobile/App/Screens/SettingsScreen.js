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
} from "react-native";
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import Icon from "react-native-vector-icons/Entypo";
export default function SettingsScreen({ navigation }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const profile = {
    profilePhoto: require("../assets/dummy_pics/pp2.png"),
    username: "james",
    email: "james@gmail.com",
    supportedTeam: "Fenerbahçe",
  };
  const [newUsername, changeUsername] = useState(profile.username);
  const [newMail, changeMail] = useState(profile.email);
  const [newTeam, changeTeam] = useState(profile.supportedTeam);
  const [newPhoto, changePhoto] = useState(profile.profilePhoto);
  const [pUri, setUri] = useState(null);

  const onUsernameChange = (value) => {
    changeUsername(value);
  };
  const backButton = () => {
    navigation.goBack();
  }
  const onMailChange = (value) => {
    changeMail(value);
  };
  const onTeamChange = (value) => {
    changeTeam(value);
  };

  const toggleMenu = () => {
    console.log("Toggle menu");
    setIsMenuVisible(!isMenuVisible);
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
  const saveChanges = () => {
    console.log(
      "Username: " +
        newUsername +
        "," +
        "E-mail: " +
        newMail +
        "," +
        "Team: " +
        newTeam
    );
    navigation.navigate("Feed");
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
    console.log(pickerResult.assets[0].uri);

    setUri({ localUri: pickerResult.assets[0].uri });
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
      <Text style={{ marginTop: "10%", fontSize: 30 }}>Profile Settings</Text>
      <TouchableOpacity onPress={pickImage}>
      <View
        style={{ borderRadius: 100, overflow: "hidden", marginBottom: "5%" }}
      >
        <ImageBackground style={{opacity: 1}} source={require("../assets/pencil.png")}  >
            {
              pUri ? (
                <Image source={{uri: pUri.localUri}} style={[styles.imageSelect, {opacity: 0.75}]}  />):
              (<Image style={{opacity: 0.75}} source={profile.profilePhoto} />)
            }
            
        </ImageBackground>
        
      </View>
      </TouchableOpacity>
      
      
      <Text style={{ fontWeight: "bold", marginRight: "65%", fontSize: 18 }}>
        Username
      </Text>
      <TextInput
        value={newUsername}
        onChangeText={onUsernameChange}
        style={styles.textInContainer}
      />
      <Text style={{ fontWeight: "bold", marginRight: "70%", fontSize: 18 }}>
        E-mail
      </Text>
      <TextInput
        value={newMail}
        editable={false}
        style={styles.textInContainer}
      />
      <Text style={{ fontWeight: "bold", marginRight: "50%", fontSize: 18 }}>
        Supported Team
      </Text>
      <TextInput
        value={newTeam}
        editable={false}
        style={styles.textInContainer}
      />
      <ScrollView style={{width: "100%"}}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={[styles.button, {marginRight: '10%', marginLeft: "10%"}]}>
          <Text style={{color:"white"}}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("ChangePassword")}} style={styles.button}>
          <Text style={{color:"white"}}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate("DeleteAccount")}} style={styles.button}>
          <Text style={{color:"white"}}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
