import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainStackRoutes} from 'navigation/routes';
import WelcomeScreen from 'screens/Main/WelcomeScreen';
import ChangeBoardColorScreen from 'screens/Main/ChangeBoardColorScreen';

export type MainStackParamList = {
  [MainStackRoutes.WelcomeScreen]: undefined;
  [MainStackRoutes.ChangeBoardColorScreen]: undefined;
};

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainStackRoutes.WelcomeScreen}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.ChangeBoardColorScreen}
        component={ChangeBoardColorScreen}
      />
    </Stack.Navigator>
  );
};
