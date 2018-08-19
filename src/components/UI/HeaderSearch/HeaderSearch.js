import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {ClickAwayListener, Fade, Avatar, Paper, Popper, 
        ListItem, List, ListItemText, ListItemAvatar} from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
 


import './HeaderSearch.css';
import Auxi from '../../../hoc/Auxi';

class SearchBar extends Component {
    state = {
        open : false
    }

    handleToggle = () => {
        this.setState(prev => {open : !prev.open});
    }
    handleClose = (event) =>{
        if (this.anchorEl.contains(event.target)) {
            return;
          }
        this.setState({open : false});
    }
    handleChange = (event) => {
        let value = event.target.value;
        this.anchorEl = event.target;
        this.setState({open : !(value === "" || value == null)});
    }
    render(){
        return(
            <Auxi>
                <Paper ref={ref => this.seachPaper = ReactDOM.findDOMNode(ref)} className="t-search-paper">
                    <i className="material-icons t-search-icon">
                        search
                    </i>
                    <input 
                        onChange={this.handleChange} 
                        type="text" 
                        className="t-search-input"/>
                    <Popper 
                        className="t-search-popper" 
                        disablePortal 
                        style={{zIndex : 1}}
                        open={this.state.open} 
                        anchorEl={this.seachPaper} 
                        transition>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={250}>
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <List className="t-search-list" dense={true}>
                                        <ListItem className="t-search-item">
                                            <ListItemAvatar className="t-item-avatar">
                                                <Avatar>
                                                    <i className="material-icons">
                                                        notifications
                                                    </i>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <LinesEllipsis
                                                style={{width : "100%"}}
                                                text='Тут будет поиск'
                                                maxLine='1'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters'
                                                />
                                        </ListItem>
                                    </List>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                        )}
                    </Popper>
                </Paper>
                
            </Auxi>
        );
    }
}


export default SearchBar;