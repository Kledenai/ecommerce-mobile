import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@screens/Login';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerTitle: 'My Demo App',
      }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

export {AuthStack};
