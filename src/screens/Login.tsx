import { useRef, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { styles } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  const navigation = useNavigation();

  const passwordRef = useRef(null);

  async function handleLogin() {
    Keyboard.dismiss();
    await auth.login(loginName, password);

    setLoginName('');
    setPassword('');
  }
  function focusPasswordInput() {
    if (passwordRef.current) {
      //@ts-ignore
      passwordRef.current.focus();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setLoginName(text)}
            value={loginName}
            autoCapitalize="none"
            onSubmitEditing={focusPasswordInput}
          />
          <TextInput
            style={styles.input}
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            onSubmitEditing={handleLogin}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.buttonText}>Signup instead</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
