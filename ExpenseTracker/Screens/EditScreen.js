import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Edit = ({ route, navigation }) => {
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [amount, setAmount] = useState(item.amount);
  const [category, setCategory] = useState(item.category);

  const saveEdit = async () => {
    const user = auth.currentUser;

    try {
      await updateDoc(
        doc(db, "ExpenseCollection", user.email, "transactions", item.id),
        {
          title,
          amount,
          category,
        }
      );

      console.log("Updated Successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>

      <Text>Edit Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <Text>Edit Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <Text>Edit Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <TouchableOpacity onPress={saveEdit} style={{ padding: 15, backgroundColor: "green" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Edit;
