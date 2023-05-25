import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
        <Body />
        
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});