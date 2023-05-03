import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/navigation/RootStack';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={{
        dark: isDarkMode,
        colors: {
          primary: 'red',
          background: 'white',
          card: 'white',
          text: 'black',
          border: 'yellow',
          notification: 'green',
        },
      }}>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
