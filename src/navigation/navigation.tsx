import LoginScreen from "../screens/Login";
import ProfileScreen from "../screens/Profile";
import SplashScreen from "../screens/Splash";
import { useAuth } from "../context/AuthContext";
import SignupScreen from "@/screens/Signup";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "@/components/IconButton";
import CreateReviewScreen from "@/screens/CreateReview";
import Explore from "@/screens/Explore";
import Home from "@/screens/Home";

export default function AppRoutes() {
  const auth = useAuth();

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (auth.loggedIn === null) {
    return (
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    );
  }

  if (auth.loading) {
    return <></>;
  }

  return (
    <>
      {auth.loggedIn === false ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Explore"
            component={Explore}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "globe" : "globe-outline"}
                  size={size}
                  color={color}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Create Review"
            component={CreateReviewScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"}
                  size={size}
                  color={color}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "person-circle" : "person-circle-outline"}
                  size={size}
                  color={color}
                />
              ),
              headerRight: () => (
                <IconButton
                  iconName="log-out-outline"
                  size={24}
                  color="black"
                  onPress={auth.logout}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}
