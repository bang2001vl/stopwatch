/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, type PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

type MyProps = {

};

type MyState = {
  timeElapsed: number,
  running: boolean,
  startTime: Date,
  laps: number[],
};

class App extends React.Component<MyProps, MyState>{
  interval: any;

  constructor(props: MyProps) {
    super(props);
    this.state = {
      timeElapsed: 0,
      running: false,
      startTime: new Date(),
      laps: [],
    }
    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleStopPress = this.handleStopPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
  }

  handleStartPress(event: GestureResponderEvent) {
    this.setState({ 
      startTime: new Date(),
      laps: [],
     });

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date().getTime() - this.state.startTime.getTime(),
        running: true,
      })
    }, 30)
  }

  handleStopPress(event: GestureResponderEvent) {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ 
        running: false,
       });
    }
  }

  handleLapPress(event: GestureResponderEvent) {
    let lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]),
    });
  }

  startStopButton() {
    let text = this.state.running ? "Stop" : "Start";
    let style = this.state.running ? styles.buttonStop : styles.buttonStart;
    let onPress = this.state.running ? this.handleStopPress : this.handleStartPress;

    return <TouchableHighlight style={[styles.button, style]} underlayColor="gray" onPress={onPress}>
      <Text>{text}</Text>
    </TouchableHighlight>
  }

  render(): React.ReactNode {
    return <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timmer}>{formatTime(this.state.timeElapsed)}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.button} underlayColor="gray" onPress={this.handleLapPress}>
            <Text>Lap</Text>
          </TouchableHighlight>
          {this.startStopButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.state.laps.map((lap, index) => {
          return <View style={styles.lap}>
            <Text key={index} style={styles.lapText}>Lap #{index + 1}</Text><Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        })}
      </View>

      {/* <ScrollView style={styles.footer}>
        {this.state.laps.map((lap, index) => {
          return <View style={styles.lap}>
            <Text key={index} style={styles.lapText}>Lap #{index + 1}</Text><Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        })}
      </ScrollView> */}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timeWrapper: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonStart: {
    borderColor: "green",
  },
  buttonStop: {
    borderColor: "red",
  },
  lap: {
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  timmer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  }
});

export default App;
