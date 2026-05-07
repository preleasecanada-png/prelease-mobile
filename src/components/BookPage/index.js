import * as React from 'react';
// import { useState } from 'react';
import CommanBtn from '../CommanBtn';
import RangeSlider from '../RangeSlider';
import DatePicker from '../DatePicker';
import RadioButton from '../RadioButton';
import FacilitiesRules from '../FacilitiesRules';
import CounterList from '../CounterList';
import CancellationPolicy from '../CancellationPolicy';
import CommanHeading from '../CommanHeading';
import { amenitiesList, facilitiesList, noOfRooms, propertyTypeData } from '../../assets/data';
import { Content } from '..';

import styles from './Styles/index';
import { navigate } from '../../navigation/ReduxNavigation';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import RadioButtonGroup from '../RadioButtonGroup';
import CommanText from '../SignUpLogIn/CommanText';
import LineSeperator from '../LineSeperator';
import { paddingRight } from 'styled-system';
import { Checkbox, Switch, sw } from 'react-native-paper';
import { Colors } from '../../theme';
import Icon from 'react-native-vector-icons/Fontisto';
// import { View, Text } from 'react-native';import { Switch } from 'react-native-paper';

const MyComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch color={Colors.primary} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};


// const CommonToggleButton = () => {
//   const [status, setStatus] = React.useState('checked');

//   const onButtonToggle = value => {
//     setStatus(status === 'checked' ? 'unchecked' : 'checked');
//   };

//   return (
//     <TouchableOpacity onPress={onButtonToggle}>
//       {
//         status == 'unchecked' ?
//           <Icon name={'toggle-off'} size={30} color={'#CDCDCD'} />
//           :
//           <Icon name={'toggle-on'} size={30} color={Colors.primary} />
//       }

//     </TouchableOpacity>
//   );
// };


const CheckboxItem = ({ item }) => {
  console.log('Checkbox', item)
  const [checked, setChecked] = React.useState(false);
  return (
    <TouchableOpacity style={styles.checkBoxItem}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
        color={Colors.primary}

      />
      <Text style={styles.checkboxText}>{item.text}</Text>
    </TouchableOpacity>
  )
}

const CheckBoxGroup = ({ data = [], }) => {
  // create show more state and button
  const [showMore, setShowMore] = React.useState(false);
  const showMoreButton = () => {
    setShowMore(!showMore);
  }

  return (
    <View style={styles.checkboxContainer}>
      <FlatList
        data={
          data.slice(0, !showMore ? 6 : data.length)

        }
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <CheckboxItem item={item} />}
      />

      <TouchableOpacity onPress={showMoreButton} style={styles.learnMoreBtn}>
        <Text style={styles.learnMoreBtnText}>{showMore ? 'Show Less' : 'Show more'}</Text>
      </TouchableOpacity>
    </View>
  )
}


