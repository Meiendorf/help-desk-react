import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import UserDropdown from '../UserDropdown/UserDropdown'
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown';

import './Toolbar.css'

const styles = {
    tAppBar : {
        backgroundColor : "#2196F3"
    }
}

class MainToolbar extends Component{

    

    render(){
        return(
            <div className='main-toolbar'>
                <AppBar className={this.props.classes.tAppBar} position="static">
                <Toolbar>
                    <IconButton color="inherit" className="t-menu-but" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        Help Desk
                    </Typography>
                    <div style={{marginLeft : "auto"}}>
                        <NotificationsDropdown/>
                        <UserDropdown userName="Рома Мельник"/>
                    </div>
                </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MainToolbar);