import { Image,Text,View,ScrollView,TouchableOpacity,StyleSheet } from "react-native";
import React,{useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Font } from 'expo';
import { SIZES,COLORS } from "../constants";
import Button from 'project/screens/Button';
import { TextInput } from "react-native-gesture-handler";
import 'react-native-gesture-handler';


const Signup =()=>{
   
    
    return (
       
        <ScrollView>
        <SafeAreaView style={{marginHorizontal:20}}>
        <View>
       

        <Image source={require('./bk.png')}
        style={styles.cover}
        />
        <Text style={styles.title}>Sign up and starts shopping</Text>
        <View>
            <View style={styles.wrapper}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrapper('black')}>

                    <TextInput
                    placeholder="Username"

                    />
                </View>

            </View>

            <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper('black')}>

                    <TextInput
                    placeholder="Email"

                    />
                </View>

            </View>

            <View style={styles.wrapper}>
                <Text style={styles.label}>Location</Text>
                <View style={styles.inputWrapper('black')}>

                    <TextInput
                    placeholder="Location"

                    />
                </View>

            </View>

            <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper('black')}>

                    <TextInput
                    placeholder="Enter password"

                    />
                </View>

            </View>

        <Button title={"S I G N U P"}/>

        </View>
       

        </View>
        </SafeAreaView>
        </ScrollView>
  
    )
};
const styles = StyleSheet.create({
    backbtn: {
        alignItems:"center",
        position: "absolute",
        //zIndex:999,
        top: SIZES.large-10
    },
    cover: {
        height:SIZES.height/2.4,
        width:SIZES.width-60,
        resizeMode:"contain",
        marginBottom:SIZES.Large
    },
    title:{
        fontFamily: "Poppins",/*bold/*/
        fontSize:SIZES.xLarge,
        color:COLORS.primary,
        alignItems:"center",
        marginBottom:SIZES.Large,
        
    },
    wrapper:{
        marginBottom:10,
        
    },
    label:{
        fontFamily:"bold",/*regular/*/
        fontSize:SIZES.xSmall,
        marginBottom:5,
        marginEnd:5,
        textAlign:"right"
    },
    inputWrapper:(borderColor)=>({
        borderColor:borderColor,
        backgroundColor:COLORS.lightWhite,
        borderWidth:1,
        height:45,
        borderRadius:12,
        flexDirection:'row',
        paddingHorizontal:15,
        alignItems:"center"
    })
   
})
export default Signup;


