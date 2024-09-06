import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModelWithBottomIcon from '../components/ModelWithBottomIcon'
import AddCategory from '../components/AddCategory';
import { useSQLiteContext } from 'expo-sqlite';
const { height } = Dimensions.get('window');
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

const Categories = () => {
    const [categoryList,setCategory] = useState([]);
    
        useEffect(() => {
          async function setup() {
            const db = await SQLite.openDatabaseAsync('expense-tracker.db');

            const result = await db.getAllAsync('SELECT * FROM categories');
            console.log('result',result)
            setCategory(result);
          }
          setup();
        }, []);
  return (
    <View style={styles.relative}>
        <FlatList 
        data={categoryList}
        renderItem={({item}) => (
            <View key={item.category} style={{ display: 'flex', flexDirection: 'row', margin: 10, alignItems: 'center'}}>
              <View style={{backgroundColor:item.color, padding: 10, borderRadius: 10, marginRight: 10}}><Ionicons name={item.icon} size={32} color='white'/></View>
              <Text style={{fontWeight: 'bold', fontSize: 20, letterSpacing:'0.2', color: '#ddddd'}}>{item.category}</Text>
            </View>)}
        />
      
      <ModelWithBottomIcon>
        <AddCategory setCategory={setCategory}/>
      </ModelWithBottomIcon>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({    
  relative: {
    position: 'relative',
    height: height - 150,
  },

})