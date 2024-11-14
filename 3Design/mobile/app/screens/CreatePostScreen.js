import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native';

const PostCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // Function to handle file picking
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.type !== 'cancel') {
        console.log(res.assets[0].uri);
      }

      if (res.assets[0].name.endsWith('.obj')) {
        setFile(res[0]);
        Alert.alert(
          'File Selected',
          `You have selected: ${res.assets[0].name}`
        );
      } else {
        Alert.alert('Invalid File', 'Please select an .obj file.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!title || !content || !file) {
      Alert.alert('Error', 'Please fill all fields and select a .obj file.');
      return;
    }

    // Here, you'd handle the upload process (e.g., POST request)
    console.log('Submitting post with title:', title);
    console.log('Content:', content);
    console.log('File:', file);
    Alert.alert('Success', 'Post created successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter title'
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder='Enter content'
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Upload .obj file</Text>
      </TouchableOpacity>
      {file && <Text style={styles.fileName}>Selected File: {file.name}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CreatePost</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileName: {
    marginTop: 10,
    color: '#333',
    fontSize: 14,
  },
  button: {
    height: '10%',
    width: '100%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: '5%',
  },
  buttonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default PostCreationScreen;
