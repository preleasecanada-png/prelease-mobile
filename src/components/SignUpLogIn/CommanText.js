import * as React from 'react';
import { Text } from 'react-native';
import styles from './Styles/index';

function CommanText({commanText, commanTextstyle}) {
  return (
    <>
      <Text style={[styles.commanText, commanTextstyle]}>
        {commanText}
      </Text>
    </>
  );
}

export default CommanText;
