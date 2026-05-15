import * as React from 'react';
import {Text, Image, View, Pressable} from 'react-native';
import {Colors, Images} from '../../theme';
import styles from './Styles/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

function LogoHeading(props) {
  const {goBack} = useNavigation();
  const onPress = () => {
    console.log('Press');
    goBack();
  };
  return (
    <>
      <View style={[props.logoHeadingStyle, styles.logoHeadingStyle]}>
        {props?.backButton && (
          <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <Icon name="chevron-back" color={Colors.black} size={24} />
          </TouchableOpacity>
        )}

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.heading}>{props.heading}</Text>
        </View>
        {props?.backButton && <View style={{flex: 1}} />}
      </View>
    </>
  );
}

export default LogoHeading;
