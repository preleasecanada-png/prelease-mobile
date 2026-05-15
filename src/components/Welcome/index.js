import * as React from 'react';
import {
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import styles from './Styles/index';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

const {width, height} = Dimensions.get('window');
function Welcome(props) {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        imageStyle={{}}
        resizeMode="cover"
        source={props.image}
        style={{flex: 1}}>

          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View
            style={{
              marginTop: 20,
              marginBottom: WINDOW_HEIGHT * 0.105,
              alignItems: 'center',
            }}>
            <View style={{marginBottom: 10}}>
              <Text
                style={[
                  styles.welcomeScreenHeading1,
                  props?.titlePrimary && {color: Colors.primary},
                ]}>
                {props?.titlePrimary || props.heading1}
              </Text>
              {props.heading2 && (
                <Text
                  style={[
                    styles.welcomeScreenHeading1,
                    styles.welcomeScreenHeading2,
                  ]}>
                  {props.heading2}
                  <Text style={{color: Colors.primary}}>
                    {` ` + props?.title3}
                  </Text>
                </Text>
              )}
            </View>
            <Text style={styles.welcomeScreenPeregraph}>{props.peregraph}</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

export default Welcome;
