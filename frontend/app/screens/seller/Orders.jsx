import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCardView from '../../components/OrderCardView'; 
import API from '../../services/GlobalAPI';

const Orders = () => {
    const [recentlyOrderList, setRecentlyOrderList] = useState([]);

    const getRecentlyOrderList = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            var response = await API.requestGET_SP(`/orders/all?token=${token}`);
            if (response) {
                setRecentlyOrderList(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRecentlyOrderList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách orders</Text>
            <FlatList
                data={recentlyOrderList}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <OrderCardView item={item} key={index} />
                )}
            />
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
});
