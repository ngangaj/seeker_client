import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableNativeFeedback } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import usersApi from "../api/users";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import { ScrollView } from "react-native";
import colors from "../config/colors";
import AppText from "../components/Text";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().min(3).label("User Name"),
  email: Yup.string().trim().required().email().label("Email"),
  phone: Yup.string().required().length(10).label("Phone"),
  workPlace: Yup.string().required().trim().min(3).max(20).label("Work Place"),
  city: Yup.string().required().trim().min(3).max(20).label("City"),
  location: Yup.string().required().trim().min(3).max(20).label("Location"),
  password: Yup.string().required().trim().min(3).max(20).label("Password"),
  jobCategory: Yup.object().required().nullable().label("Category"),
  image: Yup.string()
    .required("Please select an image of yours.")
    .nullable()
    .label("image"),
});

// {
//     backgroundColor: "#778ca3",
//     icon: "application",
//     label: "Other",
//     value: 9,
//   },

function Register({ navigation }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {
    data: categories,
    error,
    request: loadCategories,
  } = useApi(categoriesApi.getCategories);
  const { logIn } = useAuth();

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (userInfo, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await usersApi.register(userInfo, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      console.log(result);
      setUploadVisible(false);
      return alert("Couldn't save the user");
    }
    console.log(result.headers["x-auth-token"]);

    resetForm();
    logIn(result.data);

    navigation.navigate("Services");
  };

  return (
    <Screen style={styles.container}>
      <ScrollView style={{ marginBottom: 40 }}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            userName: "",
            email: "",
            phone: "",
            password: "",
            city: "",
            location: "",
            workPlace: "",
            jobCategory: null,
            image: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="image" />
          <Picker
            items={categories}
            name="jobCategory"
            // numberOfColumns={3}
            // PickerItemComponent={CategoryPickerItem}
            placeholder="Service"
            width="100%"
            icon="plus"
          />
          <FormField
            autoCorrect={false}
            icon="account"
            name="userName"
            placeholder="Name"
            width="100%"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            width="100%"
          />

          <FormField
            keyboardType="numeric"
            maxLength={10}
            icon="phone"
            name="phone"
            placeholder="07xx xxx xxx"
            width="100%"
          />
          <FormField
            autoCorrect={false}
            icon="plus"
            name="city"
            autoCapitalize="words"
            placeholder="City"
            width={"100%"}
          />
          <FormField
            autoCorrect={false}
            icon="plus"
            autoCapitalize="words"
            name="location"
            placeholder="Location"
            width="100%"
          />

          <FormField
            // maxLength={}
            name="workPlace"
            numberOfLines={2}
            icon="plus"
            multiline
            placeholder="WorkPlace"
            width="100%"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            width="100%"
          />
          <SubmitButton title="Register" />
          <AppText style={styles.tag}>
            {`Registered ?        `}
            <TouchableNativeFeedback
              onPress={() => navigation.navigate(routes.LOGIN)}
            >
              <AppText style={styles.subtext}>Log in. </AppText>
            </TouchableNativeFeedback>
          </AppText>
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  tag: {
    marginTop: 5,
    marginRight: 5,
  },
  subtext: {
    color: colors.secondary,
    marginBottom: 10,
  },
});
export default Register;
