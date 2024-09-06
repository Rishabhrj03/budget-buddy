import { Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import WheelColorPicker from 'react-native-wheel-color-picker'; // Import the wheel color picker
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

import Model from './Model';
const AddCategory = ({ toggleModal: categoryModel, setCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isColorModalVisible, setIsColorModalVisible] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('home'); // Default icon from Ionicons

    const [search, setSearch] = useState('');
    const [iconColor, setIconColor] = useState('#000000'); // Default color (black)

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const toggleColorModal = () => {
        setIsColorModalVisible(!isColorModalVisible);
    };

    const handleSave = async () => {
        try {

            const db = await SQLite.openDatabaseAsync('expense-tracker.db');
            await db.execAsync(`CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                icon TEXT NOT NULL,
                category TEXT NOT NULL,
                color TEXT NOT NULL
            );`);
            const result = await db.runAsync('INSERT INTO categories (icon, category, color) VALUES (?, ?,?)', selectedIcon, categoryName, iconColor);
            setCategory((prev) => ([...prev, { color: iconColor, category: categoryName, icon: selectedIcon }]))
            categoryModel();
        } catch (error) {
            console.log(error)
        }
    }
    // Full list of Ionicons icons
    const ioniconsList = Object.keys(Ionicons.glyphMap); // Automatically fetches all Ionicons
    const filteredIcons = ioniconsList.filter((icon) => icon.includes(search.toLowerCase()));
    const renderIcon = ({ item }) => {
        const IconComponent = Ionicons;
        console.log('item', item.name)
        return (
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => { setSelectedIcon(item); toggleModal() }}
            >
                <IconComponent name={item} size={32} color={selectedIcon === item ? 'tomato' : 'black'} />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Text style={styles.modalText}>Add New Category</Text>

            {/* Category Name Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Category Name"
                value={categoryName}
                onChangeText={setCategoryName}
            />


            {/* Icon List */}
            <SafeAreaView >
                <Model toggleModal={toggleModal} isModalVisible={isModalVisible}>
                    <View style={{ maxHeight: 500 }}>
                        <Text style={styles.modalText}>Select Category Icon</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Search Icons"
                            value={search}
                            onChangeText={setSearch}
                        />
                        <FlatList
                            data={filteredIcons}
                            renderItem={renderIcon}
                            keyExtractor={(item) => item}
                            numColumns={4}
                            contentContainerStyle={styles.iconList}
                        />

                    </View>

                </Model>
            </SafeAreaView>
            {/* Selected Icon Display */}
            <Text style={styles.selectedIconText}>Selected Icon:</Text>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleModal}
            >
                <View style={{ backgroundColor: iconColor }}>
                    <Ionicons name={selectedIcon} size={48} color={'white'} />
                </View>
            </TouchableOpacity>


            {/* Wheel Color Picker */}
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', ...styles.iconText }}>
                <Text style={{
                    fontSize: 18,
                }}>Pick Icon Color:</Text>
                <Ionicons name='color-palette' size={28} color='green' onPress={toggleColorModal} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter Category Name"
                value={iconColor}
                onChangeText={setIconColor}
            />

            <Model toggleModal={toggleColorModal} isModalVisible={isColorModalVisible}>
                <View style={{ backgroundColor: 'white', height: 300, alignItems: 'center' }}>
                    <WheelColorPicker
                        color={iconColor}
                        onColorChangeComplete={(color) => { console.log('iconColor', iconColor); setIconColor(color) }}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            </Model>



            {/* Save and Cancel Buttons */}
            <View style={styles.buttonContainer}>
                {/* <Button title="Cancel" onPress={() => setModalVisible(false)} /> */}
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    )
}

export default AddCategory

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 250,
        marginBottom: 15,
    },
    iconList: {
        alignItems: 'center',
        // maxHeight:100
    },
    iconContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    selectedIconText: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 15,
    },
    iconText: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
})