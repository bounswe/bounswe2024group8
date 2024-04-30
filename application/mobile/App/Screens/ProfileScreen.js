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
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
export default function ProfileScreen({ navigation }) {
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

  const onUsernameChange = (value) => {
    changeUsername(value);
  };
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
    console.log("create post");
  };
  const viewProfile = () => {
    console.log("view profile");
    navigation.navigate("Profile");
  };
  const settings = () => {
    console.log("settings");
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
      <Text style={{ marginTop: "10%", fontSize: 30 }}>Profile Details</Text>
      <View
        style={{ borderRadius: 100, overflow: "hidden", marginBottom: "5%" }}
      >
        <Image source={profile.profilePhoto} />
      </View>
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
        onChangeText={onMailChange}
        style={styles.textInContainer}
      />
      <Text style={{ fontWeight: "bold", marginRight: "50%", fontSize: 18 }}>
        Supported Team
      </Text>
      <TextInput
        value={newTeam}
        onChangeText={onTeamChange}
        style={styles.textInContainer}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Save Changes"
          onPress={saveChanges}
          style={{ marginRight: 100 }}
        />
        <Button title="Change Password" style={{ marginRight: "65%" }} />
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
});
