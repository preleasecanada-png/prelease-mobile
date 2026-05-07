import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { keyboardStatus } from '../actions/AppAction';

export const useKeyboardStatus = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up the event listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardVisibilityControl = (param) => {
    console.log("param", param)
    
    setKeyboardVisible(param)
    keyboardStatus(param)

  }

  return {isKeyboardVisible, keyboardVisibilityControl};
};
