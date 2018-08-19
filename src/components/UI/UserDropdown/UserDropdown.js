import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Button, ClickAwayListener, Grow, Typography, Paper, Popper, MenuItem, MenuList, Avatar} from '@material-ui/core';

import userImage from '../../../assets/bg.png'


const styles = {
    userLabel : {
        textTransform : "initial",
        marginLeft : "10px",
        marginRight : "10px"
    },
    container : {
        backgroundColor : "#4B8CF2", 
        color : "#FFF", 
        boxShadow : "none",
        '&:hover' : {
            backgroundColor : "#5897FB"
        }
    }
}
class UserDropdown extends Component {
    state = {
        open : false
    }

    handleToggle = (event) => {
        this.setState(prev => ({ open: !prev.open }));
    }

    handleClose = (event) => {
        if (this.anchorEl.contains(event.target)) {
            return;
          }
        this.setState({open : false});
    }

    render(){
        return(
            <div className="user-dropdown t-hide-smd">
                <Button
                    size="small"
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    onClick={this.handleToggle}
                    className={this.props.classes.container}
                    variant="contained">
                    
                    <img src={userImage} className="t-user-image"/>
                    <div className={this.props.classes.userLabel}>{this.props.userName}</div>
                </Button>
                <Popper open={this.state.open} anchorEl={this.anchorEl} style={{zIndex : 2}} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList className="g-dropdown-margin">
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

export default withStyles(styles)(UserDropdown);