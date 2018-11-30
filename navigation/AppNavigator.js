import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import AuthAmplifyScreen from '../screens/AuthAmplifyScreen';

import MainTabNavigator from './MainTabNavigator';

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: {screen: AuthAmplifyScreen}, 
  Main: MainTabNavigator,
});

export default AppNavigator;