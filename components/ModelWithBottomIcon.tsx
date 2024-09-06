import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For Plus and Close Icons
import { Provider as PaperProvider } from 'react-native-paper';
import AddExpense from './AddExpense';
import { Ionicons } from '@expo/vector-icons';
import Model from './Model';
const { height } = Dimensions.get('window');

const ModelWithBottomIcon = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
  return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Floating Plus Button */}
                <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
                    <Icon name="add" size={30} color="white" />
                </TouchableOpacity>
                <Model isModalVisible={isModalVisible} toggleModal={toggleModal}>{children}</Model>
               
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',

    },
    floatingButton: {
        position: 'absolute',
        backgroundColor: '#007AFF',
        borderRadius: 30,
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    datePickerContainer: {
        position: 'relative',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        borderRadius: 5,
        padding: 10,
    },
    dropdownText: {
        fontSize: 16,
    },
    });

export default ModelWithBottomIcon;
