import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import api from '../../services/api';
import styles from './styles';
import BooksItem from './components/BooksItem';
// AsyncStorage.clear();
// import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="book" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Books extends Component {
  static navigationOptions= {
    tabBarIcon: TabIcon,
  };

  state = {  
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadBooks();
  }

  loadBooks = async () => {
    this.setState({ refreshing: true });

    const email = await AsyncStorage.getItem('@Ourbooks:email');
    // const data = await api.get(`/books/user/${email}`);
    const response = await api.get(`/books/user/${email}`);

    response.data.map(async (item) => {
      this.setState({ data: item });
    });

    // console.tron.log(response.data[0].books);
    this.setState({
      refreshing: false,
      loading: false,
    });
  }

  // renderListItem = ({ item }) => <BooksItem booksItem={item} />;
  renderListItem = ({ item }) => <BooksItem booksItem={item} />

  renderList = () => {
    const { data } = this.state;
    return (
      <FlatList
        data={data.books}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadBooks}
        refreshing={this.state.refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Meus Livros" />
        {loading ? <ActivityIndicator style={styles.loading} />
          : this.renderList()}
      </View>
    );
  }
}
