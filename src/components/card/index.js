import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Creators as FavoritesActions } from '../../store/ducks/favorites';
import { Creators as PromotionsActions } from '../../store/ducks/promotions';
import { Creators as PurchasedActions } from '../../store/ducks/purchased';

import './style.scss';

class CardComic extends Component {
  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
  };

  addToFavorite = (comic) => {
    this.props.addFavorite(comic);
  };

  addToPromotion = (comic) => {
    this.props.addPromotion(comic);
  };

  addToPurchased = (comic) => {
    this.props.addPurchased(comic);
  };

  render() {
    return (
      <Card className="card">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.comic.title}
            </Typography>
            <Typography component="p">{this.props.comic.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => this.addToFavorite(this.props.comic)}>
            Favoritos
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.addToPromotion(this.props.comic)}
          >
            Promoção
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.addToPurchased(this.props.comic)}
          >
            Comprados
          </Button>
        </CardActions>
      </Card>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, FavoritesActions, PromotionsActions, PurchasedActions),
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(CardComic);
