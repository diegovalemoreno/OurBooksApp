import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
// import styles from './styles';

const Authors = () => (
  <View>
    <Header title= "Autores" />
    <Text>Autores</Text>
  </View>
);

const TabIcon = ({ tintColor }) => <Icon name="user" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};


Authors.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Authors;
