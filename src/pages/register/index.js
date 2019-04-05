import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FavoritesActions } from '../../store/ducks/favorites';
import { Creators as PromotionsActions } from '../../store/ducks/promotions';
import { Creators as PurchasedActions } from '../../store/ducks/purchased';
import { Creators as ComicsActions } from '../../store/ducks/comics';

class Register extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    status: '',
  };

  dataResult = () => {
    const comicData = {
      id: Math.random(),
      title: this.state.title,
      description: this.state.description,
    };
    return comicData;
  };

  addComic = (event) => {
    event.preventDefault();
    const data = this.dataResult();
    if (this.state.status === 'comprados') {
      this.props.addComic(data);
      this.props.addPurchased(data);
    } else if (this.state.status === 'favoritos') {
      this.props.addComic(data);
      this.props.addFavorite(data);
    } else if (this.state.status === 'promocao') {
      this.props.addComic(data);
      this.props.addPromotion(data);
    } else {
      this.props.addComic(data);
    }
  };

  render() {
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
          <FormControl>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              value={this.state.status}
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

          <Button type="submit" fullWidth variant="contained" color="primary">
            Salvar
          </Button>
        </form>
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
