import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 3000);
  }

  render() {
    const { visible } = this.state;
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/10398-plane-window.json")}
        animationStyle={styles.lottie}
        speed={2}
        loop={true}
      >
        <Text style={{fontSize:30}}>Loading...</Text>
      </AnimatedLoader>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 300
  }
});