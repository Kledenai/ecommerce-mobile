import React from 'react';
import {createNativeStackNavigator, type NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {AuthStack} from './stack.routes';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
