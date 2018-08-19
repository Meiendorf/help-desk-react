import React, {Component} from 'react';

import MainToolbar from '../../components/UI/Toolbar/Toolbar';
import Slider from '../../components/UI/Slider/Slider';

import './Layout.css';
import { Grid } from '../../../node_modules/@material-ui/core';

class Layout extends Component{
    state = {
        mobileSliderOpen : false
    }
    toggleMobileSlider = () => {
        this.setState(prev => ({mobileSliderOpen : !prev.mobileSliderOpen}));
    }

    render(){
        return(
            <div className="main-layout">
                <Grid container>
                    <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                        <MainToolbar toggleSlider={this.toggleMobileSlider} />
                    </Grid>
                    <Grid item>
                        <Slider 
                            toggle={this.toggleMobileSlider} 
                            open={this.state.mobileSliderOpen}/>
                    </Grid>
                    <Grid item md xs sm lg xl>  
                        {this.props.children}
                    </Grid>
                </Grid>         
            </div>
        );
    }
}

export default Layout;