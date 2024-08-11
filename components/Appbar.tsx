import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppBar = ({ title }: { title: string }) => {
  return (
    <View style={styles.appBarContainer}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>{title}</Text>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    width: '96%',
    alignSelf: 'center',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    borderRadius: 10,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: 'auto',
  },
});

export default AppBar;