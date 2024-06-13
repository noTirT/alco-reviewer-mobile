import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigation = useNavigation();

  async function handleSignup() {
    Keyboard.dismiss();
    await auth.signup(username, email, password);

    setUsername("");
    setEmail("");
    setPassword("");

    Toast.show("User account created", {
      duration: Toast.durations.SHORT,
    });

    navigation.navigate("Login" as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login" as never)}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
