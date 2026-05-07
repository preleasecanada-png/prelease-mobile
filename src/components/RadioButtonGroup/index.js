import { FlatList } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styles from "./Style";
import React from "react";



const RadioButtonGroup = ({data}) => {
    const [selectedIndex, setIndex] = React.useState(0);
    const renderItems = ({item, index}) => {
      return (
        <TouchableOpacity onPress={() => setIndex(index)} style={[styles.buttonGroupItem, selectedIndex == index && styles.activedtabButton]}>
          <Text style={[styles.radioButtonText, selectedIndex == index && styles.activeradioButtonText]}>{item?.label}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={data||[]}
          renderItem={renderItems}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={styles.radioButtonGroup}
          horizontal={true}
          showsHorizontalScrollIndicator={false}

          
  
        />
      </View>
    );
  }
  export default RadioButtonGroup;

