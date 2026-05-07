import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommanHeading from '../CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';
import { Colors } from '../../theme';
import UnorderedList from '../Lists/UnorderedList';

const listData = [
  {
    id: '1',
    title: 'Be respectful',
    description: 'Follow the house rules.'
  },
  {
    id: '2',
    title: 'Be courteous',
    description: 'Treat your Host’s home like your own.'
  },
]


function GroundRules({ groundRulesTextContentStyle }) {
  return (
    <>
      <View style={styles.groundRulesHeadingRow}>
        <CommanHeading
          headingText
          heading="Ground rules"
          commanHeadingContainerStyle={styles.groundRulesHeading}
          navigation={navigate}
        />
      </View>
      <View
        style={[
          styles.groundRulesTextContent,
          groundRulesTextContentStyle
        ]}>

        <Text style={[styles.groundRulesText, styles.groundRulesText2]}>
          We ask every guest to remember a few simple things about what makes a great guest.
        </Text>

        <UnorderedList
          list={listData}
          style={styles.listStyle}
        />


      </View>
    </>
  );
}

export default GroundRules;
