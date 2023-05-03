import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainStackRoutes} from 'navigation/routes';
import WelcomeScreen from 'screens/Main/WelcomeScreen';

const Stack = createNativeStackNavigator();
export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainStackRoutes.WelcomeScreen}
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};
