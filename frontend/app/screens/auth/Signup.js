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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import 'react-native-gesture-handler';

const Signup = () => {
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
          <View style={{marginTop: 10}}>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Username" />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Email" />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Location" />
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
                  <Feather name={rightIcon} size={25} style={styles.eyeIcon} />
                </TouchableOpacity>
                </View>
              </View>
            </View>

            <Pressable
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
                Đăng ký
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{marginTop: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Đã có tài khoản?{' '}
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary,
                    fontSize: 16,
                  }}>
                  Đăng nhập
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
    marginBottom: SIZES.Large,
  },
  title: {
    fontFamily: 'Poppins' /*bold/*/,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.Large,
  },
  wrapper: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    color: COLORS.black,
  },
  inputWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
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
  iconStyle: {
    marginRight: 10,
  },
});
export default Signup;
