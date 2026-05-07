import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/Index';
import { View } from 'react-native';

function CommanBtnScreen({
  btnText,
  commanBtnStyle,
  commanBtnTextStyle,
  onBtnPress = () => null,
  icon

}) {
  return (
    <TouchableOpacity
      style={[styles.commanBtn, commanBtnStyle]}
      onPress={() => {
        if (onBtnPress) {
          onBtnPress();
        }
      }}>
      <Text style={[styles.commanBtnText, commanBtnTextStyle]}>
        {btnText}
      </Text>

      {icon && <View style={[styles.commanBtnIcon]}>
        {icon}
      </View>}
    </TouchableOpacity>
  );
}

export default CommanBtnScreen;
