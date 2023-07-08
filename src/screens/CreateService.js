import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
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
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import UploadScreen from "./UploadScreen";
import Text from "../components/Text";
import { ScrollView } from "react-native";
import colors from "../config/colors";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ErrorMessage from "../components/forms/ErrorMessage";

const validationSchema = Yup.object().shape({
  image: Yup.string()
    .required("Please select an appropriate image for the service.")
    .nullable()
    .label("image"),
  label: Yup.string().required().min(3).max(20).label("Service"),
  tagline: Yup.string().required().min(3).max(50).label("Tag line"),
});

// {
//     backgroundColor: "#778ca3",
//     icon: "application",
//     label: "Other",
//     value: 9,
//   },

function CreateService({ setCreateVisible }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorForm, setErrorForm] = useState("");

  const handleSubmit = async (service, { resetForm }) => {
    setErrorForm("");
    setProgress(0);
    setUploadVisible(true);
    const result = await categoriesApi.addCategory(service, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      if (result.data) setErrorForm(result.data);
      return alert("Couldn't save the Service");
    }
    resetForm();
    setCreateVisible(false);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            label: "",
            tagline: "",
            image: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: colors.medium,
              borderBottomWidth: 1,
            }}
          >
            Register a Sevice.
          </Text>
          <ErrorMessage error={errorForm} visible={errorForm} />
          <FormImagePicker name="image" />

          <FormField
            autoCorrect={true}
            icon="plus"
            name="label"
            placeholder="Label of the Service..."
          />
          <FormField
            autoCorrect={true}
            icon="plus"
            name="tagline"
            placeholder="tagline of the Service..."
          />

          <SubmitButton title="Register" />
        </Form>
      </ScrollView>
      <View
        style={{ position: "absolute", bottom: "25%", alignSelf: "center" }}
      >
        <Icon
          name="close"
          size={50}
          onPress={() => setCreateVisible(false)}
          backgroundColor={colors.medium}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CreateService;

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// import colors from "../config/colors";

// function CreateService({ createVisible }) {
//   return (
//     <>
//       <View style={styles.container}>
//         <Text
//           style={{
//             // textAlign: "center",
//             fontSize: 20,
//             color: colors.medium,
//             borderBottomWidth: 1,
//             width: "60%",
//             alignSelf: "center",
//           }}
//         >
//           Service Registration.
//         </Text>

//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // position: "absolute",
//     // backgroundColor: colors.white,
//     // height: "75%",
//     // bottom: 0,
//     // flexDirection: "row",
//     // justifyContent: "space-around",
//     // width: "98%",
//     // flexWrap: "wrap",
//     // borderWidth: 1,
//     // borderBottomWidth: 0,
//     // borderTopEndRadius: 15,
//     // borderTopStartRadius: 15,
//     // alignSelf: "center",
//     // marginTop: 20,
//   },
// });
// export default CreateService;
