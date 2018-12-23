import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import styles from './styles';
import api from '../../services/api';
import BooksCoverItem from './BooksCoverItem';

const TabIcon = ({ tintColor }) => <Icon name="user" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class BooksCover extends Component {
  static navigationOptions= {
    tabBarIcon: TabIcon,
  };

  state = {  
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadBooksCover();
  }

  loadBooksCover = async () => {
    this.setState({ refreshing: true });

    const email = await AsyncStorage.getItem('@Ourbooks:email');
    // const data = await api.get(`/books/user/${email}`);
    const response = await api.get(`/books/user/${email}`);

    response.data.map(async (item) => {
      this.setState({ data: item });
    });

    this.setState({
      refreshing: false,
      loading: false,
    });
  }

  // renderListItem = ({ item }) => <BooksItem booksItem={item} />;
  renderListItem = ({ item }) => <BooksCoverItem booksCoverItem={item} />

  renderList = () => {
    const { data } = this.state;
    return (
      <FlatList
        data={data.books}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadBooksCover}
        numColumns= {2}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={this.state.refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Capa dos Livros " />
        {loading ? <ActivityIndicator style={styles.loading} />
          : this.renderList()}
      </View>
    );
  }
}
