import React, {Component} from 'react';
import {Drawer, withStyles, List, Hidden, ListItem, ListItemIcon, ListItemText, Divider, Button} from '@material-ui/core';

import Auxi from '../../../hoc/Auxi';
import userIcon from '../../../assets/bg.png';
import bgImage from '../../../assets/bg.jpg';
import './Slider.css';

const styles = {
    drawerPaper : {
        width : "240px",
        position : 'relative',
        backgroundColor : 'unset',
        zIndex : 0,
        color : "#929EAA"
    }
}

const menuItems = [
    {icon:"assignment", text:"Тикеты"},
    {icon:"book", text:"База знаний"},
    {icon:"divider", text:""},
    {icon:"settings", text:"Настройки"}
]

const jsxMenuItems = menuItems.map((el,i) => {
    return el.icon == "divider" ? <Divider key={"slider_item_"+i}/> : (
        <ListItem button key={"slider_item_"+i}>
            <ListItemIcon>
                <i className="material-icons">
                    {el.icon}
                </i>
            </ListItemIcon>
            <ListItemText primary={el.text} />
        </ListItem>
    )
});

const slider = (props) => {
    return(
        <Auxi>
            <Hidden mdDown>
                <Drawer 
                    classes={{paper : props.classes.drawerPaper}}
                    variant="permanent">
                    <List>
                        {jsxMenuItems}
                    </List>
                </Drawer>
            </Hidden>
            <Hidden lgUp>
                <Drawer
                    variant="temporary"
                    open={props.open}
                    onClose={props.toggle}
                    style={{width : "200px"}}
                    ModalProps={{
                        keepMounted: true
                    }}>
                    <div style={{backgroundImage : "url("+bgImage+")", backgroundSize : 'cover'}}>
                        <img 
                            src={userIcon}
                            className="mbsl-user-icon"/>
                        <ListItem button className="mbsl-user-toggle">
                            <ListItemText 
                                className="mbsl-toggle-label" 
                                secondary={"neo1110111@gmail.com"} 
                                primary="Рома Мельник"/>
                            <i className="material-icons mbsl-toggle-icon">
                                arrow_drop_down
                            </i>
                        </ListItem>
                    </div>
                    <Divider/>
                    <List className="mbsl-menu-list">
                        {jsxMenuItems}
                    </List>
                </Drawer>
            </Hidden>
        </Auxi>
    );
}

export default withStyles(styles)(slider);