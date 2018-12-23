import React from 'react';

import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const BooksItem = ({ booksItem }) => (
  <View style={styles.container}>
    <Text style={styles.repoTitle}>{`Título: ${booksItem.title} \n${booksItem.description}`}</Text>
    
    <View style={styles.infoContainer}>
      {/* <View style={styles.info}>
        <Image  style={{width: 50, height: 50}} 
          source={{ uri: `${booksItem.book_cover_url} `}}
        />
      </View> */}
      <View style={styles.infoContainer}>
        <Icon name="star" size={15} style={styles.infoIcon} />
        <Text style={styles.infoText}>{booksItem.pagecount}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="eye" size={15} style={styles.infoIcon} />
        <Text style={styles.infoText}>{booksItem.point}</Text>
      </View>
    </View>
  </View>
);

BooksItem.prototypes = {
  booksItem: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    pagecount: PropTypes.number,
    point: PropTypes.number,
    // stargazers_count: PropTypes.number,
    // forks_count: PropTypes.number,
    // watchers_count: PropTypes.number,
  }).isRequired,
};

export default BooksItem;
