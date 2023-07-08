import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Account" component={Profile} />
    {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
  </Stack.Navigator>
);

export default AccountNavigator;
