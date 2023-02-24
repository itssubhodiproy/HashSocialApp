import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>Open up App.js to start working on your app!</Text>
      <Text>This is somthing in which I'm working on!</Text>
      <Text>React Native is great !!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: 'red',
    fontSize: 14,
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
  },
});
