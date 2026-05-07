import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from './Styles/type';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/SignUpLogIn/CommanText';
import CommanHeading from '../../components/CommanHeading';
import RadioButton from '../../components/RadioButton';
import CommanBtn from '../../components/CommanBtn';
import { chooseIdData } from '../../assets/data';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/SelectProofStyle';
import { Images } from '../../theme';

function SelectProofScreen({ navigation }) {
  const [countryCode, setCountryCode] = useState('IN');
  const onSelect = (country) => {
    setCountryCode(country.cca2);
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Identity Verification"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <CommanHeading
          headingText
          heading="Choose an ID type to add"
          navigation={navigate}
        />
        <CommanText
          commanText="Issuing country/region"
          commanTextstyle={styles.countryPickerLabelText}
        />
        <View>
          <Image
            source={Images.BottomArrow}
            resizeMode="contain"
            style={styles.countryBottomArrow}
          />
          <CountryPicker
            {...{
              countryCode,
              withCountryNameButton: true,
              withFlagButton: false,
              withAlphaFilter: true,
              allowFontScaling: true,
              onSelect
            }}
            containerButtonStyle={styles.countryPickerStyle}
            theme={styles.countryPickerThemeStyle}
          />
        </View>
        <RadioButton
          data={chooseIdData}
          radioBoxStyle={styles.radioBoxStyle}
          radioTextStyle={styles.radioTextStyle}
        />
        <Text style={styles.selectProofBottomText}>
          We take steps to help ensure this info stays private. Learn more in
          our Privacy Policy.
        </Text>
        <CommanBtn
          btnText="Continue"
          commanBtnStyle={styles.continueBtn}
          onBtnPress={() => navigation.navigate('Camera')}
        />
      </Content>
    </Container>
  );
}

export default SelectProofScreen;
