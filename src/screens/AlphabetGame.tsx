import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AlphabetGame'>;
};

const AlphabetGame: React.FC<Props> = ({ navigation }) => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [bounceAnim] = useState(new Animated.Value(1));

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const generateOptions = (correctLetter: string) => {
    const otherLetters = alphabet.filter(letter => letter !== correctLetter);
    const randomLetters = otherLetters
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [...randomLetters, correctLetter];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(newLetter);
    setOptions(generateOptions(newLetter));
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleAnswer = (selectedLetter: string) => {
    if (selectedLetter === currentLetter) {
      setScore(prev => prev + 1);
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    startNewRound();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Find the Letter</Text>
        
        <Animated.View style={[styles.letterContainer, { transform: [{ scale: bounceAnim }] }]}>
          <Text style={styles.letter}>{currentLetter}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          {options.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(letter)}
            >
              <Text style={styles.optionText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  letterContainer: {
    width: 150,
    height: 150,
    backgroundColor: '#FFB6C1',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  letter: {
    fontSize: 72,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  optionButton: {
    width: 80,
    height: 80,
    backgroundColor: '#FFB6C1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 36,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default AlphabetGame; 