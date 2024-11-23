import React, { useState } from 'react';
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

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const clearError = () => {
    setError('');
  };

  const onSearchClick = () => {
    Keyboard.dismiss();
    // Placeholder for search functionality
    // This is where you will integrate with the backend API
    console.log('Search initiated for:', query);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.body}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Search</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setQuery}
            onFocus={clearError}
            placeholder="Type your search query"
            autoCapitalize="none"
            value={query}
            onSubmitEditing={onSearchClick}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.errorContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSearchClick} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
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
    height: Math.round(Dimensions.get('window').height * 0.7),
    width: '100%',
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
  searchButton: {
    height: '45%',
    width: '100%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  searchButtonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: '600',
  },
});
