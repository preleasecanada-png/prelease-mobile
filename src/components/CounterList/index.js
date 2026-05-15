import * as React from 'react';
import {useState} from 'react';
import {TouchableOpacity, Text, View, Image, FlatList} from 'react-native';
import {facilitiesCounterList} from '../../assets/data';
import styles from './Styles/Index';
import {FeatherIcon} from '../../theme/icons';

function CounterList({data = facilitiesCounterList}) {
  const [badRoomCount, setBadRoomCount] = useState(0);
  const [bathRoomCount, setBathRoomCount] = useState(0);

  const handleIncrementBedRoom = () => {
    setBadRoomCount(prevCount => prevCount + 1);
  };

  const handleDecrementBedRoom = () => {
    if (badRoomCount <= 0) {
      setBadRoomCount(0);
    } else if (badRoomCount >= 0) {
      setBadRoomCount(prevCount => prevCount - 1);
    }
  };

  const handleIncrementBathRoom = () => {
    setBathRoomCount(prevCount => prevCount + 1);
  };

  const handleDecrementBathRoom = () => {
    if (bathRoomCount <= 0) {
      setBathRoomCount(0);
    } else if (bathRoomCount >= 0) {
      setBathRoomCount(prevCount => prevCount - 1);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.facilitiCounterRow}>
      <View style={styles.textContainer}>
        <Text style={styles.facilitiCounterHeading}>{item.text}</Text>
        <Text style={styles.facilitiCounterDesc}>{item.desc}</Text>
      </View>
      <View style={styles.facilitiCounterBtnsTextRow}>
        <TouchableOpacity
          style={styles.facilitiCounterPresable}
          onPress={() => {
            if (index === 0) {
              handleDecrementBedRoom();
            }
            if (index === 1) {
              handleDecrementBathRoom();
            }
          }}>
          <FeatherIcon name="minus" size={18} />
          {/* <Image
            source={item.minasImage}
            resizeMode="contain"
            style={styles.facilitiCounterPluseMinsaIcon}
          /> */}
        </TouchableOpacity>
        <Text style={styles.facilitiCounterText}>
          {index === 0 ? badRoomCount : bathRoomCount}
        </Text>
        <TouchableOpacity
          style={[styles.facilitiCounterPresable, styles.incrementStyle]}
          onPress={() => {
            if (index === 0) {
              handleIncrementBedRoom();
            }
            if (index === 1) {
              handleIncrementBathRoom();
            }
          }}>
          <FeatherIcon name="plus" size={18} />
          {/* <Image
            source={item.pluseImage}
            resizeMode="contain"
            style={styles.facilitiCounterPluseMinsaIcon}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.facilitiCounterContainer}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </>
  );
}

export default CounterList;
