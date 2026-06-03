import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
const Add = () => {


  const [Income, setIncome] = useState();
  const [Expense, SetExpense] = useState();
  const AddTransaction = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log('no user exists')
      return;
    }
    else if (!Amount || !Title || !Category || !Type) {
      console.log('please fill form completely')
    }
    else

      try {
        const ref = collection(db, "ExpenseCollection", user.email, "transactions")
        await addDoc(ref, {
          title: Title,
          amount: Amount,
          category: Category,
          type: Type.trim().toLowerCase(),
          createdAt: serverTimestamp()
        });



        console.log('data added successfully');
        setAmount('');
        setTitle('');
        setCategory('');
        setType('');
      }
      catch (err) {
        console.log(err)
      };

  };

  const [Amount, setAmount] = useState('');
  const [Title, setTitle] = useState('');
  const [Category, setCategory] = useState('');
  const [Type, setType] = useState('');

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>

        </Text>
      );
    }
    return null;
  };



  const data = [
    { label: 'Food', value: 'Food' },
    { label: 'Bills', value: 'Bills' },
    { label: 'family', value: 'Family' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Phone', value: 'Phone' },
    { label: 'Shoping', value: 'Shoping' },
    { label: 'Education', value: 'Education' },
    { label: 'Others', value: 'Others' },
  ];
  return (


    <View style={styles.main}
    >

      <View style={{
        marginTop: 50
      }}>
        <Text style={{
          textAlign: 'center', color: 'white', fontWeight: 900, fontSize: 20
        }}>Add New Transaction</Text>

        <View style={{
          padding: 30
        }}>
          <Text style={{
            color: 'white', fontSize: 16
          }}>Enter Amount</Text>
          <TextInput placeholder="$0.0"
            value={Amount}
            onChangeText={(text) => setAmount(text)}

            placeholderTextColor={"gray"}

            style={{
              borderWidth: 1, borderColor: 'lightgray', marginTop: 20, borderRadius: 20, paddingLeft: 15
            }}
          />
          <Text style={{
            color: 'white', fontSize: 16, marginTop: 40
          }}>Add Title
          </Text>
          <TextInput placeholder="what is this for"
            value={Title}
            onChangeText={(text) => setTitle(text)}
            placeholderTextColor={"gray"}

            style={{
              borderWidth: 1, borderColor: 'lightgray',
              marginTop: 20, borderRadius: 20, paddingLeft: 15
            }}
          />

          <Text style={{
            color: 'white', fontSize: 16, marginTop: 40
          }}>Set Type
          </Text>
          <TextInput placeholder="income or expense"
            value={Type}
            onChangeText={(text) => setType(text)}
            placeholderTextColor={"gray"}

            style={{
              borderWidth: 1, borderColor: 'lightgray',
              marginTop: 20, borderRadius: 20, paddingLeft: 15
            }}
          />
          <View>

          </View>


          <Text style={{
            marginTop: 30,
            color: 'white', fontSize: 16, marginBottom: 20

          }}>Select Category</Text>
          <View style={styles.container}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."

              value={Category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCategory(item.value);
                setIsFocus(false);
              }}

            />
          </View>
          <TouchableOpacity onPress={() => AddTransaction()}



            style={{
              marginTop: "20%",
              width: "80%",
              backgroundColor: "#9bfc3bff",
              height: 38,
              justifyContent: "center",
              alignSelf: 'center',
              borderRadius: 15

            }}
          >
            <Text style={{ textAlign: "center", color: "black", fontSize: 18 }}>
              Add
            </Text>
          </TouchableOpacity>

        </View>



      </View>

    </View>
  )
};

export default Add;
const styles = StyleSheet.create({
  container: {

  },
  main: {
    backgroundColor: '#464444ff', flex: 1, marginTop: 50, padding: 15, borderTopEndRadius: 40,
    borderTopLeftRadius: 40
  },
  dropdown: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',

    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
