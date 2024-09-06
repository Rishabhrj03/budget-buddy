import React, { useEffect, useState } from 'react'
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import ModelWithBottomIcon from '../components/ModelWithBottomIcon';
import AddExpense from '../components/AddExpense';
const { height } = Dimensions.get('window');

const Home = () => {
  return (
    <SQLiteProvider databaseName="expense-tracker.db">
      <Content />
    </SQLiteProvider>
  )
}

interface ExpenseList {
  name: string;
  date: string;
  amount: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [expenseList, setExpenseList] = useState<ExpenseList[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<ExpenseList>('SELECT * FROM expenses');
      setExpenseList(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.relative}>
      <View style={styles.totalExpense}>
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Rs: {expenseList.reduce((sum, element) => sum += parseFloat(element.amount), 0)} </Text>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>Total Expense </Text>
      </View>
      <FlatList
        data={expenseList}
        renderItem={({ item }) => <View style={styles.item}>
          <View key={item.name + item.date}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={styles.transactionDate}>{moment(item.date * 1).format('MM-DD-YYYY')}</Text>
          </View>
          <Text style={[styles.inline, true ? styles.failure : styles.success]}>Rs.{item.amount}</Text></View>}
      />
      <ModelWithBottomIcon>
        <AddExpense setExpenseList={setExpenseList} />
      </ModelWithBottomIcon>
    </View>
  );
}

const styles = StyleSheet.create({

  relative: {
    position: 'relative',
    height: height - 150,
  },

  transaction: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  transactionDate: {
    fontWeight: 'bold',
    color: 'gray'
  },
  inline: {
    fontWeight: 'bold'
  },
  failure: {
    color: 'tomato'
  },
  success: {
    color: 'green'
  },

  item: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  totalExpense: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#1e90ff',
    marginHorizontal: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  }
})
export default Home