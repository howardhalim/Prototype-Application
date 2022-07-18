import React, { Component } from "react";
import { StyleSheet, View , Dimensions , Text} from "react-native";
import CupertinoHeaderWithBackground from "../components/CupertinoHeaderWithBackground";
import CupertinoFooter2 from "../components/CupertinoFooter2";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Untitled(props) {
  return (
    <View style={styles.container}>
      <CupertinoHeaderWithBackground
        style={styles.cupertinoHeaderWithBackground}
      ></CupertinoHeaderWithBackground>
      <View style={{ flex: 1 }}>
        <Text> halo</Text>
        <Text> halo</Text>
        <Text> halo</Text>

      </View>
      <CupertinoFooter2 style={styles.cupertinoFooter2}></CupertinoFooter2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  cupertinoHeaderWithBackground: {
    height: 44,
    width: windowWidth,
  },
  cupertinoFooter2: {
    height: 50,
    width: windowWidth,
    bottom : 0
  }
});

export default Untitled;
