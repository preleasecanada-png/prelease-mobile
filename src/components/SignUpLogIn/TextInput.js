import * as React from 'react';
import {useState} from 'react';
import {TextInput, Image, View, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {Images, Colors} from '../../theme';
import styles from './Styles/index';
import PhoneInput from 'react-native-phone-number-input';

function TextInputScreen({
  defaultInput,
  passwordInput,
  datePickerInput,
  phoneInput,
  inputStyle,
  placeholder,
  type,
  passwordStyle,
  style,
  onPress,
  onChangeText,
  value,
}) {
  // const phoneInput = React.useRef(null);
  const [showPassword, setShowPassword] = useState(true);
  // focus state
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const inputRef = React.useRef(null);

  return (
    <>
      {defaultInput && (
        <TextInput
          style={[styles.allInputStyle, style, isFocused && inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value || ''}
        />
      )}
      {passwordInput && (
        <View style={passwordStyle}>
          <TextInput
            style={[styles.allInputStyle, style, isFocused && inputStyle]}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.darkGray}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            value={value || ''}
          />
          <TouchableOpacity
            style={styles.passwordEyeImgBtn}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Images.HideEye : Images.OpenEye}
              style={styles.passwordEyeImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
      {datePickerInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          value={
            value
              ? dayjs().format('DD MMMM YYYY')
              : dayjs().format('DD MMMM YYYY')
          }
          onFocus={() => {
            if (onPress) {
              onPress();
            }
          }}
        />
      )}

      {phoneInput && (
        <PhoneInput
          disableArrowIcon={false}
          placeholder={placeholder}
          // ref={phoneInput}
          containerStyle={[styles.phoneInputContatinerStyle, style, inputStyle]}
          textContainerStyle={[styles.phoneInputStyle]}
          textInputStyle={[styles.phoneTextInputStyle]}
          codeTextStyle={[styles.phoneTextInputStyle, styles.phoneCodeStyle]}
          flagButtonStyle={[styles.phoneFlagButtonStyle]}
          countryPickerButtonStyle={[styles.phoneCountryPickerButtonStyle]}
          // defaultValue={value}
          defaultCode="CA"
          layout="first"
          onChangeText={text => {
            // setValue(text);
          }}
          onChangeFormattedText={text => {
            // setFormattedValue(text);
          }}
          withDarkTheme
          // withDarkTheme
          // withShadow
          // autoFocus
        />
      )}
    </>
  );
}

export default TextInputScreen;