function BookPage() {
  return (
    <>
      <Content hasHeader contentContainerStyle={styles.container}>


        <View style={[styles.content, { paddingRight: 0 }]}>
          <CommanHeading
            headingText
            heading="Type of Place"
            commanHeadingContainerStyle={styles.propertyHeadingStyle}
            commanHeadingTextStyle={styles.propertyHeadingTextStyle}
            navigation={navigate}
          />
          <CommanText
            commanText={'Search rooms, entire homes, or any type of place '}
            commanTextstyle={styles.subTextStyle}
          />
          <RadioButtonGroup data={propertyTypeData} />

        </View>


        <LineSeperator style={styles.LineSeperatorStyle} />

        {/* <RadioButton data={propertyTypeData} /> */}

        <View style={[styles.content]}>
          <CommanHeading
            headingText
            heading="Price Range"
            commanHeadingContainerStyle={styles.propertyHeadingStyle}
            commanHeadingTextStyle={styles.propertyHeadingTextStyle}
            navigation={navigate}
          />
          <CommanText
            commanText={'From min to max'}
            commanTextstyle={styles.subTextStyle}
          />
          <RangeSlider />
        </View>
        <LineSeperator style={styles.LineSeperatorStyle} />
        <View style={[styles.content, { paddingRight: 0 }]}>
          <CommanHeading
            headingText
            heading="Rooms and Beds"
            commanHeadingContainerStyle={styles.propertyHeadingStyle}
            commanHeadingTextStyle={styles.propertyHeadingTextStyle}
            navigation={navigate}
          />
          <CommanText
            commanText={'Bedrooms'}
            commanTextstyle={styles.subTextStyle}
          />
          <RadioButtonGroup data={noOfRooms} />



          <CommanText
            commanText={'Beds'}
            commanTextstyle={styles.subTextStyle}
          />
          <RadioButtonGroup data={noOfRooms} />

          <CommanText
            commanText={'Bathrooms'}
            commanTextstyle={styles.subTextStyle}
          />
          <RadioButtonGroup data={noOfRooms} />

        </View>

        <LineSeperator style={styles.LineSeperatorStyle} />


        {/* <DatePicker /> */}
        <View style={[styles.content]}>
          <CommanHeading
            headingText
            heading="Amenities"
            commanHeadingContainerStyle={styles.propertyHeadingStyle}
            commanHeadingTextStyle={styles.propertyHeadingTextStyle}
            navigation={navigate}
          />
          <CommanText
            commanText={'Essentials'}
            commanTextstyle={styles.subTextStyle}
          />

          <CheckBoxGroup data={amenitiesList} />

          {/* <FacilitiesRules
            facilitiesListData={amenitiesList.slice(0, 8)}
            FacilitiesRulesHeading="Amenities"
          /> */}
        </View>

        <LineSeperator style={styles.LineSeperatorStyle} />
        {/* <CounterList />
        <FacilitiesRules
          facilitiesListData={facilitiesList.slice(9, 14)}
          FacilitiesRulesHeading="Rules"
        /> */}
        {/* <CancellationPolicy Switch navigation={navigate} /> */}
        <View style={[styles.content]}>
          <CommanHeading
            headingText
            heading="Booking Options"
            commanHeadingContainerStyle={styles.bookingOptionsContainer}
            commanHeadingTextStyle={styles.propertyHeadingTextStyle}
            navigation={navigate}
          />
          <View style={styles.flexRow}>
            <View>
              <CommanHeading
                headingText
                heading={'Instant Book'}
                commanHeadingTextStyle={styles.subHeading}
                commanHeadingContainerStyle={styles.subHeadingContainerStyle}
              />
              <CommanText
                commanText={'Listings you can book without waiting for Host approval'}
                commanTextstyle={styles.subTitleTextStyle}
              />
            </View>
            <MyComponent />
          </View>

          <View style={styles.flexRow}>
            <View>
              <CommanHeading
                headingText
                heading={'Self Check-in'}
                commanHeadingTextStyle={styles.subHeading}
                commanHeadingContainerStyle={styles.subHeadingContainerStyle}
              />
              <CommanText
                commanText={'Easy access to the property once you arrive'}
                commanTextstyle={styles.subTitleTextStyle}
              />
            </View>
            <MyComponent />
          </View>
          <View style={styles.flexRow}>
            <View>
              <CommanHeading
                headingText
                heading={'Allows pets'}
                commanHeadingTextStyle={styles.subHeading}
                commanHeadingContainerStyle={styles.subHeadingContainerStyle}
              />
              <CommanText
                commanText={'Bringing a service animal?'}
                commanTextstyle={styles.subTitleTextStyle}
              />
            </View>
            <MyComponent />
          </View>
        </View>
        <LineSeperator style={styles.LineSeperatorStyle} />
        <View style={styles.buttonsContainer}>
          <CommanBtn
            btnText="Clear All"
            commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, }]}
            commanBtnTextStyle={styles.cancelButtonTextStyle}

            onBtnPress={() => navigation.navigate('AddPaymentMathod')}
          />
          <CommanBtn
            btnText="Show 00 Places"
            commanBtnStyle={styles.btnStyle}
            onBtnPress={() => navigation.navigate('AddPaymentMathod')}
          />
        </View>


      </Content>
    </>
  );
}

export default BookPage;
