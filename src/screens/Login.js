import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import * as Yup from "yup";

import FormField from "../components/forms/FormField";
import Screen from "../components/Screen";
import Form from "../components/forms/Form";
import SubmitButton from "../components/forms/SubmitButton";
import AppText from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/forms/ErrorMessage";
import authApi from "../api/auth";

const Schema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const { logIn } = useAuth();
  const loginApi = useApi(authApi.login);

  const handleSubmit = async ({ email, password }) => {
    Keyboard.dismiss();

    const result = await loginApi.request(email, password);

    if (!result.ok) {
      if (result.data) setLoginFailed(result.data);
      else setLoginFailed("Unexpected error occured!");
      return;
    }

    logIn(result.data);
    navigation.navigate("Services");
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />

      <Screen>
        <View style={styles.container}>
          <AppText style={styles.text}>Login.</AppText>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={Schema}
          >
            <ErrorMessage error={loginFailed} visible={loginFailed} />
            <FormField
              name="email"
              placeholder="Email"
              icon="email"
              autCorrect={false}
              autoCompleate={false}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <FormField
              name="password"
              placeholder="Password"
              secureTextEntry
              icon="lock"
            />
            <SubmitButton title="Login" />
            <AppText style={styles.tag}>
              Not a member .
              <TouchableNativeFeedback
                onPress={() => navigation.navigate(routes.REGISTER)}
              >
                <AppText style={styles.subtext}>Register ? </AppText>
              </TouchableNativeFeedback>
            </AppText>
          </Form>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 100,
    top: 70,
    marginBottom: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "300",
    textDecorationLine: "underline",
    textAlign: "center",
    marginBottom: 50,
  },
  tag: {
    marginTop: 5,
    marginRight: 5,
  },
  subtext: {
    color: colors.secondary,
  },
});
export default Login;
