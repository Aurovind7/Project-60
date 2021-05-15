import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>School Attendance</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: 'yellow',
  },
  text:{
    color: 'red',
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:"garamound"
  }
});

export default AppHeader;