import React, {Component} from 'react'

import MainToolbar from '../../components/UI/Toolbar/Toolbar'

import './Layout.css'

class Layout extends Component{

    render(){
        return(
            <div className="main-layout">
                <MainToolbar />
            </div>
        );
    }
}

export default Layout;