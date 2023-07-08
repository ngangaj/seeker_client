import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "../screens/Register";
import About from "../screens/About";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const AboutNavigator = () => (
  <Stack.Navigator initialRouteName={"About"}>
    <Stack.Screen
      name="About"
      component={About}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default AboutNavigator;
