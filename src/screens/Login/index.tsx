import React, {useState, useCallback} from 'react';
import {
  GradientContainer,
  ButtonCredentials,
  TextButtonLogin,
  BoxCredentials,
  ContainerInput,
  InputPassword,
  BoxUserTitle,
  UserPassword,
  ButtonLogin,
  Description,
  InputEmail,
  Container,
  UserEmail,
  BoxTitle,
  BoxUsers,
  Title,
} from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetEmail = useCallback((emailValue: React.SetStateAction<string>) => setEmail(emailValue), []);
  const handleSetPassword = useCallback((passwordValue: React.SetStateAction<string>) => setPassword(passwordValue), []);

  return (
    <Container edges={['left', 'right', 'bottom']}>
      <BoxTitle>
        <Title>Login</Title>
        <Description>Selecione um nome de usuário e uma senha na lista abaixo ou clique no nome de usuário para preencher automaticamente o nome de usuário e senha.</Description>
      </BoxTitle>
      <BoxCredentials>
        <ContainerInput>
          <InputEmail placeholder="Nome Completo" placeholderTextColor="#3A4241" autoCapitalize="none" onChangeText={setEmail} value={email} />
        </ContainerInput>
        <ContainerInput>
          <InputPassword placeholder="Senha" placeholderTextColor="#3A4241" onChangeText={setPassword} value={password} secureTextEntry />
        </ContainerInput>
      </BoxCredentials>
      <ButtonLogin>
        <GradientContainer colors={['#6AC9FF', '#28CE9C']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
          <TextButtonLogin>Login</TextButtonLogin>
        </GradientContainer>
      </ButtonLogin>
      <BoxUsers>
        <BoxUserTitle>Nomes de usuário aceitos:</BoxUserTitle>
        <ButtonCredentials onPress={() => handleSetEmail('bob@example.com')} accessibilityLabel="Definir email como bob@example.com">
          <UserEmail>bob@example.com</UserEmail>
        </ButtonCredentials>
        <ButtonCredentials onPress={() => handleSetEmail('alice@example.com')} accessibilityLabel="Definir email como alice@example.com">
          <UserEmail>alice@example.com (locked out)</UserEmail>
        </ButtonCredentials>
        <BoxUserTitle>Senha para todos os usuários:</BoxUserTitle>
        <ButtonCredentials onPress={() => handleSetPassword('10203040')} accessibilityLabel="Definir senha como 10203040">
          <UserPassword>10203040</UserPassword>
        </ButtonCredentials>
      </BoxUsers>
    </Container>
  );
}
