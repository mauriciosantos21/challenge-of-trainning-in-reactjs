import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ComicsActions } from '../../store/ducks/comics';
import Card from '../../components/card';
import './style.scss';

function searchingFor(term) {
  return function (x) {
    return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}
class Main extends Component {
  static propTypes = {
    getComicsRequest: PropTypes.func.isRequired,

    comics: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  };

  state = {
    search: '',
  };

  async componentDidMount() {
    this.props.getComicsRequest();
  }

  searchHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const { search } = this.state;
    const { comics } = this.props;
    return (
      <Fragment>
        <input type="text" placeholder="Search..." onChange={this.searchHandler} />
        <div className="card-list">
          {comics.data.filter(searchingFor(search)).map(comic => (
            <Card key={comic.id} comic={comic} />
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics,
});

const mapDispatchToProps = dispatch => bindActionCreators(ComicsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
