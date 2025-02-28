import {useNavigation} from '@react-navigation/native';
import {useEffect, type ReactNode} from 'react';
import {useUser} from '@stores/auth';

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute = ({children}: IProtectedRoute) => {
  const navigation = useNavigation();
  const user = useUser();

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
