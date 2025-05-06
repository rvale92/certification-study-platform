import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import NumbersGame from './src/screens/NumbersGame';
import AlphabetGame from './src/screens/AlphabetGame';
import {RootStackParamList} from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffb6c1', // Light pink color for Peppa Pig theme
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Peppa Pig Learning'}}
          />
          <Stack.Screen
            name="NumbersGame"
            component={NumbersGame}
            options={{title: 'Numbers with Peppa'}}
          />
          <Stack.Screen
            name="AlphabetGame"
            component={AlphabetGame}
            options={{title: 'Alphabet with Peppa'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 