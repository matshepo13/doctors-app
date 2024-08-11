import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppBar = ({ title }: { title: string }) => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{title}</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppBar;