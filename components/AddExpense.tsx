import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { DatePickerInput } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import * as SQLite from 'expo-sqlite';

registerTranslation('en', en)

const AddExpense = ({toggleModal,setExpenseList}) => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [amount, setAmount] = useState('');

    const handleAddExpense = async() => {
        try {
         
        const db = await SQLite.openDatabaseAsync('expense-tracker.db');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    date TEXT NOT NULL, 
    amount REAL NOT NULL
);`);
        const result = await db.runAsync('INSERT INTO expenses (name, date, amount) VALUES (?, ?,?)', expenseName, expenseDate.getTime(),amount);
          
        setExpenseList((pre) => ([...pre,{name: expenseName, date: expenseDate.getTime(), amount}]))
        } catch (error) {
            console.log(error)       
        }// Handle adding expense logic here
        toggleModal();
        setExpenseName('')
        setExpenseDate(new Date())
        setAmount('')
    };

  return (
    <View>
        <Text style={styles.modalTitle}>Add Expense</Text>

        {/* Expense Name Field */}
        <TextInput
            placeholder="Expense Name"
            style={styles.input}
            value={expenseName}
            onChangeText={setExpenseName}
        />

        {/* Date Picker Field */}
        <View style={{marginTop: 25, marginBottom: 25
            
        }}>
        <DatePickerInput
            locale="en"
            value={expenseDate}
            onChange={(d) => {console.log(new Date(d).toLocaleString());setExpenseDate(d)}}
            inputMode="start"
            mode='outlined'
            animationType='fade'
            presentationStyle='pageSheet'
        />
        </View>
        {/* Amount Field */}
        <TextInput
            placeholder="Amount"
            style={styles.input}
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
        />

        {/* Category Select Field */}
        {/* <SelectList
            setSelected={(val) => setSelected(val)}
            data={[
                { key: '1', value: 'Mobiles', disabled: true },
                { key: '2', value: 'Appliances' },
                { key: '3', value: 'Cameras' },
                { key: '4', value: 'Computers', disabled: true },
                { key: '5', value: 'Vegetables' },
                { key: '6', value: 'Diary Products' },
                { key: '7', value: 'Drinks' },
            ]
            }
            save="value"
        /> */}

        {/* Add Button */}
        <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  )
}

export default AddExpense

const styles = StyleSheet.create({
   
    
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
})