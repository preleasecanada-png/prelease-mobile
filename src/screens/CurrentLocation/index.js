import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {Icons, Images} from '../../theme';
import styles from './Styles/CurrentLocationStyle';

const CurrentLocation = () => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.locationIconView}>
        <Image
          source={Icons.location}
          resizeMode="contain"
          style={styles.locationIcon}
        />
      </View>
      <Text style={styles.locationText}>
        St. Lawrence Market,
        <Text style={styles.locationSubText}>Toronto</Text>
      </Text>
      <Image
        source={Icons.editPen}
        resizeMode="contain"
        style={styles.editIcon}
      />
    </View>
  );
};

export default CurrentLocation;
