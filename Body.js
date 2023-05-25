import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import markerIcon from './marker-icon.png';
import { Picker } from '@react-native-picker/picker';

function MapTouchable(props) {
  const { children, onPress } = props;

  return (
    <TouchableOpacity style={styles.mapTouchable} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

function Body() {
  const [mapZoom] = useState(10);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [isGardeSelected, setIsGardeSelected] = useState(false);
  const [selectedGarde, setSelectedGarde] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacyLocations, setPharmacyLocations] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://pharmacy-liard.vercel.app/api/cities');
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCities();
  }, []);

  const gardeOptions = [
    { value: 'jour', label: 'Garde de jour' },
    { value: 'nuit', label: 'Garde de nuit' },
  ];

  const handleGardeChange = (value) => {
    setSelectedGarde(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedZone(null);
    setIsGardeSelected(false);
  };

  useEffect(() => {
    if (selectedCity) {
      const fetchZones = async () => {
        try {
          const res = await fetch(
            `https://pharmacy-liard.vercel.app/api/zones/city/${selectedCity}`
          );
          const data = await res.json();
          setZones(data);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchZones();
    } else {
      setZones([]);
    }
  }, [selectedCity]);

  const handleZoneChange = (value) => {
    setSelectedZone(value);
    setIsGardeSelected(false);
  };

  const handleGardeSelect = () => {
    setIsGardeSelected(!isGardeSelected);
  };

  const handleSearch = async () => {
    if (selectedCity && selectedZone && selectedGarde) {
      try {
        const res = await fetch(
          `https://pharmacy-liard.vercel.app/api/pharmacies/${selectedGarde}/${selectedZone}/${selectedCity}`
        );
        const data = await res.json();
        setPharmacies(data);
        const locations = data.map((pharmacy) => ({
          lat: pharmacy.latitude,
          lon: pharmacy.longitude,
          name: pharmacy.name,
          address: pharmacy.address,
        }));
        setPharmacyLocations(locations);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text>Ville :</Text>
            <Picker
              style={styles.select}
              selectedValue={selectedCity}
              onValueChange={handleCityChange}
            >
              <Picker.Item label="Sélectionnez une ville" value={null} />
              {cities.map((city) => (
                <Picker.Item key={city._id} label={city.name} value={city._id} />
              ))}
            </Picker>
          </View>
          <View style={styles.menuItem}>
            <Text>Zone :</Text>
            {selectedCity ? (
              <Picker
                style={styles.select}
                selectedValue={selectedZone}
                onValueChange={handleZoneChange}
              >
                <Picker.Item label="Sélectionnez une zone" value={null} />
                {zones.map((zone) => (
                  <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
                ))}
              </Picker>
            ) : (
              <Picker style={styles.select} enabled={false}>
                <Picker.Item label="Sélectionnez une ville d'abord" value={null} />
              </Picker>
            )}
          </View>
          <View style={styles.menuItem}>
            <Text>Type de garde :</Text>
            {selectedCity && selectedZone ? (
              <Picker
                style={styles.select}
                selectedValue={selectedGarde}
                onValueChange={handleGardeChange}
              >
                <Picker.Item label="Sélectionnez un type de garde" value={null} />
                {gardeOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            ) : (
              <Picker style={styles.select} enabled={false}>
                <Picker.Item label="Sélectionnez une ville et une zone d'abord" value={null} />
              </Picker>
            )}
          </View>
        </View>

        <Button title="Rechercher" onPress={handleSearch} />

        <MapTouchable onPress={() => {}}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              zoomEnabled={true} // Activer le zoom de la carte
              zoomControlEnabled={true} // Afficher les contrôles de zoom
            >
              {pharmacyLocations.map((pharmacy, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: pharmacy.lat, longitude: pharmacy.lon }}
                  image={markerIcon}
                >
                  <Callout>
                    <View>
                      <Text>{pharmacy.name}</Text>
                      <Text>{pharmacy.address}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
        </MapTouchable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  menuContainer: {
    width: '100%',
    marginBottom: 60,
  },
  menuItem: {
    marginBottom: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  select: {
    width: '100%',
    height: 40,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: 300,
    justifyContent: 'center', // Centrer le contenu horizontalement
    alignItems: 'center', // Centrer le contenu verticalement
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapTouchable: {
    flex: 1,
  },
});

export default Body;