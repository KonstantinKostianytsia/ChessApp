import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/navigation/RootStack';
import {ThemeProvider, themeContext} from 'styles';

function App(): JSX.Element {
  return (
    <ThemeProvider value={themeContext}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
