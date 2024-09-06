import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Model = ({children,toggleModal,isModalVisible}) => {
    
  return (
    <Modal
    visible={isModalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={toggleModal}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>

            {React.cloneElement(children, { toggleModal })}
        </View>
    </View>

</Modal>
  )
}

export default Model

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        // maxHeight: 500,
        // top: 100

    },
    modalContent: {
        backgroundColor: 'white',
        width: 300,
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 1
    },

})