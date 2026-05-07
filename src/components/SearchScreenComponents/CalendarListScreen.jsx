import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TextStyle } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { Colors } from '../../theme';

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
    TIMELINE_CALENDAR: 'timeline_calendar_btn',
    PLAYGROUND: 'playground_btn'
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar'
  },
  calendarList: { CONTAINER: 'calendarList' },
  horizontalList: { CONTAINER: 'horizontalList' },
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item'
  },
  expandableCalendar: { CONTAINER: 'expandableCalendar' },
  weekCalendar: { CONTAINER: 'weekCalendar' }
};

const RANGE = 24;
const initialDate = '2022-07-05';
const nextWeekDate = '2022-07-14';
const nextMonthDate = '2022-08-05';

// interface Props {
//   horizontalView?: boolean;
// }

const CalendarListScreen = ({markingType = "period"}) => {
  const [selected, setSelected] = useState(initialDate);
  const [markedDates, setMarkedDates] = useState({});

  // Function to handle selecting start and end dates for a period
  const handleDayPress = (day) => {
    const { dateString } = day;

    // Check if the date is already selected
    if (markedDates[dateString]) {
      // If already selected, remove the marking
      const updatedMarkedDates = { ...markedDates };
      delete updatedMarkedDates[dateString];

      // Reset marking if start or end date is deselected
      setMarkedDates(updatedMarkedDates);
    } else {
      // If no dates are marked, start a new period
      if (Object.keys(markedDates).length === 0) {
        setMarkedDates({
          [dateString]: { startingDay: true, color: Colors.primary, textColor: 'white' }
        });
      } else if (Object.keys(markedDates).length === 1) {
        // If only one date is marked, mark as the end of the period
        const [startDate] = Object.keys(markedDates);

        // Make sure the selected end date is after the start date
        if (new Date(dateString) > new Date(startDate)) {
          const range = createPeriodRange(startDate, dateString);
          setMarkedDates(range);
        } else {
          // If not, reset marking
          setMarkedDates({
            [dateString]: { startingDay: true, color: Colors.primary, textColor: 'white', }
          });
        }
      } else {
        // Reset period marking if more than one date is already marked
        setMarkedDates({
          [dateString]: { startingDay: true, color: Colors.primary, textColor: 'white' }
        });
      }
    }
  };

  // Helper function to create a range of dates for a period
  const createPeriodRange = (start, end) => {
    let dates = {};
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString === start || dateString === end) {
        dates[dateString] = {
          color: Colors.primary,
          textColor: 'white',
          startingDay: dateString === start,
          endingDay: dateString === end,
        };
      } else {

        dates[dateString] = {
          color: Colors.primaryOpacity,
          textColor: Colors.black,
        };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <CalendarList
      horizontal={false}
      pagingEnabled
      pastScrollRange={12}
      futureScrollRange={12}
      markingType={markingType}
      markedDates={markedDates}
      onDayPress={handleDayPress}
      style={{
        // borderWidth: 1,
        // borderColor: 'gray',
        // height: 350
        // width: '85%',
      }}
      headerStyle={{
        width: '100%',
        backgroundColor: 'red',

      }}

      theme={{
        
        // monthTextColor: 'white',
      }}
    />
    </View>

  );
};

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#000'
        }
      }
    }
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800'
    }
  }
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

export default CalendarListScreen;

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