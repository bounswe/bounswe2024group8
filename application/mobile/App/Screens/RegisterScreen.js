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
import DropDownPicker from "react-native-dropdown-picker";
import { VITE_API_URL } from "@env";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [teamDropdownOpen, teamDropdownSetOpen] = useState(false);
  const [teamDropdownValue, teamDropdownSetValue] = useState(null);
  const [teamDropdownItems, teamDropdownSetItems] = useState([
    { label: "Adana Demirspor", value: "ADANADEMIRSPOR" },
    { label: "Alanyaspor", value: "ALANYASPOR" },
    { label: "Ankaragucu", value: "ANKARAGUCU" },
    { label: "Antalyaspor", value: "ANTALYASPOR" },
    { label: "Basaksehir", value: "BASAKSEHIR" },
    { label: "Besiktas", value: "BESIKTAS" },
    { label: "Fatih Karagumruk", value: "KARAGUMRUK" },
    { label: "Fenerbahce", value: "FENERBAHCE" },
    { label: "Galatasaray", value: "GALATASARAY" },
    { label: "Gaziantep", value: "GAZIANTEP" },
    { label: "Hatayspor", value: "HATAYSPOR" },
    { label: "Istanbulspor", value: "ISTANBULSPOR" },
    { label: "Kasimpasa", value: "KASIMPASA" },
    { label: "Kayserispor", value: "KAYSERISPOR" },
    { label: "Konyaspor", value: "KONYASPOR" },
    { label: "Pendikspor", value: "PENDIKSPOR" },
    { label: "Rizespor", value: "RIZESPOR" },
    { label: "Samsunspor", value: "SAMSUNSPOR" },
    { label: "Sivasspor", value: "SIVASSPOR" },
    { label: "Trabzonspor", value: "TRABZONSPOR" },
  ]);

  let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let password_reg = /^[A-Zığüçşa-z0-9]+$/;

  const ref_firstName = useRef();
  const ref_lastName = useRef();
  const ref_password = useRef();

  const onSignupClick = () => {
    if (email === "") {
      setError("Email can not be left empty.");
    } else if (email_reg.test(email) === false) {
      setError("Email format is not valid.");
    } else if (firstName === "") {
      setError("First Name can not be left empty.");
    } else if (lastName === "") {
      setError("Last Name can not be left empty.");
    } else if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
    } else if (password_reg.test(password) === false) {
      setError("Password must consist of only letters and numbers.");
    } else if (teamDropdownValue === null) {
      setError("Team can not be left empty.");
    } else {
      const userParams = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        favoriteTeam: teamDropdownValue,
      };

      console.log(userParams);

      axios
        .post(`${VITE_API_URL}/api/v1/auth/register`, userParams)
        .then((response) => {
          console.log(response.data);
          Alert.alert("", "Account is successfully created.", [
            { text: "Ok", onPress: () => navigation.navigate("Login") },
          ]);
        })
        .catch((error) => {
          setError(email + " already in use.");
          console.log(error);
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
            autoCapitalize="none"
            value={email}
            onSubmitEditing={() => ref_firstName.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setFirstName}
            placeholder="First Name"
            autoCapitalize="none"
            value={firstName}
            ref={ref_firstName}
            onSubmitEditing={() => ref_lastName.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setLastName}
            placeholder="Last Name"
            autoCapitalize="none"
            value={lastName}
            ref={ref_lastName}
            onSubmitEditing={() => ref_password.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            ref={ref_password}
          />
          <DropDownPicker
            open={teamDropdownOpen}
            value={teamDropdownValue}
            items={teamDropdownItems}
            setOpen={teamDropdownSetOpen}
            setValue={teamDropdownSetValue}
            setItems={teamDropdownSetItems}
            placeholder="Team"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSignupClick} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: { color: "red", textAlign: "center", marginTop: "3%" },
  buttonContainer: {
    height: "10%",
    width: "90%",
    alignItems: "center",
    marginTop: "10%",
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
