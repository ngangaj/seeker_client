import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItemSeperator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Button from "../components/Button";
import ActivityIndicator from "../components/ActivityIndicator";
import Text from "../components/Text";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import ListItem from "../components/lists/ListItem";
import ContactMe from "../components/ContactMe";

function Approvals({ approvalVisible }) {
  //   const [users, setUsers] = useState([]);
  const [contactVisible, setContactVisible] = useState(false);
  const {
    data: users,
    setData,
    error,
    loading,
    request: loadUsers,
  } = useApi(usersApi.getUnapproved);

  useEffect(() => {
    loadUsers();
  }, []);
  const handleApproval = async (user) => {
    const id = user._id;
    const result = await usersApi.updateUser(id, { approved: !user.approved });
    console.log(result);

    if (result.ok) {
      alert(`${user.approved ? "Disapproval" : "Approval"} Success.`);
      return loadUsers();
    }
    alert(`Unable to approve ${user.userName}. Try again later`);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      {error && (
        <>
          <Text>Couldnt' reach Seeker Servers!</Text>
          <Button title="Retry" onPress={loadUsers} />
        </>
      )}
      <View style={styles.container}>
        <Text
          style={{ color: colors.medium, fontSize: 22, textAlign: "center" }}
        >
          General Approvals Screen.
        </Text>

        {users.length == 0 && (
          <Text style={{ height: 50 }}> No pending approvals</Text>
        )}

        <FlatList
          data={users}
          keyExtractor={(user) => user._id.toString()}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <>
              <ListItem
                title={item.userName}
                subTitle={item.categoryName}
                image={item.image}
              />
              <View style={styles.btnContainer}>
                <View>
                  <Button
                    title="Approve"
                    onPress={() => handleApproval(item)}
                  />
                </View>
                <View>
                  <Button
                    title="Contact"
                    onPress={() => setContactVisible(true)}
                    color="medium"
                  />
                </View>
              </View>
              {contactVisible && (
                <ContactMe
                  user={item}
                  setModalVisible={setContactVisible}
                  type="reverse"
                />
                // </View>
              )}
            </>
          )}
        />
      </View>
      <Button title="close" onPress={() => approvalVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    // backgroundColor: "red",
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "red",
    // marginBottom: 20,
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
});
export default Approvals;
