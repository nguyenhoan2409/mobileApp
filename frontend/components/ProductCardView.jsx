import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import  Ionicons  from "react-native-vector-icons/Ionicons"
import { COLORS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import ProductDetail from '../screens/ProductDetail'

const ProductCardView = ({ item }) => {

    const navigation = useNavigation();

    return (

        <TouchableOpacity onPress={() => { navigation.navigate("ProductDetail", { item }) }}>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>

                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
                    <Text style={styles.price} > ${item.price} </Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name='add-circle' size={35} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCardView; 
const styles = StyleSheet.create({
    container: {
        width: 172,
        height: 210,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.gray3,
      },
      imgContainer: {
        flex: 1,
        width: 160,
        marginLeft: SIZES.small / 2,
        marginTop: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: "hidden",
        // backgroundColor: COLORS.gray2,
      },
      image: {
        aspectRatio: 1, /// ???
        resizeMode: "cover",
      },
      details: {
        padding: SIZES.small,
      },
      title: { 
        fontWeight: "bold", 
        fontSize: SIZES.medium, 
        marginBottom: 1, 
        color: COLORS.black 
    },
      supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.black,
      },
      price: {
        fontWeight: "bold",
        fontSize: SIZES.medium,
        color: COLORS.black
      },
    
      addBtn: {
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,
      },
});