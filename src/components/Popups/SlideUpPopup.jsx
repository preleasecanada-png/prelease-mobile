// SlideUpPopup.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Modal, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme';

const { height: screenHeight } = Dimensions.get('window');

const SlideUpPopup = ({ visible, onClose, children }) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Start off-screen

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: screenHeight * 0.1, // 80% of the screen height (20% from bottom)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible]);

  return (
    <Modal
      transparent

      visible={modalVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContent, {
          transform: [{ translateY: slideAnim }],
          height: screenHeight
        }]}>
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: Colors.opacityBlack,

  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
    // padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SlideUpPopup;
