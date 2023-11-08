import { StyleSheet } from "react-native";
import {COLORS, SIZES} from '../../constants';
import { Font } from 'expo';
await Font.loadAsync({
  'Poppins': require('project/assets/fonts/Poppins-Bold.ttf'),  //Điều này giả định rằng bạn có một tệp font .ttf
  //Thêm tên font và đường dẫn đến tệp font của bạn </NavigationContainer></GestureHandlerRootView>
});
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.lightWhite
      
    },
   
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 999,
      marginTop: -90,
      resizeMode:"cover",
      borderWidth:2,
      borderColor:COLORS.primary
    },
    profileContainer:{
      //flex:1,
      alignItems:"center",
      marginTop: -40,
    marginBottom: 20,
    },
    username: {
      fontFamily: "Poppins",//bold 
      color:COLORS.primary,
      marginVertical:5
    },
    email: {
      fontSize: 16,
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginTop: 10,
      paddingLeft: 10,
    },
   
    coverImage: {
      
      width: '100%',
      height: SIZES.height/3,
      resizeMode:"cover"
    },
    avatarContainer:{
      flex:1,
      alignItem:"center"
    },
    menuWrapper:{
      marginTop:SIZES.xLagrge,
      width:SIZES.width-SIZES.large,
      backgroundColor:COLORS.lightWhite,
      borderRadius:12
    },
    menuText:{
      fontFamily:"Poppins",//regular
      color:COLORS.gray,
      marginLeft:20,
      fontWeight:'600',
      fontSize:14,
      lineHeight:26
    },
    loginBtn:{
      backgroundColor:COLORS.secondary,
      padding:1.5,
      borderWidth:0.4,
      borderColor:COLORS.primary,
      borderRadius:SIZES.medium
    },
    menuItem:(borderBottomWidth)=>({
      borderBottomWidth:borderBottomWidth,
      flexDirection:'row',
      paddingVertical:13,
      paddingHorizontal:35,
      borderColor:COLORS.gray
    }),
    name:{
        fontFamily:"Poppins",/*bold/*/
        color:COLORS.primary,
        marginVertical:5,
      
    }
  });
  
  export default styles;
  