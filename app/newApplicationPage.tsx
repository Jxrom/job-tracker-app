import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Define a type for the tags
const tagNames: string[] = [
  "Full-time",
  "Remote",
  "Part-time",
  "Internship",
  "Hybrid",
  "Onsite",
];

export default function NewApplicationPage() {
  // useState for Date Functionality
  const [date, setDate] = useState(new Date());

  // User Information State
  const [companyName, setCompanyName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<string>(""); // Store selected salary range
  const [notes, setNotes] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Store selected tags

  // Separate state arrays for Salary Range and Tags buttons
  const initialSalaryColors = Array(2).fill("#FFF"); // Initial color for Salary Range buttons
  const initialTagColors = Array(tagNames.length).fill("#FFF"); // Initial color for Tags buttons
  const [salaryButtonColors, setSalaryButtonColors] =
    useState<string[]>(initialSalaryColors);
  const [tagButtonColors, setTagButtonColors] =
    useState<string[]>(initialTagColors);

  // Function to toggle color for Salary Range buttons and set salary range
  const toggleSalaryButtonColor = (index: number) => {
    const newColors = salaryButtonColors.map((color, i) =>
      i === index ? "#9491F1" : "#FFF"
    );
    setSalaryButtonColors(newColors);

    // Set the salary range based on the selected button
    setSalaryRange(index === 0 ? "15k to 20k" : "20k to 25k");
  };

  // Function to toggle color for Tags buttons and manage selected tags
  const toggleTagButtonColor = (index: number) => {
    const newColors = tagButtonColors.map((color, i) =>
      i === index ? (color === "#FFF" ? "#9491F1" : "#FFF") : color
    );
    setTagButtonColors(newColors);
    //console.log(newColors);
    // Add or remove the tag from the selectedTags array
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tagNames[index])
          ? prevTags.filter((tag) => tag !== tagNames[index]) // Remove tag if already selected
          : [...prevTags, tagNames[index]] // Add tag if not selected
    );
  };

  // Function to handle the save action when the button is clicked
  // Create Application Button
  const handleSaveApplication = async () => {
    const applicationData = {
      companyName,
      position,
      salaryRange,
      notes,
      selectedTags,
      date: date.toLocaleDateString(),
    };

    try {
      await AsyncStorage.setItem(
        `application_${Date.now()}`, // use a unique key for each application
        JSON.stringify(applicationData)
      );
      console.log("Saved Application Data:", applicationData);
    } catch (error) {
      console.error("Failed to save application:", error);
    }

    // Reset fields after saving (optional)
    setCompanyName("");
    setPosition("");
    setSalaryRange("");
    setNotes("");
    setSelectedTags([]);
    setSalaryButtonColors(initialSalaryColors); // Reset salary colors
    setTagButtonColors(initialTagColors); // Reset tag colors

    router.replace("/"); // This will return the page to home page
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.todayText}>Today</Text>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ex. Google"
          placeholderTextColor={"#888"}
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
        />
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Quality Analyst"
          placeholderTextColor={"#888"}
          value={position}
          onChangeText={(text) => setPosition(text)}
        />
        <Text style={styles.label}>Salary Range</Text>
        <View style={styles.salaryRangeButtonsContainer}>
          {["15k to 20k", "20k to 25k"].map((range, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tagsButton,
                { backgroundColor: salaryButtonColors[index] },
              ]}
              onPress={() => toggleSalaryButtonColor(index)}
            >
              <Text style={styles.buttonText}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Tags</Text>
        <View style={styles.tagsContainer}>
          {tagNames.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tagsButton,
                { backgroundColor: tagButtonColors[index] },
              ]}
              onPress={() => toggleTagButtonColor(index)}
            >
              <Text style={styles.buttonText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Company Information"
          placeholderTextColor={"#888"}
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
        <Pressable
          style={styles.createApplicationButton}
          onPress={handleSaveApplication}
        >
          <Text style={styles.buttonText}>Create Application</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  label: {
    color: "#000",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    fontFamily: "Inter-Black",
  },
  textInput: {
    width: "90%",
    height: "6%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#FFF",
    color: "#000000",
    marginLeft: 15,
    margin: 10,
  },
  createApplicationButton: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginTop: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#9491F1",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Inter-Black",
  },
  dateText: {
    fontFamily: "Inter-Black",
    justifyContent: "center",
    alignSelf: "flex-end",
    fontSize: 14,
    marginBottom: 10,
    marginRight: 15,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  tagsButton: {
    width: "40%",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  todayText: {
    justifyContent: "center",
    alignSelf: "flex-end",
    fontFamily: "Inter-BlackBold",
    fontSize: 20,
    marginRight: 15,
    marginTop: 10,
  },
  salaryRangeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
    margin: 10,
  },
});
