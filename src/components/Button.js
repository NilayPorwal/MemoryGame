import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.cardBackground = this.cardBackground.bind(this);
  }

  cardBackground(id) {
    if (id % 8 == 0) {
      return 'A';
    }
    if (id % 8 == 1) {
      return 'B';
    }
    if (id % 8 == 2) {
      return 'C';
    }
    if (id % 8 == 3) {
      return 'D';
    }
    if (id % 8 == 4) {
      return 'E';
    }
    if (id % 8 == 5) {
      return 'F';
    }
    if (id % 8 == 6) {
      return 'G';
    }
    if (id % 8 == 7) {
      return 'H';
    } else {
      return '?';
    }
  }

  render() {
    let text = '?';

    if (this.props.isOpen) {
      text = this.cardBackground(this.props.text);
    }

    return (
      <TouchableOpacity onPress={this.props.clickCard} style={styles.btn}>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
  },
  card: {
    width: 50,
    height: 50,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
};

export default Button;
