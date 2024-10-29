import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function newApplicationPage() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false); // Hide the picker after selection
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>New Application</Text>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ex. Google"
          placeholderTextColor={"#888"}
        />
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Quality Analyst"
          placeholderTextColor={"#888"}
        />
        <Text style={styles.label}>Application Date</Text>
        <View style={styles.dateContainer}>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShow(true)} // Show picker when pressed
          >
            <Text style={styles.buttonText}>Change Date</Text>
          </Pressable>
          {show && (
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </View>
        <Text style={styles.label}>Salary Range</Text>
        <TextInput
          style={styles.textInput}
          placeholder="25, 000"
          placeholderTextColor={"#888"}
        />
        <Text style={styles.label}>Tags</Text>
        <View style={styles.tagsContainer}>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Full-time</Text>
          </Pressable>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Remote</Text>
          </Pressable>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Part-time</Text>
          </Pressable>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Internship</Text>
          </Pressable>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Hybrid</Text>
          </Pressable>
          <Pressable style={styles.tagsButton}>
            <Text style={styles.buttonText}>Onsite</Text>
          </Pressable>
        </View>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Company Information"
          placeholderTextColor={"#888"}
        />
        <Pressable style={styles.createApplicationButton}>
          <Text style={styles.buttonText}>Create Application</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    color: "#000000",
    margin: 16,
    fontFamily: "Inter-BlackBold",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    color: "#000",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    fontFamily: "Inter-Black",
  },
  textInput: {
    width: "90%",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#C2B9B9",
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
  dateButton: {
    width: "40%",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    backgroundColor: "#9491F1",
  },
  tagsButton: {
    width: "40%",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    backgroundColor: "#9491F1",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "Inter-Black",
  },
});
