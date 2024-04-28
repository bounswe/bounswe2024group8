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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ref_password = useRef();

  const onLoginClick = () => {
    console.log(email + " logged in with password " + password);
    navigation.navigate("Feed");
  };

  const onSignupClick = () => {
    console.log("sign up");
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up / Log In</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            placeholder="E-mail"
            value={email}
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
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onLoginClick} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
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
    width: "80%",
    height: "70%",
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
    height: "40%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    marginBottom: 0,
  },
  inputText: {
    height: "25%",
    width: "100%",
    borderWidth: 2,
    margin: "3%",
    padding: "3%",
    borderRadius: 5,
    borderColor: "lightgrey",
    fontSize: 15,
  },
  buttonContainer: {
    height: "10%",
    width: "90%",
    marginTop: "5%",
  },
  loginButton: {
    height: "100%",
    width: "100%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  signupButton: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  signupButtonText: {
    color: "green",
    fontSize: 20,
    fontWeight: "600",
  },
});
