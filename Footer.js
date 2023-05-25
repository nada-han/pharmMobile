import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contactez Nous</Text>
        <View style={styles.divider} />
        <View style={styles.body}>
          <Text style={styles.text}>
            <Text style={styles.label}>Adresse: </Text>1234 Rue des pharmaciens, Casablanca, Maroc{'\n'}
            <Text style={styles.label}>Téléphone: </Text>+1 234 567 890{'\n'}
            <Text style={styles.label}>Email: </Text>info@pharmalocations.com
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                // Handle Facebook link press
              }}
              style={styles.iconLink}
            >
              <Icon name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Handle Twitter link press
              }}
              style={styles.iconLink}
            >
              <Icon name="twitter" size={24} color="#00acee" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Handle Instagram link press
              }}
              style={styles.iconLink}
            >
              <Icon name="instagram" size={24} color="#c32aa3" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 PharmaLOCATIONS. Tous droits réservés.</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Politique de confidentialité</Text>
            <Text style={styles.footerSeparator}>|</Text>
            <Text style={styles.footerLink}>Conditions d'utilisation</Text>
            <Text style={styles.footerSeparator}>|</Text>
            <Text style={styles.footerLink}>Partenaires</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  body: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  iconLink: {
    marginHorizontal: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 5,
  },
  footerSeparator: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 2,
  },
});

export default Footer;
