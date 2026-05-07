import * as React from 'react';
import { Image, View, TextInput } from 'react-native';
import { Images, Colors } from '../../theme';
import styles from './Styles/index';
import Icon from 'react-native-vector-icons/Feather';
import { Surface } from 'react-native-paper';

function CommonSearchInput({
  inputStyle,
  placeholder,
  type,
  searchInputStyle,
  onChangeText,
  surfaceStyle,
  disabled,
  focus
}) {
  return (
    <Surface style={[styles.surface, surfaceStyle]} elevation={0}>
      <View style={searchInputStyle}>
        <TextInput
          autoFocus={focus}
          editable={!disabled}
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
        {/* <Image
          source={Images.SearchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        /> */}
        <Icon
          name='search'
          size={20}
          style={styles.searchIcon}
        />

      </View>
    </Surface>
  );
}

export default CommonSearchInput;
