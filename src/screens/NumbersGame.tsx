import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PeppaSmall from '../assets/peppa-small.svg';

interface NumberGameProps {
  navigation: any;
}

const NumbersGame: React.FC<NumberGameProps> = ({navigation}) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [animation] = useState(new Animated.Value(0));

  const generateOptions = (correct: number) => {
    let nums = [correct];
    while (nums.length < 3) {
      const num = Math.floor(Math.random() * 10) + 1;
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    return nums.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setOptions(generateOptions(currentNumber));
  }, [currentNumber]);

  const handleAnswer = (selected: number) => {
    if (selected === currentNumber) {
      // Correct answer animation
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setScore(score + 1);
      if (currentNumber < 10) {
        setCurrentNumber(prev => prev + 1);
      } else {
        // Game completed
        alert(`Well done! You scored ${score + 1} out of 10!`);
        navigation.goBack();
      }
    } else {
      // Wrong answer feedback
      alert('Oops! Try again!');
    }
  };

  const animatedStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}/10</Text>
      </View>
      <View style={styles.gameArea}>
        <Text style={styles.question}>Count with Peppa!</Text>
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          {[...Array(currentNumber)].map((_, index) => (
            <PeppaSmall key={index} width={50} height={50} style={styles.peppaImage} />
          ))}
        </Animated.View>
        <Text style={styles.instruction}>How many Peppas do you see?</Text>
        <View style={styles.optionsContainer}>
          {options.map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(number)}>
              <Text style={styles.optionText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    padding: 15,
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
  },
  peppaImage: {
    margin: 5,
  },
  instruction: {
    fontSize: 22,
    color: '#666',
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#FFB6C1',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    minWidth: 80,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NumbersGame; 