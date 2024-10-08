import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MyReactNativeApp/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

  useEffect(() => {
    
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>
     
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenu')}>
        <Text style={styles.buttonText}>Add Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FilterMenu')}>
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>

      <Text style={styles.itemCount}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5DC', // Beige background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001f3f', // Navy blue
  },
  button: {
    backgroundColor: '#001f3f', // Navy blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: '600',
  },
  itemCount: {
    fontSize: 16,
    color: '#000000', // Black text
    marginBottom: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF', // White background for menu item
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light border for separation
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    width: '100%',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  description: {
    fontSize: 14,
    color: '#4A4A4A', // Grey text
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#001f3f', // Navy blue for price
  },
})