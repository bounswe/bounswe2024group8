import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from 'expo-checkbox';
import { Categories } from '../constants/Categories';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');

  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const [joinToTournament, setJoinToTournament] = useState(false);

  const [content, setContent] = useState('');

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const [file, setFile] = useState(null);
  const [isVisual, setIsVisual] = useState(false);

  const validateInputs = () => {
    if (title.length < 5) {
      Alert.alert(
        'Validation Error',
        'Title must be at least 5 characters long.'
      );
      return false;
    }
    if (!category) {
      Alert.alert('Validation Error', 'Please select a category.');
      return false;
    }
    if (content.length < 10) {
      Alert.alert(
        'Validation Error',
        'Content must be at least 10 characters long.'
      );
      return false;
    }
    return true;
  };

  const handleAddTag = () => {
    if (currentTag.trim().length > 0) {
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, idx) => idx !== index));
  };

  // Function to handle file picking
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});

      if (res.assets[0].name.endsWith('.obj')) {
        setFile(res.assets[0]);
        setIsVisual(true);
        Alert.alert(
          'Information',
          `${res.assets[0].name} file has been added to the post.`
        );
      } else {
        setFile(null);
        setIsVisual(false);
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

  const sendPost = () => {
    if (!validateInputs()) return;

    var fd = new FormData();

    fd.append('title', title);
    fd.append('text', content);
    fd.append('categoryId', category);
    fd.append('isVisualPost', isVisual);
    fd.append('tags', JSON.stringify(tags));
    fd.append('joinToTournament', joinToTournament);
    if (isVisual) fd.append('file', file);

    axios
      .post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts`, fd, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => Alert.alert('Success', 'Your post is created successfully.'))
      .catch(() => Alert.alert('Error', 'Something went wrong.'));

    // Reset the form
    setTitle('');
    setCategory(null);
    setJoinToTournament(false);
    setContent('');
    setTags([]);
    setCurrentTag('');
    setFile(null);
    setIsVisual(false);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create New Post</Text>

        <TextInput
          style={styles.titleInput}
          placeholder='Title'
          value={title}
          onChangeText={setTitle}
          maxLength={128}
        />

        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Category:</Text>
          <DropDownPicker
            open={open}
            value={category}
            items={Categories.map((category) => ({
              label: category,
              value: category,
            }))}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={() => {}}
            placeholder='Select a category'
            style={styles.categoryDropdown}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Join to Tournament</Text>
          <CheckBox
            style={styles.checkbox}
            value={joinToTournament}
            onValueChange={setJoinToTournament}
          />
        </View>

        <Text style={[styles.label, { marginBottom: '2%' }]}>Content:</Text>

        <TextInput
          style={styles.content}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          maxLength={512}
        />

        <View style={styles.addTagContainer}>
          <TextInput
            style={styles.tagInput}
            placeholderTextColor={Colors.dark}
            placeholder='Add Tag'
            value={currentTag}
            onChangeText={setCurrentTag}
            maxLength={20}
            onSubmitEditing={handleAddTag}
          />
          <TouchableOpacity
            style={styles.addTagButton}
            title='Add Tag'
            onPress={handleAddTag}
          >
            <Text style={styles.addTagButtonText}>Add Tag</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.tagsContainer}
          data={tags}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tagItem}>
              <Text style={styles.tagItemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={styles.removeTag}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={pickFile}>
          <Text style={styles.buttonText}>Upload 3D Model</Text>
        </TouchableOpacity>
        {file && (
          <Text style={styles.fileName}>Selected File: {file.name}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={sendPost}>
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 20,
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  heading: {
    height: '10%',
    width: '100%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    padding: '3%',
    marginBottom: '5%',
  },
  categoryContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  label: {
    fontSize: 20,
    marginRight: '10',
  },
  categoryDropdown: {
    borderColor: Colors.grey,
    maxWidth: '74%',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  checkbox: {
    marginLeft: '3%',
  },
  content: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    padding: '1%',
    marginBottom: '5%',
    height: '15%',
  },
  addTagContainer: {
    display: 'flex',
    height: '5%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  tagInput: {
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 5,
    width: '40%',
    fontSize: 15,
    marginRight: '5%',
    color: Colors.dark,
  },
  addTagButton: {
    height: '100%',
    width: '30%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.light,
  },
  addTagButtonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagsContainer: {
    maxHeight: '10%',
    marginBottom: '5%',
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: '3%',
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 4,
  },
  tagItemText: {
    fontSize: 15,
  },
  removeTag: {
    color: Colors.red,
    marginLeft: 8,
    fontSize: 15,
  },
  button: {
    height: '8%',
    width: '100%',
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: '5%',
  },
  buttonText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: '600',
  },
  fileName: {
    fontSize: 15,
    height: '5%',
  },
});

export default CreatePost;
