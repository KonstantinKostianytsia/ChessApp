import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/navigation/RootStack';
import {ThemeProvider, themeContext} from 'styles';
import {StoreProvider} from 'stores/rootStoreContext';
import rootStore from 'stores';

function App(): JSX.Element {
  return (
    <StoreProvider value={rootStore}>
      <ThemeProvider value={themeContext}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
