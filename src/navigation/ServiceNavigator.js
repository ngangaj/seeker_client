import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Members from "../screens/Members";
import ProviderProfile from "../screens/ProviderProfile";

const Stack = createStackNavigator();

const ServiceNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Services" component={Welcome} />
    <Stack.Screen
      name="Members"
      component={Members}
      options={{ headerShown: true, headerTitle: "Back to services." }}
    />
    <Stack.Screen name="ViewProvider" component={ProviderProfile} />
  </Stack.Navigator>
);

export default ServiceNavigator;
