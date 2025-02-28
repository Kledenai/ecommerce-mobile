import {DrawerNavigationProp} from '@react-navigation/drawer';

type RootDrawerParamList = {
  Login: undefined;
};

export interface ILogin {
  navigation: DrawerNavigationProp<RootDrawerParamList, 'Login'>;
}
