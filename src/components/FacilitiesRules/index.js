import * as React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import CommanHeading from '../CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';

function FacilitiesRules(props) {
  const renderItem = ({ item }) => (
    <View style={styles.facilitiListCol} key={item.id}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.facilitiListImg}
      />
      <Text style={styles.facilitiListText}>{item.text}</Text>
    </View>
  );
  return (
    <>
      <View style={props.facilitiListContentStyle}>
       {props.FacilitiesRulesHeading && <CommanHeading
          headingText
          heading={props.FacilitiesRulesHeading}
          commanHeadingContainerStyle={[
            styles.facilitiesHeadingStyle,
            props.facilitiesHeadingStyle
          ]}
          navigation={navigate}
        />}
        <View style={styles.facilitiListContent}>
          <FlatList
            bounces={false}
            data={props.facilitiesListData}
            renderItem={renderItem}
            numColumns={props?.numColumns || 3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.facilitiListContainer}
          />
        </View>
      </View>
    </>
  );
}

export default FacilitiesRules;
