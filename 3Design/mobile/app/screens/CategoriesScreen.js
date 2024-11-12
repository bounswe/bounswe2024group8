import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
          <TouchableOpacity key={index} style={styles.categoryButton} disabled>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
  },
  categoriesContainer: {
    width: '80%',
  },
  categoryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: Colors.light,
    fontWeight: '500',
  },
});
