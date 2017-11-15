
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Radar } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class Charts extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Radar - Basic`,
  });
  
  onLabelPress = (label, value) => {
    alert(label + ':' + value);
  }
  
  render() {
    const {repos} = this.props
    console.log("repos",repos)
    let obj={}
    for (let i=0;i<7;i++) {
      obj[repos[i].name]=repos[i].size
    }
    console.log("obj",obj)
    let data = [obj]
    
    let options = {
      width: 290,
      height: 290,
      margin: {
        top: 20,
        left: 20,
        right: 30,
        bottom: 20
      },
      r: 150,
      max: 100,
      fill: "#2980B9",
      stroke: "#2980B9",
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E',
        onLabelPress: this.onLabelPress
      }
    }
    
    return (
      <View style={styles.container}>
        <Radar data={data} options={options} />
      </View>
    )
  }
}

export default Charts