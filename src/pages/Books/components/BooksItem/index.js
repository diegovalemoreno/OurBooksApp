import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const BooksItem = ({ booksItem }) => (
  <View style={styles.container}>
    <Text style={styles.repoTitle}>{booksItem.title}</Text>
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <Icon name="star" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="code-fork" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="eye" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{}</Text>
      </View>
    </View>
  </View>
);
 
BooksItem.prototypes = {
  booksItem: PropTypes.shape({
    username: PropTypes.string,
    // stargazers_count: PropTypes.number,
    // forks_count: PropTypes.number,
    // watchers_count: PropTypes.number,
  }).isRequired,
};

export default BooksItem;
