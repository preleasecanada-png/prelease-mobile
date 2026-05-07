import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TextStyle } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { Colors } from '../../theme';

const RANGE = 24;
const initialDate = '2022-07-05';
const nextWeekDate = '2022-07-14';
const nextMonthDate = '2022-08-05';

// interface Props {
//   horizontalView?: boolean;
// }

const CalendarInput = ({markingType = "period"}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <CalendarList
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: Colors.primary,
            selectedTextColor: 'white',
          },
        }}
        onDayPress={onDayPress}
        markingType={'custom'}
      />
      {/* <Text style={styles.selectedDateText}>
        Selected Date: {selectedDate || 'None'}
      </Text> */}
    </View>

  );
};

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#5E60CE',
    paddingRight: 5
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default CalendarInput;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  month: {
    marginLeft: 5
  },
  year: {
    marginRight: 5
  }
});