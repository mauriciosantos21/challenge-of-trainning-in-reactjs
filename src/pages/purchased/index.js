import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import './style.scss';
import { connect } from 'react-redux';
import Card from '../../components/card';

function searchingFor(term) {
  return x => x.title.toLowerCase().includes(term.toLowerCase()) || !term;
}

class Purchased extends Component {
  static propTypes = {
    comics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    search: '',
  };

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
        <div className="search-div">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            onChange={this.searchHandler}
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="card-list">
          {comics.filter(searchingFor(search)).map(comic => (
            <Card key={comic.id} comic={comic} />
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.purchased.data,
});

export default connect(mapStateToProps)(Purchased);
