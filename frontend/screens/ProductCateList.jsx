import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'


const ProductCateList = () => {
    const route = useRoute(); 
    const {item} = route.params; 
    return (
        <Text>{item.name}</Text>
    )
}

export default ProductCateList; 

const styles = StyleSheet.create({}); 