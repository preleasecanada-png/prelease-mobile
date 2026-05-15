import * as React from 'react';
import {FlatList, TouchableOpacity, Image, View, Text} from 'react-native';
import styles from './Styles/Index';
import {RadioButton} from 'react-native-paper';
import {Colors} from '../../theme';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

function PaymentList(props) {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.paymentOptionListBtn,
        item?.isSelected && styles.activeStyle,
      ]}>
      <Image
        source={item.icon}
        resizeMode="contain"
        style={styles.paymentOptionCardImg}
      />
      <View>
        <Text style={styles.paymentOptionName}>
          {`${item.type} endinig in ${'4242'}`}
        </Text>
        <Text style={styles.paymentOptionSubName}>
          Expiry {item.expiryDate}
        </Text>
        {/* {index === props.paymentOptionSubText && (
          <Text style={styles.paymentOptionSubName}>{item.subName}</Text>
        )} */}
      </View>
      {/* <Image
        source={item.rightArrow}
        resizeMode="contain"
        style={styles.paymentOptionRightArrowImg}
      /> */}

      <View
        style={{
          marginLeft: 'auto',
        }}>
        <RadioButton
          value={item?.isSelected}
          color={Colors.green}
          status={item?.isSelected ? 'checked' : 'unchecked'}
          // onPress={() => setChecked('first')}
        />
      </View>
    </TouchableOpacity>
  );

  const addNewPayment = () => {
    const onPress = () => {
      navigation.navigate('AddPaymentMathod');
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.paymentOptionListBtn, styles.center]}>
        <Icon name="pluscircleo" size={20} color={Colors.primary} />
        <Text style={styles.addNewPaymentButtonTextStyle}>Add New Payment</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={item => item.id}
      />

      {addNewPayment()}
    </>
  );
}

export default PaymentList;
