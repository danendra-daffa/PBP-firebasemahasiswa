/**
 * PBP-firebasemahasiswa — modified by Danendra Daffa
 * This file header was added to personalize the project and remove template traces.
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { isUserLoggedIn } from './src/config/storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const isLoggedIn = isUserLoggedIn();
        setInitialRoute(isLoggedIn ? 'Home' : 'Login');
      } catch (error) {
        console.error('Error checking login status:', error);
        setInitialRoute('Login');
      } finally {
        setIsChecking(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isChecking || initialRoute === null) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#d6306d" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f9',
  },
});

export default App;
