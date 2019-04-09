import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import './style.scss';

const Header = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item>
              <Link className="link-div" to="/">
                <Button variant="contained">HOME</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className="link-div" to="/cadastro">
                <Button variant="contained">CADASTRAR</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className="link-div" to="/favoritos">
                <Button variant="contained">FAVORITOS</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className="link-div" to="/promocoes">
                <Button variant="contained">PROMOÇÕES</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className="link-div" to="/comprados">
                <Button variant="contained">COMPRADOS</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
