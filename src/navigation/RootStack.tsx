import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackRoutes} from './routes';
import {MainStackNavigator} from './MainStack/MainStackNavigator';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name={RootStackRoutes.Main}
        component={MainStackNavigator}
      />
    </Stack.Navigator>
  );
};
