// screens/AddMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MyReactNativeApp/types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

  const handleSubmit = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newItem = { dishName, description, course, price: parseFloat(price) };
    setMenuItems([...menuItems, newItem]); // Add new item to the menu
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse(courses[0]);
  };

  const removeItem = (index: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => setMenuItems(menuItems.filter((_, i) => i !== index)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDishName}
        value={dishName}
        placeholder="Enter dish name"
        placeholderTextColor="#555555"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter dish description"
        placeholderTextColor="#555555"
      />

      <Text style={styles.label}>Course:</Text>
      <Picker
        selectedValue={course}
        onValueChange={setCourse}
        style={styles.picker}
      >
        {courses.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
        placeholder="Enter price"
        placeholderTextColor="#555555"
      />

      <Button title="Add Dish" onPress={handleSubmit} color="#001f3f" />

      <Text style={styles.listHeader}>Menu Items:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              {item.dishName} - {item.course} - R{item.price.toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6e2d3',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#000000', // Black text for labels
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: '#e06377', 
    color: '#000000', // Black text for inputs
    backgroundColor: '#FFFFFF', // White background for inputs
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#e06377', 
    color: '#000000', // Black text for picker
    backgroundColor: '#FFFFFF', // White background for picker
    marginBottom: 12,
  },
  listHeader: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#001f3f',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listText: {
    fontSize: 16,
    color: '#000000',
  },
  removeButton: {
    backgroundColor: '#5b9aa0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeButtonText: {
    color: '#FFFFFF', // White text for remove button
    fontWeight: 'bold',
  },
});