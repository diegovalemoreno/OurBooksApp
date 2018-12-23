import React from 'react';

import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const BooksCoverItem = ({ booksCoverItem }) => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{ uri: `${booksCoverItem.book_cover_url} ` }} />
    <Text style={styles.title}>{ booksCoverItem.title }</Text>            
  </View>
);

BooksCoverItem.prototypes = {
    booksCoverItem: PropTypes.shape({
        book_cover_url: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
  };

  export default BooksCoverItem;
