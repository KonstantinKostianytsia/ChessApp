import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainStackRoutes} from 'navigation/routes';
import WelcomeScreen from 'screens/Main/WelcomeScreen';
import ChangeBoardColorScreen from 'screens/Main/ChangeBoardColorScreen';
import ChessGameScreen from 'screens/Main/ChessGameScreen';
import CalibrationScreen from 'screens/Main/CalibrationScreen';

export type MainStackParamList = {
  [MainStackRoutes.WelcomeScreen]: undefined;
  [MainStackRoutes.ChangeBoardColorScreen]: undefined;
  [MainStackRoutes.ChessGameScreen]: undefined;
  [MainStackRoutes.CalibrationScreen]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

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
      <Stack.Screen
        name={MainStackRoutes.ChessGameScreen}
        component={ChessGameScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.CalibrationScreen}
        component={CalibrationScreen}
      />
    </Stack.Navigator>
  );
};
