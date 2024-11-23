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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ref_username = useRef();
  const ref_email = useRef();
  const ref_password = useRef();

  const { setUser } = useContext(AuthContext);

  const clearError = () => {
    setError('');
  };

  const validateCredentials = () => {
    if (!username) {
      return 'Enter your username to create your account.';
    } else if (username.length < 5) {
      return 'The username has to be at least 5 characters.';
    } else if (!email) {
      return 'Enter your email to create your account.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format.';
    } else if (!password) {
      return 'Enter your password to create your account.';
    } else if (password.length < 3) {
      return 'The password has to be at least 3 characters.';
    } else {
      return '';
    }
  };

  const onSignupClick = () => {
    const userParams = {
      userName: username,
      email: email,
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
        navigation.replace('Home');
      })
      .catch(() => {
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
            onChangeText={setUsername}
            onFocus={clearError}
            placeholder='Username'
            autoCapitalize='none'
            value={username}
            onSubmitEditing={() => ref_email.current.focus()}
            blurOnSubmit={false}
            ref={ref_username}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            onFocus={clearError}
            placeholder='Email'
            autoCapitalize='none'
            value={email}
            onSubmitEditing={() => ref_password.current.focus()}
            blurOnSubmit={false}
            ref={ref_email}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.returnButton}
          >
            <Text style={styles.returnButtonText}>Return to Login</Text>
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
    justifyContent: 'center',
    backgroundColor: Colors.light,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    borderWidth: 2,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: Colors.dark,
    fontSize: 18,
    marginBottom: 15,
    paddingVertical: 10,
  },
  errorContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 15,
    marginBottom: 15,
  },
  signupButtonText: {
    color: Colors.light,
    fontSize: 18,
    fontWeight: '600',
  },
  returnButton: {
    backgroundColor: Colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.dark,
    paddingVertical: 15,
  },
  returnButtonText: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: '600',
  },
});
