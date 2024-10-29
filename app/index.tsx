import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function index() {
  const [loaded, error] = useFonts({
    "Inter-Black": require("./../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "Inter-BlackBold": require("./../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>My Applications</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        placeholderTextColor={"#888"}
      />
      <Link href={"/newApplicationPage"} asChild>
        <Pressable style={styles.buttonContainer}>
          <Image
            source={require("./../assets/images/buttonImage/addButton.png")} // Update the path to your image
            style={styles.buttonImage}
          />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#000000",
    position: "absolute",
    top: 0,
    left: 0,
    margin: 16,
    fontFamily: "Inter-BlackBold",
    fontSize: 20,
  },
  searchBox: {
    width: "90%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#C2B9B9",
    color: "#000000",
    position: "absolute",
    top: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  buttonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
