import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, Text , TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
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
            <TouchableOpacity onPress={() => {removeItemValue('userToken')}}>
                <Text>Đăng xuất</Text>
                
            </TouchableOpacity>
        </View>
    )
}

export default Profile; 
const styles = StyleSheet.create({}); 