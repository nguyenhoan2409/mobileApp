import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProfileSeller = () => {
    const navigation = useNavigation(); 
    async function removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            console.log('token was deleted'); 
            navigation.navigate('Login');
        }
        catch(exception) {
            console.log(exception)
        }
    }
    return (
        <View>
            <Text onPress={() => {removeItemValue('userToken')}}>Đăng xuất</Text>
        </View>
    )
}

export default ProfileSeller; 
const styles = StyleSheet.create({}); 