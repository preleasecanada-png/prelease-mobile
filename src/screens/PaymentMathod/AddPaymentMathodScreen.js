import * as React from 'react';
import {Container, Content, Header} from '../../components';
import CommanHeading from '../../components/CommanHeading';
import PaymentList from '../../components/PaymentList';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/PaymentMathodStyle';
import CommanText from '../../components/SignUpLogIn/CommanText';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import {View} from 'react-native';
import HeaderMain from '../../components/HeaderMain';

import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme';
import {
  alignSelf,
  backgroundColor,
  marginLeft,
  marginRight,
  paddingBottom,
  textAlign,
} from 'styled-system';
import CommanBtnScreen from '../../components/CommanBtn';
import CommonBottomSheet from '../../components/CommonBottomSheet';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import LineSeperator from '../../components/LineSeperator';

function AddPaymentMathodScreen({navigation}) {
  const renderCardInput = React.useCallback(() => {
    return (
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <View>
          <CommanText
            commanText={'Card number'}
            commanTextstyle={styles.inputLabelText}
          />
          <TextInputScreen
            defaultInput
            navigation={navigate}
            style={styles.inputStyle}
            // type={item.inputType}
            // inputStyle={styles.profileInputFocusedStyle}
          />
        </View>
        <View style={styles.flexRow}>
          <View style={{width: '45%'}}>
            <CommanText
              commanText={'Expiry Date'}
              commanTextstyle={styles.inputLabelText}
            />
            <TextInputScreen
              defaultInput
              navigation={navigate}
              style={styles.inputStyle}
              // type={item.inputType}
              // inputStyle={styles.profileInputFocusedStyle}
            />
          </View>
          <View style={{width: '45%'}}>
            <CommanText
              commanText={'CVV'}
              commanTextstyle={styles.inputLabelText}
            />
            <TextInputScreen
              defaultInput
              navigation={navigate}
              style={styles.inputStyle}
              // type={item.inputType}
              // inputStyle={styles.profileInputFocusedStyle}
            />
          </View>
        </View>
        <View>
          <CommanText
            commanText={'Zip code'}
            commanTextstyle={styles.inputLabelText}
          />
          <TextInputScreen
            defaultInput
            navigation={navigate}
            style={styles.inputStyle}
            // type={item.inputType}
            // inputStyle={styles.profileInputFocusedStyle}
          />
        </View>
        <View>
          <CommanText
            commanText={'Country/region'}
            commanTextstyle={styles.inputLabelText}
          />
          <TextInputScreen
            defaultInput
            navigation={navigate}
            style={styles.inputStyle}
            // type={item.inputType}
            // inputStyle={styles.profileInputFocusedStyle}
          />
        </View>
      </View>
    );
  }, []);

  const renderButtons = React.useCallback(() => {
    return (
      <View style={styles.buttonsContainer}>
        <CommanBtnScreen
          btnText="Cancel"
          commanBtnStyle={[
            styles.btnStyle,
            {backgroundColor: Colors.transparent},
          ]}
          commanBtnTextStyle={styles.cancelButtonTextStyle}
          onBtnPress={() => navigation.goBack()}
        />
        <CommanBtnScreen
          btnText="Done"
          commanBtnStyle={styles.btnStyle}
          onBtnPress={() => navigation.goBack()}
        />
      </View>
    );
  }, []);

  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<Icon name={'bell'} size={25} color={Colors.white} />}
        rightIconPress={() => {}}
        centerImageColor={Colors.lightWhite}
        containerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          backgroundColor: Colors.primary,
        }}
        customRightIcon={true}
        iconBgTransparent={true}
        iconColor={Colors.white}
      />
      <Content contentContainerStyle={styles.container}>
        <CommanHeading
          headingText
          heading="Payment"
          commanHeadingTextStyle={styles.headingText}
          // commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          navigation={navigate}
        />

        <CommonBottomSheet
          hideButton={true}
          snapPoints={[WINDOW_HEIGHT - 65, WINDOW_HEIGHT - 65]}>
          <CommanHeading
            headingText
            heading="Add card details"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <LineSeperator style={styles.lineSeperator} />
          {renderCardInput()}

          {renderButtons()}
        </CommonBottomSheet>
        {/* <PaymentList data={paymentOptionData.slice(0, 1)} /> */}
      </Content>
    </Container>
  );
}

export default AddPaymentMathodScreen;
