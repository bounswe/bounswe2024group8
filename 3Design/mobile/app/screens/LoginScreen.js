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
import { CategoryContext } from '../context/CategoryContext';

import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ref_password = useRef();

  const clearError = () => {
    setError('');
  };

  const onLoginClick = () => {
    const userParams = {
      email: email,
      password: password,
    };

    Keyboard.dismiss();

    console.log('login clicked');
    navigation.navigate('Home');

    /*
    axios
      .post(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/auth/authenticate`,
        userParams
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  const onSignupClick = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.body}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            onFocus={clearError}
            placeholder='Email'
            autoCapitalize='none'
            value={email}
            onSubmitEditing={() => ref_password.current.focus()}
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
          />
        </View>
        <View style={styles.errorContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onLoginClick} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
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
    height: Math.round(Dimensions.get('window').height * 0.7),
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  inputContainer: {
    height: '34%',
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    height: '35%',
    width: '100%',
    borderWidth: 2,
    marginTop: '8%',
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
  loginButton: {
    height: '45%',
    width: '100%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: '5%',
  },
  loginButtonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: '600',
  },
  signupButton: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: Colors.dark,
    borderWidth: 2,
  },
  signupButtonText: {
    color: Colors.dark,
    fontSize: 20,
    fontWeight: '600',
  },
});
