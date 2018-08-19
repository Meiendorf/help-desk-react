import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {IconButton, ClickAwayListener, Grow, List, ListItem, ListItemAvatar, ListItemText, Paper, Popper, Avatar} from '@material-ui/core';
import windowSize from 'react-window-size';

const styles = {
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
        let placement = this.props.windowWidth > 800 ? "bottom-end" : "left";
        // console.log(this.props.windowWidth);
        return(
            <div className="notifications-dropdown">
                <IconButton
                    size="small"
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    onClick={this.handleToggle}
                    style={{color : "#FFF"}}>
                    <i className="material-icons">
                        notifications
                    </i>
                </IconButton>
                <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal
                    placement={placement}
                    style={{zIndex : 2}}
                    modifiers={{
                        preventOverflow:{
                            enabled : true,
                            boundariesElement : 'window'
                        }
                    }}>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                    <i className="material-icons">
                                        notifications
                                    </i>
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Single-line item"
                                    secondary="Secondary text"
                                    />
                                </ListItem>
                            </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

export default windowSize(withStyles(styles)(UserDropdown));