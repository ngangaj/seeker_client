import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";

import colors from "../config/colors";
import Button from "../components/Button";
import categoriesApi from "../api/categories";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Text from "../components/Text";
import Card from "../components/Card";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import miniMemberView from "./miniMemberView";
import Members from "./Members";

function ServiceEdit({ editVisible }) {
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const [membersVisible, setMemberVisible] = useState(false);

  const {
    data: services,
    error: errService,
    loading: serviceLoad,
    request: loadServices,
  } = useApi(categoriesApi.getCategories);
  const {
    data: members,
    error: errMembers,
    loading: memberLoad,
    request: loadMembers,
  } = useApi(usersApi.getMembers);

  useEffect(() => {
    loadServices();
    setTimeout(() => {
      ToastAndroid.showWithGravity(
        "Press and hold a service to remove it.",
        1000,
        ToastAndroid.CENTER
      );
    }, 1000);
  }, []);

  const deleteService = async (id) => {
    console.log(id);
    const result = await categoriesApi.deleteCategory(id);
    if (result.ok) {
      alert("Succesifully removed the service");
      loadServices();
    }
    alert("Error removing the the servace");
  };
  const handleApproval = async (user) => {
    const id = user._id;
    const result = await usersApi.updateUser(id, { approved: !user.approved });

    if (result.ok) {
      alert(`${user.approved ? "Disapproval" : "Approval"} Success.`);
      // loadUsers();
    } else {
      alert(
        `Unable to ${user.approved ? "Disapprove" : "Approve"} ${
          user.userName
        }. Try again later.`
      );
    }
  };

  return (
    <>
      <ActivityIndicator visible={serviceLoad || memberLoad || loading} />

      <View style={styles.screen}>
        {errMembers ||
          (errService && (
            <>
              <Text>Couldnt' reach Seeker Servers!</Text>
              <Button title="Retry" onPress={loadServices} />
            </>
          ))}
        <Button title="close" onPress={() => editVisible(false)} />

        <FlatList
          data={services}
          keyExtractor={(service) => service._id.toString()}
          ItemSeparatorComponen={<ListItemSeparator />}
          renderItem={({ item }) => (
            <>
              <View style={{ paddingBottom: 45 }}>
                <Card
                  title={item.category}
                  subTitle={item.tagline}
                  imageUrl={item.image}
                  onLongPress={() =>
                    Alert.alert(
                      "Delete!",
                      "Are you sure you want to remove this SERVICE?",
                      [
                        {
                          text: "Yes",
                          onPress: () => deleteService(item._id),
                        },
                        { text: "No" },
                      ]
                    )
                  }
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title="View members"
                  onPress={() => {
                    setService(item);
                    setMemberVisible(true);
                  }}
                  color="medium"
                />
              </View>
              <Modal visible={membersVisible} animationType="slide">
                <Members
                  admin={true}
                  handleApproval={handleApproval}
                  item={service}
                />
                <Button
                  title="close"
                  onPress={() => {
                    setMemberVisible(false);
                  }}
                />
              </Modal>
            </>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "50%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    height: 30,
    marginBottom: 65,
  },
  screen: {
    marginBottom: 40,
  },
  memberView: {
    marginLeft: 20,
    // backgroundColor: "red",
    // flex: 1,
  },
});
export default ServiceEdit;
