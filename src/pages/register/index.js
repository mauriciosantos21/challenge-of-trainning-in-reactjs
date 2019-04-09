import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FavoritesActions } from '../../store/ducks/favorites';
import { Creators as PromotionsActions } from '../../store/ducks/promotions';
import { Creators as PurchasedActions } from '../../store/ducks/purchased';
import { Creators as ComicsActions } from '../../store/ducks/comics';

class Register extends Component {
  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
    addPromotion: PropTypes.func.isRequired,
    addPurchased: PropTypes.func.isRequired,
    addComic: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    description: '',
    status: '',
    open: false,
  };

  dataResult = () => {
    const { title, description } = this.state;
    const comicData = {
      id: Math.random(),
      title,
      description,
    };
    return comicData;
  };

  addComic = (event) => {
    const { status } = this.state;
    const {
      addComic, addPurchased, addPromotion, addFavorite,
    } = this.props;
    event.preventDefault();
    const data = this.dataResult();
    if (status === 'comprados') {
      addComic(data);
      addPurchased(data);
    } else if (status === 'favoritos') {
      addComic(data);
      addFavorite(data);
    } else if (status === 'promocao') {
      addComic(data);
      addPromotion(data);
    } else {
      addComic(data);
    }

    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, status } = this.state;
    return (
      <div className="container-register">
        <form className="form-register" onSubmit={this.addComic}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="titulo">Título</InputLabel>
            <Input
              id="titulo"
              name="titulo"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="descrição">Descrição</InputLabel>
            <Input
              id="descrição"
              name="descrição"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormControl>
          <FormControl className="select-status">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              value={status}
              inputProps={{
                name: 'status',
                id: 'status',
              }}
              onChange={e => this.setState({ status: e.target.value })}
            >
              <MenuItem value="" />
              <MenuItem value="comprados">Comprados</MenuItem>
              <MenuItem value="favoritos">Favoritos</MenuItem>
              <MenuItem value="promocao">Promoção</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="salvar-button">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Salvar
            </Button>
          </FormControl>
        </form>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Adicionado com Sucesso</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, FavoritesActions, PromotionsActions, PurchasedActions, ComicsActions),
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(Register);
