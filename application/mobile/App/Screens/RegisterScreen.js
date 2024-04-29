import React, { useState, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState("");

  let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let username_password_reg = /^[A-Zığüçşa-z0-9]+$/;

  const ref_username = useRef();
  const ref_password = useRef();
  const ref_team = useRef();

  const onSignupClick = () => {
    if (email === "") {
      setError("Email can not be left empty.");
    } else if (email_reg.test(email) === false) {
      setError("Email format is not valid.");
    } else if (username === "") {
      setError("Username can not be left empty.");
    } else if (username_password_reg.test(username) === false) {
      setError("Username must consist of only letters and numbers.");
    } else if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
    } else if (username_password_reg.test(password) === false) {
      setError("Password must consist of only letters and numbers.");
    } /*else if (team === "") {
      setError("Team can not be left empty.");
    }*/ else {
      const userParams = {
        firstName: username,
        lastName: "",
        userName: email,
        password: password,
      };

      axios
        .post("http://192.168.1.103:8080/api/v1/auth/register", userParams)
        .then((response) => {
          console.log(response.data);
          Alert.alert("", "Account is successfully created.", [
            { text: "Ok", onPress: () => navigation.navigate("Login") },
          ]);
        })
        .catch((error) => {
          setError("Duplicate entry");
        });
    }
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
        {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: { color: "red", textAlign: "center" },
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
