import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const AutoExpandingTextInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputHeight, setInputHeight] = useState(40); 

  const handleChangeText = (text) => {
    if(text.length >= 256){
      return;
    }
    setInputValue(text);
    const lineCount = Math.ceil((text.length + 1) / 40); 
    setInputHeight(Math.max(40, lineCount * 40)); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={inputValue}
        onChangeText={handleChangeText}
        style={[styles.input, { height: inputHeight }]}
        placeholder="Type something..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default AutoExpandingTextInput;
