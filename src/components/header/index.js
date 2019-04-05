import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item>
              <Link to="/">Main</Link>
            </Grid>
            <Grid item>
              <Link to="/cadastro">Cadastrar</Link>
            </Grid>
            <Grid item>
              <Link to="/favoritos">Favoritos</Link>
            </Grid>
            <Grid item>
              <Link to="/promocoes">Promoções</Link>
            </Grid>
            <Grid item>
              <Link to="/comprados">Comprados</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
