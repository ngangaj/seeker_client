import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import ContactMe from "../components/ContactMe";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import Approvals from "./Approvals";
import CreateService from "./CreateService";
import ServiceEdit from "./ServiceEdit";
import useAuth from "../auth/useAuth";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

function Profile() {
  const [createVisible, setCreateVisible] = useState(false);
  const [approvalVisible, setApprovalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [profileEditVisible, setProfileEditVisible] = useState(false);
  const [stars, setStars] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  // const { data, error, loading, request: loadUser } = useApi(userApi.getUser);
  // const user = data ? data[0] : {};
  // const [user, setUser] = useState()

  const { user: appUser } = useAuth();

  useEffect(() => {
    loadUser(appUser.userId);
    starsView();
  }, []);

  const loadUser = async (id) => {
    setError(false);
    setloading(true);
    const response = await userApi.getUser(id);
    setloading(false);

    if (!response.ok) {
      setError(true);
    }
    setUser(response.data);
  };

  const starsView = () => {
    let count = [];
    let counter = 0;
    for (let x = 1; x <= user ? user.rating : 0; x++) {
      count.push(x);
    }
    setStars(count);
  };

  console.log(user);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        {error && (
          <>
            <View
              style={{
                marginTop: "50%",
                height: 50,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  height: 50,
                }}
              >
                Couldnt' reach Seeker Servers!
              </Text>
            </View>
            <Button title="Retry" onPress={() => loadUser(appUser._id)} />
          </>
        )}
        {!error && (
          <ScrollView>
            <View style={styles.user}>
              {user.image ? (
                <Image
                  tint="light"
                  style={styles.image}
                  //   preview={{ uri: thumbnailUrl }}
                  uri={user.image}
                />
              ) : (
                <Icon
                  name="account"
                  size={70}
                  iconColor={colors.secondary}
                  backgroundColor={colors.light}
                />
              )}
              <Text style={{ marginVertical: 10 }}>{user.userName}</Text>
              <Text>{appUser.email}</Text>
            </View>
            <View style={styles.entries}>
              <Text>Located in: </Text>
              <Text>{user.location}</Text>
            </View>
            <View style={styles.entries}>
              <Text>Field: </Text>
              <Text>{user.isAdmin ? "Admin" : user.categoryName}</Text>
            </View>
            <View style={styles.entries}>
              <Text>Work station: </Text>
              <Text>{user.workPlace}</Text>
            </View>
            {!appUser.isAdmin && (
              <View style={styles.entries}>
                <Text>Approved by: </Text>
                <Text>Seeker Organization Administration, (S.O.A company)</Text>
              </View>
            )}
            {!appUser.isAdmin && (
              <View style={styles.rating}>
                <Text>Rating </Text>
                <View style={styles.intro}>
                  {stars.map((star) => (
                    <Icon
                      key={star}
                      name="star-circle-outline"
                      backgroundColor={colors.light}
                      iconColor={colors.dark}
                      size={50}
                    />
                  ))}
                </View>
              </View>
            )}

            {appUser.isAdmin && (
              <ListItem
                IconComponent={<Icon name="plus" size={40} />}
                title="Create Sevice."
                onPress={() => setCreateVisible(true)}
              />
            )}
            {appUser.isAdmin && (
              <ListItem
                IconComponent={<Icon name="plus" size={40} />}
                title="Manage Services."
                onPress={() => setEditVisible(true)}
              />
            )}

            {appUser.isAdmin && (
              <ListItem
                IconComponent={<Icon name="plus" size={40} />}
                title="General Approvals."
                onPress={() => setApprovalVisible(true)}
              />
            )}

            {/* i */}
          </ScrollView>
        )}
        <Modal
          visible={editVisible}
          style={{
            margin: 0,
            backgroundColor: "yellow",
            alignItems: undefined,
            justifyContent: undefined,
            marginHorizontal: 30,
          }}
        >
          <ServiceEdit editVisible={setEditVisible} />
        </Modal>
        <Modal visible={approvalVisible}>
          <Approvals approvalVisible={setApprovalVisible} />
        </Modal>
        <Modal visible={createVisible}>
          <CreateService setCreateVisible={setCreateVisible} />
        </Modal>
      </Screen>
    </>
  );
}

// sms, asap, call,mail

const styles = StyleSheet.create({
  container: {},
  intro: {
    // backgroundColor: colors.dark,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    flex: 1,
    borderLeftWidth: 0,
    flexGrow: -1,
  },

  user: {
    alignItems: "center",
  },
  entries: {
    marginVertical: 7,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "green",
    margin: 15,
    alignItems: undefined,
    justifyContent: undefined,
    marginTop: 50,
  },
});
export default Profile;
