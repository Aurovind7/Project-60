import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state={
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    }
    var class_ref=async()=>{await db.ref("/").on("value",data=>{
      var all_students=[]
      var class_a=data.val().class_A;
      for (var i in class_a){
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a,b){
        return a.roll_no-b.roll_no;
      })
    })}
  }

  componentDidMount = async() => {
    var class_ref =await db.ref('/').on('value', data => {
      var all_students =  []
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

goToSummary = ()=>{
    this.props.navigation.navigate('SummaryScreen')
  }
  
render(){
  var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Student Found</Text>
        </View>
      );
    } else{
   return (
        <View style={styles.container}>
          
          <View style={{ flex: 3 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                  <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold',marginRight: 10 }}>
                    {student.roll_no}.
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight:'bold' }}>{student.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: 'green' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button1: {
    backgroundColor: 'green',
    padding: 0,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 30,
    marginTop: -35,
    marginLeft: 40,
    fontFamily: 'garamound',
    width: 90,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'red',
    padding: 0,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 30,
    marginTop: -50,
    marginLeft: 230,
    fontFamily: 'garamound',
    width: 90,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Times New Roman',
    fontWeight:"bold",
    fontSize: 20,
    marginTop: 50,
    marginLeft:15,
  },
  button1Text:{
    fontFamily:"Times New Roman",
    color:"yellow",
    fontSize:20,
    fontWeight:"bold"
  },
  button2Text:{
    fontFamily:"Times New Roman",
    color:"yellow",
    fontSize:20,
    fontWeight:"bold"
  }
});
