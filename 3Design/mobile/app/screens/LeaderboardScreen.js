import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';

export default function LeaderboardScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch leaderboard data for the category
    axios
      .get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/leaderboard/${categoryId}`)
      .then((response) => {
        setLeaderboardData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load leaderboard data.');
        setLoading(false);
      });
  }, [categoryId]);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.user}</Text>
      <Text style={styles.cell}>{item.score}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={Colors.dark} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Leaderboard for {categoryName} Category
        </Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Ranking</Text>
        <Text style={styles.headerCell}>User</Text>
        <Text style={styles.headerCell}>Score</Text>
      </View>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    backgroundColor: Colors.lightGray,
  },
  headerCell: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    color: Colors.dark,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});