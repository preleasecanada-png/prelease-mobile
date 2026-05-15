import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {Images} from '../../theme';
import styles from './Style';

const Reviews = ({counts}) => {
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.sliderReviewsText}>{counts} Reviews</Text>
    </View>
  );
};

export default Reviews;
