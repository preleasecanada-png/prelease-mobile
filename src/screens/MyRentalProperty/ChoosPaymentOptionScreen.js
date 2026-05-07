import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Content, Header } from '../../components';
import { creditCardData, paymentOptionData } from '../../assets/data';
import PaymentList from '../../components/PaymentList';
import CommanHeading from '../../components/CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import { Colors, Images } from '../../theme';
import styles from './Styles/MyRentalPropertyStyle';
import HeaderMain from '../../components/HeaderMain';
import LineSeperator from '../../components/LineSeperator';
import CancellationPolicy from '../../components/CancellationPolicy';
import Icon from 'react-native-vector-icons/Feather'
import GroundRules from '../../components/GroundRules';
import CommanBtnScreen from '../../components/CommanBtn';
import { useRoute } from '@react-navigation/native';

const ChoosPaymentOptionScreen = ({ navigation, route }) => {
  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<Icon name={'bell'} size={25} color={Colors.black} />}
        rightIconPress={() => { }}
        centerImageColor={Colors.lightWhite}
        containerStyle={{
          paddingHorizontal: 20,
        }}
        customRightIcon={true}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanHeading
          headingText
          heading="Payment"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          navigation={navigate}
        />
        <View style={styles.paymentOptionList}>
          <CommanHeading
            headingText
            heading="Payment Method"
            // commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <PaymentList data={creditCardData} paymentOptionSubText={1} />

          {/* 
          <View style={styles.paymentCardTypeImgs}>
            <Image
              source={Images.VisaIcon}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardVisaImg]}
            />
            <Image
              source={Images.MasterCardIcon}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardMasterImg]}
            />
            <Image
              source={Images.ReadyRentalGrayLogo}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardRentalImg]}
            />
          </View>*/}
          {/* <Text style={styles.paymentPrivacyPolicyText}>
            By proceeding, you understand that your information will be
            processed as per Ready Rental’s{' '}
            <Text style={styles.paymentPrivacyPolicyLinkText}>
              Privacy Policy
            </Text>
          </Text>  */}


          <LineSeperator
            style={{
              backgroundColor: Colors.gray,
              height: 1,
            }}
          />
          <CancellationPolicy />

          <LineSeperator
            style={{
              backgroundColor: Colors.gray,
              height: 1,
            }}
          />
          <GroundRules />

          <CommanBtnScreen
            btnText="Next"
            commanBtnStyle={styles.nextBtnStyle}
            onBtnPress={() => navigation.navigate('PaymentMathod', {
              ...route?.params
            })}

          />
        </View>
      </Content>
    </Container>
  );
};
export default ChoosPaymentOptionScreen;
