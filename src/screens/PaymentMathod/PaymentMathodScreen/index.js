import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../../components';
import {paymentOptionData} from '../../../assets/data';
import CommanHeading from '../../../components/CommanHeading';
import CommanBtn from '../../../components/CommanBtn';
import PaymentList from '../../../components/PaymentList';
import {navigate} from '../../../navigation/ReduxNavigation';
import styles from './Styles/PaymentMathodStyle';
import HeaderMain from '../../../components/HeaderMain';
import {Colors} from '../../../theme';
import {FeatherIcon} from '../../../theme/icons';
import TextInputScreen from '../../../components/SignUpLogIn/TextInput';
import {TouchableOpacity} from 'react-native';
import CommanText from '../../../components/SignUpLogIn/CommanText';

function PaymentMathodScreen({navigation, route}) {
  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <CommanBtn
          btnText="Cancel"
          commanBtnStyle={[
            styles.btnStyle,
            {backgroundColor: Colors.transparent, width: 90},
          ]}
          commanBtnTextStyle={styles.cancelButtonTextStyle}
          onBtnPress={() => navigation.goBack()}
        />
        {/* <TouchableOpacity style={[styles.btnStyle, styles.flexRow, styles.btnStyle2]}>
                <FeatherIcon name='search' size={18} color={Colors.white} />
                <Text style={styles.commanBtnText}>Next</Text>
            </TouchableOpacity> */}
        <CommanBtn
          btnText="Done"
          commanBtnStyle={styles.addPaymentBtn}
          onBtnPress={() => navigation.navigate('BookNow', {...route.params})}
        />
      </View>
    );
  };
  return (
    <Container>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<FeatherIcon name={'bell'} size={25} color={Colors.black} />}
        rightIconPress={() => {}}
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
        <View style={{justifyContent: 'center'}}>
          {/* <PaymentList data={paymentOptionData.slice(2, 6)} /> */}
          <CommanText
            commanText="Enter your account number "
            commanTextstyle={styles.labelStyle}
          />
          <TextInputScreen defaultInput />
          {renderButtons()}
        </View>
      </Content>
    </Container>
  );
}

export default PaymentMathodScreen;
