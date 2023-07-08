import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import image from "../assets/bg.jpg";
import Screen from "../components/Screen";
import Card from "../components/Card";
import categoriesApi from "../api/categories";
import Text from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import AppButton from "../components/Button";

function Welcome({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: options,
    loading,
    error,
    request: loadOptions,
  } = useApi(categoriesApi.getCategories);

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldnt' reach Seeker Servers!</Text>
            <AppButton title="Retry" onPress={loadOptions} />
          </>
        )}
        <FlatList
          data={options}
          keyExtractor={(option) => option._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.category}
              subTitle={item.tagline}
              imageUrl={item.image}
              onPress={() => navigation.navigate("Members", item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => loadOptions()}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {},
});
export default Welcome;
