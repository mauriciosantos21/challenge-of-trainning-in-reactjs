import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import BookMarkIcon from '@material-ui/icons/BookmarkBorder';
import MoneyOff from '@material-ui/icons/MoneyOffOutlined';

import Tooltip from '@material-ui/core/Tooltip';
import { CardActionArea, CardMedia, Snackbar } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { Creators as FavoritesActions } from '../../store/ducks/favorites';
import { Creators as PromotionsActions } from '../../store/ducks/promotions';
import { Creators as PurchasedActions } from '../../store/ducks/purchased';

import './style.scss';

class CardComic extends Component {
  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
    addPromotion: PropTypes.func.isRequired,
    addPurchased: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    removePurchased: PropTypes.func.isRequired,
    removePromotion: PropTypes.func.isRequired,
    comic: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
    purchased: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
    promotions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    open: false,
    openCard: false,
    msg: '',
  };

  addToFavorite = (comic) => {
    const { addFavorite } = this.props;
    addFavorite(comic);
    this.setState({ open: true, msg: 'Quadrinho adicionado aos favoritos!' });
  };

  addToPromotion = (comic) => {
    const { addPromotion } = this.props;
    addPromotion(comic);
    this.setState({ open: true, msg: 'Quadrinho adicionado a promoções!' });
  };

  addToPurchased = (comic) => {
    const { addPurchased } = this.props;
    addPurchased(comic);
    this.setState({ open: true, msg: 'Quadrinho adicionado a lista de comprados!' });
  };

  removeToPromotion = (comic) => {
    const { removePromotion } = this.props;
    removePromotion(comic);
    this.setState({ open: true, msg: 'Quadrinho removido das promoções!' });
  };

  removeToPurchased = (comic) => {
    const { removePurchased } = this.props;
    removePurchased(comic);
    this.setState({ open: true, msg: 'Quadrinho removido de comprados!' });
  };

  removeToFavorite = (comic) => {
    const { removeFavorite } = this.props;
    removeFavorite(comic);
    this.setState({ open: true, msg: 'Quadrinho removido de favoritos!' });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenCard = () => {
    this.setState({ openCard: true });
  };

  handleCloseCard = () => {
    this.setState({ openCard: false });
  };

  verifyInState = (comic, comics) => comics.find(item => item.id === comic.id);

  render() {
    const { open, msg, openCard } = this.state;
    const {
      comic, favorites, purchased, promotions,
    } = this.props;
    return (
      <Fragment>
        <Card className="card">
          <CardActionArea className="action-area" onClick={() => this.handleOpenCard()}>
            <CardMedia
              className="media"
              image={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
              title="Contemplative Reptile"
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="h5">
                {comic.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className="actions-div">
            <Tooltip title="Add aos Favoritos">
              <IconButton
                onClick={() => (this.verifyInState(comic, favorites)
                  ? this.removeToFavorite(comic)
                  : this.addToFavorite(comic))
                }
              >
                {this.verifyInState(comic, favorites) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Add as Promoções">
              <IconButton
                onClick={() => (this.verifyInState(comic, promotions)
                  ? this.removeToPromotion(comic)
                  : this.addToPromotion(comic))
                }
              >
                {this.verifyInState(comic, promotions) ? (
                  <MoneyOff className="promotion-icon" />
                ) : (
                  <MoneyOff />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Add aos Comprados">
              <IconButton
                onClick={() => (this.verifyInState(comic, purchased)
                  ? this.removeToPurchased(comic)
                  : this.addToPurchased(comic))
                }
              >
                {this.verifyInState(comic, purchased) ? (
                  <BookMarkIcon color="primary" />
                ) : (
                  <BookMarkIcon />
                )}
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>

        <Dialog
          open={openCard}
          onClose={this.handleCloseCard}
          aria-labelledby="simple-dialog-title"
        >
          <Card className="card-dialog">
            <CardMedia
              className="img-card-dialog"
              image={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
              title="Contemplative Reptile"
            />
            <CardContent className="card-content-dialog">
              <Typography gutterBottom variant="h5" component="h5" className="title-dialog">
                {comic.title}
              </Typography>
              <Typography component="p">{comic.description}</Typography>
            </CardContent>
          </Card>
        </Dialog>
        <Snackbar
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{msg}</span>}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, FavoritesActions, PromotionsActions, PurchasedActions),
  dispatch,
);

const mapStateToProps = state => ({
  favorites: state.favorites.data,
  purchased: state.purchased.data,
  promotions: state.promotions.data,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardComic);
