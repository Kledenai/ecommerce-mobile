import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  background-color: #ffffff;
  align-items: left;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
`;

export const BoxTitle = styled.View`
  width: 100%;
  height: auto;
  background-color: transparent;
`;

export const Title = styled.Text`
  color: #132322;
  font-size: 24px;
  text-align: left;
  font-family: 'NotoSans_Bold';
  margin-top: 14px;
`;

export const Description = styled.Text`
  color: #7e847b;
  font-size: 16px;
  text-align: left;
  font-family: 'NotoSans_Regular';
  margin-top: 14px;
  color: #3a4241;
`;

export const BoxCredentials = styled.View`
  width: 100%;
  height: auto;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const ContainerInput = styled.View`
  height: 48px;
  width: 100%;
  border-bottom-color: #dedede;
  border-bottom-width: 1px;
  margin-top: 15px;
`;

export const InputEmail = styled.TextInput`
  width: 100%;
  height: 48px;
  font-family: 'NotoSans_Regular';
  font-size: 16px;
`;

export const InputPassword = styled.TextInput`
  width: 100%;
  height: 48px;
  font-family: 'NotoSans_Regular';
  font-size: 16px;
`;

export const ButtonLogin = styled.Pressable`
  width: 100%;
  height: 48px;
  border-radius: 48px;
  overflow: hidden;
`;

export const GradientContainer = styled(LinearGradient)`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButtonLogin = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'NotoSans_SemiBold';
`;

export const BoxUsers = styled.View`
  width: 100%;
  height: auto;
  background-color: #fbfbfb;
  border-width: 1px;
  border-color: #ededed;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  margin-top: 45px;
`;

export const BoxUserTitle = styled.Text`
  color: #132322;
  font-family: 'NotoSans_Bold';
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export const ButtonCredentials = styled.TouchableOpacity``;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: #132322;
  font-family: 'NotoSans_Regular';
`;

export const UserPassword = styled.Text`
  font-size: 14px;
  color: #132322;
  font-family: 'NotoSans_Regular';
`;
