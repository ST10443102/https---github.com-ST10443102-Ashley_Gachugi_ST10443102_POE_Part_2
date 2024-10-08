// screens/AddMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    navigation.navigate('Home', { newItem });
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC', // Beige background
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
    borderColor: '#001f3f', // Navy blue border
    color: '#000000', // Black text for inputs
    backgroundColor: '#FFFFFF', // White background for inputs
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#001f3f', // Navy blue border for picker
    color: '#000000', // Black text for picker
    backgroundColor: '#FFFFFF', // White background for picker
    marginBottom: 12,
  },
});
