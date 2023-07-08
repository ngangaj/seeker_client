import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import image from "../assets/bg.jpg";
import Screen from "../components/Screen";
import Card from "../components/Card";
import usersApi from "../api/users";
import Text from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import Button from "../components/Button";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import routes from "../navigation/routes";

function Members({ route, navigation, admin, handleApproval, item }) {
  //data: options, loading, error, request: loadOptions
  const category = admin ? { ...item } : route.params;
  // const [category, setCategory] = useState('');
  // useState({
  //   _id: "6040b721c90a5b0e6c61580a",
  //   image: "",
  //   category: "Category Label;",
  //   tagline: "the tagline of the spealization",
  // });
  const {
    data: members,
    loading,
    error,
    request: loadMembers,
  } = useApi(usersApi.getMembers);
  console.log(members);

  useEffect(() => {
    loadMembers(category._id);
  }, []);
  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.screen}>
        <FlatList
          data={members}
          keyExtractor={(member) => member._id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          ListHeaderComponent={
            <Card
              title={category.category}
              subTitle={category.tagline}
              imageUrl={category.image}
            />
          }
          // ListFooterComponent={
          //   <ListItem
          //     style={{ backgroundColor: colors.light }}
          //     subTitleColor={{ color: colors.white }}
          //     subTitle={`Register as a provider for the service ? T&C's apply.`}
          //     onPress={() => console.log("Navigate with ", category)}
          //     IconComponent={
          //       <Icon
          //         name={"plus-circle-multiple-outline"}
          //         // backgroundColor={colors.primary}
          //         size={60}
          //       />
          //     }
          //   />
          // }
          renderItem={({ item }) => (
            <>
              <ListItem
                title={item.userName}
                subTitle={
                  !admin
                    ? "Works at: " + item.workPlace
                    : "approved: " + item.approved
                }
                image={item.image}
                onPress={
                  !admin
                    ? () =>
                        navigation.navigate(routes.VIEW_PROVIDER, {
                          item,
                          category: category.category,
                        })
                    : null
                }
              />
              {admin && (
                <View
                  style={{
                    width: "50%",
                    alignSelf: "center",
                    height: 30,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    title={item.approved ? "disapprove" : "approve"}
                    onPress={() => handleApproval(item)}
                    color="secondary"
                  />
                </View>
              )}
            </>
          )}
        />
        {error && (
          <View style={{ alignItems: "center", bottom: "20%" }}>
            <Button title="Retry" onPress={() => loadMembers(category._id)} />
            <Text>Couldnt' reach Seeker Servers!</Text>
          </View>
        )}

        {members.length == 0 && (
          <>
            <Text style={{ marginBottom: 100 }}>
              There are no providers currently Registered for this perticular
              service.
            </Text>
            <View
              style={{
                bottom: "20%",
                height: 50,
              }}
            >
              <Button
                title="refresh members"
                onPress={() => loadMembers(category._id)}
              />
            </View>
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {
    flex: 1,
  },
});
export default Members;
