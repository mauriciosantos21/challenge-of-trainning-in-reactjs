import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { connect } from 'react-redux';
import Card from '../../components/card';

const Purchased = ({ comics }) => (
  <Fragment>
    <div className="card-list">
      {comics.map(comic => (
        <Card key={comic.id} comic={comic} />
      ))}
    </div>
  </Fragment>
);

Purchased.propTypes = {
  comics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  comics: state.purchased.data,
});
export default connect(mapStateToProps)(Purchased);
