import React, { useState, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");

  const ref_username = useRef();
  const ref_password = useRef();
  const ref_team = useRef();

  const onSignupClick = () => {
    console.log("sign up");
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            placeholder="E-mail"
            value={email}
            onSubmitEditing={() => ref_username.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setUsername}
            placeholder="Username"
            value={username}
            ref={ref_username}
            onSubmitEditing={() => ref_password.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            value={password}
            ref={ref_password}
            onSubmitEditing={() => ref_team.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setTeam}
            placeholder="Team"
            value={team}
            ref={ref_team}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSignupClick} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: Math.round(Dimensions.get("window").height),
  },
  container: {
    backgroundColor: "white",
    width: "85%",
    height: "75%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
  },
  inputContainer: {
    height: "50%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "5%",
  },
  inputText: {
    height: "18%",
    width: "100%",
    borderWidth: 2,
    padding: "2%",
    margin: "3%",
    borderRadius: 5,
    borderColor: "lightgrey",
  },
  buttonContainer: {
    height: "10%",
    width: "90%",
    alignItems: "center",
    marginTop: "5%",
  },
  signupButton: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  signupButtonText: {
    color: "green",
    fontSize: 20,
    fontWeight: "600",
  },
});
