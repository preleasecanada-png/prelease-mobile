import * as React from 'react';
import { useCallback, useState } from 'react';
import { View, Image } from 'react-native';
import Label from './Label';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import Slider from 'rn-range-slider';
import CommanHeading from '../CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';
import { Images } from '../../theme';
import TextInputScreen from '../SignUpLogIn/TextInput';
import CommanText from '../SignUpLogIn/CommanText';
import { fontSize, fontWeight } from 'styled-system';

function RangeSlider() {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const [sliderOpenClose, setSliderOpenClose] = useState(true);
  // create state object for slider
  const [sliderValue, setSliderValue] = useState({
    min: 1000,
    max: 1000000,
    value: 500,
  });

  const handleValueChange = useCallback((low, high) => {
    setSliderValue({
      min: low,
      max: high,
    });
  }, []);

  console.log("inputLabelTextStyle", sliderValue.max)

  return (
    <>
      {/* <CommanHeading
        headingCollapseBtn
        heading="Price per Month"
        commanHeadingContainerStyle={styles.priceMonthHeadingStyle}
        arrowIcon={sliderOpenClose ? Images.BottomArrow : Images.ViewAllArrow}
        arrowIconStyle={
          sliderOpenClose
            ? styles.arrowBottomIconStyle
            : styles.arrowRightIconStyle
        }
        navigation={navigate}
        onMoreBtnPress={() => setSliderOpenClose(!sliderOpenClose)}
      /> */}
      {sliderOpenClose && (
        <Slider
          // floatingLabel
          // notchView
          // highThumb={renderThumbRight}
          style={styles.rangeSlider}
          min={1000}
          renderThumb={renderThumb}
          max={100000}
          low={sliderValue.min}
          high={sliderValue.max}
          step={1}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          onValueChanged={handleValueChange}
        // lowThumb={renderThumbLeft}
        />
      )}
      <View style={styles.flexRow}>
        <View style={{ width: '30%' }}>
          <CommanText
            commanText={"Minimum"}
            commanTextstyle={styles.inputLabelTextStyle}
          />
          <View style={styles.flexRow}>
            {/* <CommanText
              commanText={"$"}
              commanTextstyle={styles.dollarIconStyle}
            /> */}
            <TextInputScreen
              defaultInput
              value={"$  "+sliderValue.min?.toString()}
              style={styles.inputTextStyle}
            />
          </View>
        </View>
        <View style={{ width: '30%' }}>
          <CommanText
            commanText={"Minimum"}
            commanTextstyle={styles.inputLabelTextStyle}
          />
          <View style={styles.flexRow}>
            {/* <CommanText
              commanText={"$"}
              commanTextstyle={styles.dollarIconStyle}
            /> */}
            <TextInputScreen
              defaultInput
              value={"$  "+sliderValue.max?.toString()}
              style={styles.inputTextStyle}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default RangeSlider;
