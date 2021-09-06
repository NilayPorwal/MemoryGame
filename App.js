import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

import Card from './src/components/Button';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    let cards = [
      {
        text: '1',
      },
      {
        text: '2',
      },
      {
        text: '3',
      },
      {
        text: '4',
      },
      {
        text: '5',
      },
      {
        text: '6',
      },
      {
        text: '7',
      },
      {
        text: '8',
      },
    ];

    let clone = JSON.parse(JSON.stringify(cards));
    this.cards = cards.concat(clone);

    this.cards.map(obj => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.text = obj.text;
      obj.isOpen = false;
    });

    this.shuffleArray(this.cards);

    this.state = {
      cards: this.cards,
      current_selection: [],
      selected_pairs: [],
      score: 0,
      mistake: 0,
    };
  }

  //Diziyi karıştıran fonksiyon
  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          text={card.text}
          isOpen={card.isOpen}
          clickCard={this.clickCard.bind(this, card.id)}
        />
      );
    });
  }

  renderRows() {
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          {this.renderCards(cards)}
        </View>
      );
    });
  }

  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach(item => {
      count += 1;
      contents.push(item);
      if (count == 4) {
        contents_r.push(contents);
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;
    let mistake = this.state.mistake;

    let index = this.state.cards.findIndex(card => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if (
      cards[index].isOpen == false &&
      selected_pairs.indexOf(cards[index].text) === -1
    ) {
      cards[index].isOpen = true;
      current_selection.push({
        index: index,
        text: cards[index].text,
      });

      if (current_selection.length == 2) {
        if (current_selection[0].text == current_selection[1].text) {
          score++;
          selected_pairs.push(cards[index].text);
        } else {
          mistake++;
          this.match(
            cards,
            cards[current_selection[0].index],
            cards[current_selection[1].index],
          );
        }
        current_selection = [];
      }

      this.setState({
        score: score,
        mistake: mistake,
        cards: cards,
        current_selection: current_selection,
      });
    }
  }

  match(cards, k1, k2) {
    setTimeout(() => {
      k1.isOpen = false;
      k2.isOpen = false;

      this.setState({
        cards: cards,
      });
    }, 700);
  }

  resetCards() {
    let cards = this.cards.map(obj => {
      obj.isOpen = false;
      return obj;
    });

    cards = this.shuffleArray(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
      mistake: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Memory Game</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subText}>Matches: {this.state.score}</Text>
            <Text style={styles.subText}>Turns: {this.state.mistake}</Text>
          </View>
        </View>
        <View style={styles.gameArea}>{this.renderRows.call(this)}</View>
        <Button onPress={this.resetCards} title="Reset" color="#008CFA" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1c313a',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  subText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  gameArea: {
    flex: 5,
    padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
};
