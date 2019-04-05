import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../../components/card';
import { Creators as FavoritesActions } from '../../store/ducks/favorites';

const Favorites = ({ comics }) => (
  <Fragment>
    <div className="card-list">
      {comics.map(comic => (
        <Card key={comic.id} comic={comic} />
      ))}
    </div>
  </Fragment>
);

Favorites.propTypes = {
  comics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  comics: state.favorites.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoritesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
