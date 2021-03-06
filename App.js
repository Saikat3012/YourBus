/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {

} from 'react-native';
import Navigator from './components/navigator/Navigator';
import { Provider } from 'react-native-paper';


const App = () => {


  return (
    <Provider>
      <Navigator />
    </Provider>

  );
};



export default App;
