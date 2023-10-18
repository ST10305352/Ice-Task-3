import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CounterScreen({ navigation }) {
 const [count, setCount] = React.useState(0);
 const [dispText, setDispText] = React.useState('');

 React.useEffect(() => {
    setDispText('Effect - The count is ' + count);
 }, [count]);

 React.useEffect(() => {
    AsyncStorage.setItem('count', count.toString());
 }, [count]);

 return (
    <View style={styles.container}>
      <Text style={styles.textDisp}>
        COUNTER + USEEFFECT
      </Text>
      <View style={styles.buttons}>
        <Button
          title='Increment'
          onPress={() => setCount(count + 1)}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title='Decrement'
          onPress={() => setCount(count - 1)}
        />
      </View>
      <Text style={styles.textDisp}>Count: {count}</Text>
      <Text style={styles.textDisp}>{dispText}</Text>
      <Button
        title="Go to Display"
        onPress={() => navigation.navigate('DisplayCounterScreen')}
      />
    </View>
    
 );
}

function DisplayCounterScreen({ navigation }) {
 const [savedCount, setSavedCount] = React.useState('');

 React.useEffect(() => {
    const getCount = async () => {
      const savedCount = await AsyncStorage.getItem('count');
      setSavedCount(savedCount);
    };

    getCount();
 }, []);

 return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.textDisp}>Saved Count: {savedCount}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
 );
}

const Stack = createNativeStackNavigator();

function MyStack() {
 return (
    <Stack.Navigator>
      <Stack.Screen name="Counter" component={CounterScreen} />
      <Stack.Screen name="DisplayCounterScreen" component={DisplayCounterScreen} />
    </Stack.Navigator>
 );
}

export default function App() {
 return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 textDisp: {
   fontSize: 20,
   margin: 10,
 },
 buttons: {
   margin: 5,
 },
});