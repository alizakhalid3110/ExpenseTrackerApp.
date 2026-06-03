import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Recents = () => {
    const navigation = useNavigation();
    const [recents, setRecents] = useState([1, 2, 3, 4, 5, 6, 7])
    return (
        <View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>

                <Text style={{
                    color: '#cacac4ff', fontWeight: 'bold', fontSize: 16
                }}>Recent Transactions</Text>

            </View>


            {
                recents.map((item, index) => {
                    return (
                        <View key={index}>
                            <View
                                style={{
                                    backgroundColor: '#464444ff', width: '99%', height: 70, marginTop: 10,
                                    borderRadius: 10, elevation: 10
                                }}>
                            </View>

                        </View>
                    )
                })
            }

        </View>
    )
};


export default Recents;