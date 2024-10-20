import React, { useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Colors } from '../constants/Colors';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ref_username = useRef();
  const ref_firstName = useRef();
  const ref_lastName = useRef();
  const ref_password = useRef();

  const { setUser } = useContext(AuthContext);

  const clearError = () => {
    setError('');
  };

  const validateCredentials = () => {
    // prettier-ignore
    if (!email) {
      return 'Enter your email to create your account.';
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format.';
    } 
    else if (!username) {
      return 'Enter your username to create your account.';
    } 
    else if (username.length < 5) {
      return 'The username has to be at least 5 characters.';
    } 
    else if (!password){
      return "Enter your password to create your account.";
    }
    else if (password.length < 3) {
      return 'The password has to be at least 3 characters.';
    } 
    else {
      return '';
    }
  };

  const onSignupClick = () => {
    const userParams = {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    Keyboard.dismiss();

    const tempError = validateCredentials();
    setError(tempError);

    if (tempError) {
      return;
    }

    axios
      .post(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/auth/register`,
        userParams
      )
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        navigation.replace('Home');
      })
      .catch((error) => {
        setError(email + ' already in use.');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.body}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            onFocus={clearError}
            placeholder='Email'
            autoCapitalize='none'
            value={email}
            onSubmitEditing={() => ref_username.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setUsername}
            onFocus={clearError}
            placeholder='Username'
            autoCapitalize='none'
            value={username}
            onSubmitEditing={() => ref_firstName.current.focus()}
            ref={ref_username}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setFirstName}
            onFocus={clearError}
            placeholder='First Name'
            autoCapitalize='words'
            value={firstName}
            onSubmitEditing={() => ref_lastName.current.focus()}
            ref={ref_firstName}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setLastName}
            onFocus={clearError}
            placeholder='Last Name'
            autoCapitalize='words'
            value={lastName}
            onSubmitEditing={() => ref_password.current.focus()}
            ref={ref_lastName}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setPassword}
            onFocus={clearError}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            value={password}
            ref={ref_password}
            onSubmitEditing={onSignupClick}
          />
        </View>
        <View style={styles.errorContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSignupClick} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    minHeight:
      Math.round(Dimensions.get('window').height * 0.8) +
      (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.light,
  },
  container: {
    display: 'flex',
    height: Math.round(Dimensions.get('window').height * 0.8),
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  inputContainer: {
    height: '60%',
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    height: '17%',
    width: '100%',
    borderWidth: 2,
    paddingLeft: '5%',
    borderRadius: 5,
    borderColor: Colors.dark,
    fontSize: 20,
  },
  errorContainer: {
    height: '7%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    height: '25%',
    width: '100%',
    paddingHorizontal: '10%',
  },
  signupButton: {
    height: '45%',
    width: '100%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: '5%',
  },
  signupButtonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: '600',
  },
});
