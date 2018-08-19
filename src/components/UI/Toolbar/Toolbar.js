import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, Hidden, Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import UserDropdown from '../UserDropdown/UserDropdown';
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

import './Toolbar.css';

const styles = {
    tAppBar : {
        backgroundColor : "#2196F3",
        zIndex : "1205"
    }
}

class MainToolbar extends Component{

    render(){
        return(
            <div className='main-toolbar'>
                <AppBar className={this.props.classes.tAppBar} position="static">
                <Toolbar style={{backgroundColor : "#2277EF"}}>
                    <Hidden lgUp>
                        <IconButton 
                            onClick={this.props.toggleSlider} 
                            color="inherit" 
                            className="t-menu-but" 
                            aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography className="t-hide-smd" variant="title" color="inherit">
                        Help Desk
                    </Typography>
                    <HeaderSearch/>
                    <Grid container spacing={8} className="t-right-compns">
                        <Grid item>
                            <NotificationsDropdown/>
                        </Grid>
                        <Grid item className="t-full-center">
                            <UserDropdown userName="Рома Мельник"/>
                        </Grid>
                    </Grid>
                    
                </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MainToolbar);