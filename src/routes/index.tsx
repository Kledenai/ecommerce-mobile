import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './auth.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
