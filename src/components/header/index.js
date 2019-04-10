import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  ClickAwayListener,
  IconButton,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Dialog,
  DialogActions,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Register from '../../pages/register';
import './style.scss';
import logoMarvel from '../../assets/react-marvel.png';

class Header extends Component {
  state = {
    open: false,
    openForm: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleOpenForm = () => {
    this.setState({ openForm: true });
  };

  handleCloseForm = () => {
    this.setState({ openForm: false });
  };

  render() {
    const { open, openForm } = this.state;
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={16}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      aria-owns={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle}
                      buttonRef={(node) => {
                        this.anchorEl = node;
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <div>
                      <img className="logo" src={logoMarvel} alt="logo-marvel" />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className="icon-button"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <Link to="/" className="link-div">
                      <MenuItem onClick={this.handleClose}>Home</MenuItem>
                    </Link>
                    <Link to="/favoritos" className="link-div">
                      <MenuItem onClick={this.handleClose}>Favoritos</MenuItem>
                    </Link>
                    <Link to="/promocoes" className="link-div">
                      <MenuItem onClick={this.handleClose}>Promoções</MenuItem>
                    </Link>
                    <Link to="/comprados" className="link-div">
                      <MenuItem onClick={this.handleClose}>Comprados</MenuItem>
                    </Link>
                    <MenuItem onClick={this.handleOpenForm}>Cadastrar</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Dialog
          open={openForm}
          onClose={this.handleCloseForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Register />
          <DialogActions>
            <Button onClick={this.handleCloseForm} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Header;
