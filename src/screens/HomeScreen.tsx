import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from '../assets/peppa-background.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const {width} = Dimensions.get('window');

interface GameButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}

const GameButton: React.FC<GameButtonProps> = ({title, onPress, color}) => (
  <TouchableOpacity
    style={[styles.gameButton, {backgroundColor: color}]}
    onPress={onPress}>
    <Text style={styles.gameButtonText}>{title}</Text>
  </TouchableOpacity>
);

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const games = [
    {
      title: 'Numbers with Peppa',
      color: '#FF9999',
      screen: 'NumbersGame',
    },
    {
      title: 'Colors with George',
      color: '#99FF99',
      screen: 'ColorsGame',
    },
    {
      title: 'Animals with Daddy Pig',
      color: '#9999FF',
      screen: 'AnimalsGame',
    },
    {
      title: 'Shapes with Mummy Pig',
      color: '#FFFF99',
      screen: 'ShapesGame',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Background style={styles.background} />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Peppa's Learning Adventure!</Text>
        <View style={styles.gamesContainer}>
          {games.map((game, index) => (
            <GameButton
              key={index}
              title={game.title}
              color={game.color}
              onPress={() => navigation.navigate(game.screen)}
            />
          ))}
          <TouchableOpacity 
            style={styles.gameButton}
            onPress={() => navigation.navigate('AlphabetGame')}
          >
            <Text style={styles.gameButtonText}>Alphabet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginVertical: 20,
  },
  gamesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gameButton: {
    width: width * 0.8,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gameButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default HomeScreen; 