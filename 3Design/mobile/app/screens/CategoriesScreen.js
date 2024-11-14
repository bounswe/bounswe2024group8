import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

export default function CategoriesScreen() {
  const categories = [
    'Characters',
    'Environments',
    'Props',
    'Vehicles',
    'Animations',
  ];

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Select a Category</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => {}}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 20,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',    // Center items horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesContainer: {
    width: '100%',
    alignItems: 'center', // Center buttons horizontally
  },
  categoryButton: {
    width: '80%', // Adjusted width for centered layout
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: Colors.dark, // Text color set to black
    textAlign: 'center',
    fontWeight: 'bold',
  },
});