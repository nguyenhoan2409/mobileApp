import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SIZES, COLORS} from '../../constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <Image
            source={require('../../../assets/images/background.png')}
            style={styles.cover}
          />
          {/* <Text style={styles.title}>Khám phá thế giới nội thất</Text> */}
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Fontisto
                  name="email"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Enter email" />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Enter password"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                </View>

                <View>
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Feather
                      name={rightIcon}
                      size={25}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => navigation.navigate('BottomTabBuyer')}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 6,
                padding: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Đăng nhập
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{marginTop: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Bạn chưa có tài khoản?{' '}
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary,
                    fontSize: 16,
                  }}>
                  Đăng ký
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backbtn: {
    alignItems: 'center',
    position: 'absolute',
    //zIndex:999,
    top: SIZES.large - 10,
  },
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.xLarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  inputWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
  passwordWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  eyeIcon: {
    zIndex: 999
  },
});
export default Login;
