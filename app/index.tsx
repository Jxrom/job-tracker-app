import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

type Application = {
  companyName: string;
  position: string;
  salaryRange: string;
  notes: string;
  selectedTags: string[];
  date: string;
};

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loaded, error] = useFonts({
    "Inter-Black": require("./../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "Inter-BlackBold": require("./../assets/fonts/Inter_18pt-Bold.ttf"),
  });
  const [selectedApplicationIndex, setSelectedApplicationIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    retrieveApplications();
  }, []);

  const retrieveApplications = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      const savedApplications = result
        .map(([key, value]) => (value ? JSON.parse(value) : null))
        .filter((item) => item !== null);

      setApplications(savedApplications);
    } catch (error) {
      console.error("Failed to retrieve applications:", error);
    }
  };

  const deleteApplication = async (index: number) => {
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);

    // Optionally, you can also delete it from AsyncStorage here if you're storing individual items by key
    // await AsyncStorage.removeItem(`application_${index}`);

    // Save updated applications back to AsyncStorage
    await AsyncStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );
  };

  const handleLongPress = (index: number) => {
    setSelectedApplicationIndex(index);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedApplicationIndex !== null) {
      deleteApplication(selectedApplicationIndex);
      setModalVisible(false);
      setSelectedApplicationIndex(null);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedApplicationIndex(null);
  };

  if (!loaded && !error) {
    return null;
  }

  // If the user click the application information in the homepage
  // This will route the page to the application details
  const handleInformationPress = () => {
    router.replace("/applicationDetails");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>My Applications</Text>

      {/* Search Box */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        placeholderTextColor={"#888"}
      />

      {/* Info Container for FlatList */}
      <View style={styles.infoContainer}>
        <FlatList<Application>
          data={applications}
          keyExtractor={(item, index) => `application_${index}`}
          renderItem={({ item, index }) => (
            <Pressable
              onLongPress={() => handleLongPress(index)}
              onPress={handleInformationPress}
            >
              <View style={styles.applicationCard}>
                <Text style={styles.cardText}>Company: {item.companyName}</Text>
                <Text style={styles.cardText}>Position: {item.position}</Text>
                <Text style={styles.cardText}>
                  Salary Range: {item.salaryRange}
                </Text>
                <Text style={styles.cardText}>Notes: {item.notes}</Text>
                <Text style={styles.cardText}>
                  Tags: {item.selectedTags?.join(", ") || "No tags"}
                </Text>
                <Text style={styles.cardText}>Date: {item.date}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this application?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.confirmButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={cancelDelete}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Application Button */}
      <Link href={"/newApplicationPage"} asChild>
        <Pressable style={styles.buttonContainer}>
          <Image
            source={require("./../assets/images/buttonImage/addButton.png")}
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
    paddingVertical: 20, // Add some vertical padding
    paddingHorizontal: 16, // Add some horizontal padding
  },
  titleText: {
    color: "#000000",
    marginBottom: 10, // Add margin to separate from the search box
    fontFamily: "Inter-BlackBold",
    fontSize: 20,
  },
  searchBox: {
    width: "100%", // Make it full width
    padding: 10,
    marginBottom: 10, // Add margin below the search box
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#FFF",
    color: "#000000",
  },
  applicationCard: {
    width: "90%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  cardText: {
    color: "#000",
    fontFamily: "Inter-Black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
  },
  confirmButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    margin: 10,
    borderWidth: 1,
    width: "30%",
  },
  cancelButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    width: "30%",
  },
  buttonText: {
    color: "black",
    justifyContent: "center",
    alignSelf: "center",
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
  infoContainer: {
    width: "100%", // Ensure it takes the full width of the container
    flex: 1, // Allow it to grow and fill the available space
    marginTop: 10, // Add margin top for spacing
  },
});
