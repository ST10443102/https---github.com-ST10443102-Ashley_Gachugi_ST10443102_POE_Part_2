// screens/FilterMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MyReactNativeApp/types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

const mockMenuItems = [
  { dishName: 'Spaghetti', description: 'Classic pasta', course: 'Main Course', price: 12 },
  { dishName: 'Caesar Salad', description: 'Fresh and crispy', course: 'Starter', price: 8 },
  { dishName: 'Chocolate Cake', description: 'Decadent dessert', course: 'Dessert', price: 10 },
];

export default function FilterMenuScreen({ navigation }: FilterMenuScreenProps) {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<{ dishName: string, description: string, price: string }>({
    dishName: '',
    description: '',
    price: '',
  });

  const filterByCourse = (course: string) => {
    if (course === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.course === course));
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    const itemToEdit = filteredItems[index];
    setEditedItem({
      dishName: itemToEdit.dishName,
      description: itemToEdit.description,
      price: itemToEdit.price.toString(),
    });
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...filteredItems];
      updatedItems[editingIndex] = {
        ...updatedItems[editingIndex],
        dishName: editedItem.dishName,
        description: editedItem.description,
        price: parseFloat(editedItem.price),
      };
      setFilteredItems(updatedItems);
      setMenuItems(updatedItems);
      setEditingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.filterButtons}>
        <Button title="All" onPress={() => filterByCourse('All')} color="#001f3f" />
        <Button title="Starter" onPress={() => filterByCourse('Starter')} color="#001f3f" />
        <Button title="Main Course" onPress={() => filterByCourse('Main Course')} color="#001f3f" />
        <Button title="Dessert" onPress={() => filterByCourse('Dessert')} color="#001f3f" />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            {editingIndex === index ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={editedItem.dishName}
                  onChangeText={(text) => setEditedItem({ ...editedItem, dishName: text })}
                  placeholder="Dish Name"
                />
                <TextInput
                  style={styles.input}
                  value={editedItem.description}
                  onChangeText={(text) => setEditedItem({ ...editedItem, description: text })}
                  placeholder="Description"
                />
                <TextInput
                  style={styles.input}
                  value={editedItem.price}
                  onChangeText={(text) => setEditedItem({ ...editedItem, price: text })}
                  keyboardType="numeric"
                  placeholder="Price"
                />
                <Button title="Save" onPress={saveEdit} color="#001f3f" />
              </View>
            ) : (
              <View>
                <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
                <Text>{item.description}</Text>
                <Text>${item.price.toFixed(2)}</Text>
                <Button title="Edit" onPress={() => startEditing(index)} color="#001f3f" />
              </View>
            )}
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
    backgroundColor: '#e6e2d3',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001f3f', // Navy blue title
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontWeight: 'bold',
    color: '#000', // Black text
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
});
