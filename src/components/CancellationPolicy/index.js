import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CommanHeading from '../CommanHeading';
import CancellationPolicySwitch from '../CancellationPolicySwitch';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';
import {Colors} from '../../theme';

function CancellationPolicy({Switch, cancellationPolicyTextContentStyle}) {
  return (
    <>
      <View style={styles.cancellationPolicyHeadingRow}>
        <CommanHeading
          headingText
          heading="Cancellation Policy"
          commanHeadingContainerStyle={styles.cancellationPolicyHeading}
          navigation={navigate}
        />
        {Switch && <CancellationPolicySwitch />}
      </View>
      <View
        style={[
          styles.cancellationPolicyTextContent,
          cancellationPolicyTextContentStyle,
        ]}>
        <Text style={styles.cancellationPolicyText}>
          Free cancellation before Nov 30.
        </Text>
        <Text
          style={[
            styles.cancellationPolicyText,
            styles.cancellationPolicyText2,
          ]}>
          After that, the reservation is non-refundable
          <Text style={styles.cancellationPolicyMoreText}> Learn more</Text>
        </Text>
        {/* <TouchableOpacity style={styles.cancellationPolicyMoreBtn}>
          <Text style={styles.cancellationPolicyMoreText}>Learn more</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
}

export default CancellationPolicy;
