import * as React from 'react';
import { Image, View, TextInput, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Images, Colors, Icons } from '../../theme';
import styles from './Styles/index';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Surface } from 'react-native-paper';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FeatherIcon } from '../../theme/icons';

function SearchInputScreen({
  inputStyle,
  placeholder,
  type,
  searchInputStyle,
  onChangeText,
  whereTo = "Where To?",
  leftIcon = "search",
  onLeftButtonPress
}) {

  const navigation = useNavigation()
  const onFilterBtnPress = () => {

    navigation.navigate("Filter")
  }
  const onSearchBtnPress = () => {

    navigation.navigate("Search")
  }

  return (
    <TouchableWithoutFeedback
      onPress={onLeftButtonPress ?? onSearchBtnPress}
    >
      <Surface style={styles.surface} elevation={4}>
        {/* <Image
        source={Images.SearchIcon}
        style={styles.searchIconLeft}
        resizeMode="contain"
      /> */}

        <View
          style={styles.leftButton}
        >
          <FeatherIcon
            name={leftIcon}
            size={20}
            style={styles.searchIconLeft}
          />
        </View>


        <View style={[styles.allInputStyle, { justifyContent: "center", flex: 1 }]}>
          <Text
            numberOfLines={1}
            style={[styles.allInputStyle, styles.topLabel]}
          >
            {whereTo}
          </Text>
          <Text

            style={[styles.allInputStyle, inputStyle]}
          >
            {placeholder}
          </Text>
        </View>
        {/* <TextInput
        style={[styles.allInputStyle, inputStyle]}
        placeholder={placeholder}
        keyboardType={type}
        placeholderTextColor={Colors.darkGray}
        
        onChangeText={(text) => {
          if (onChangeText) {
            onChangeText(text);
          }
        }}
      /> */}
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onFilterBtnPress}
        >
          <Image
            source={Icons.filter}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Surface>
    </TouchableWithoutFeedback>
  );
}

export default SearchInputScreen;
