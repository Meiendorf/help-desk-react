import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import TicketsTableLite from './TicketsTableLite/TicketsTableLite';
import './Dashboard.css';
import LastArticleTable from './LastArticlesTable/LastArticleTable';
import Donut from './Donut/Donut';
import Layout from '../../containers/Layout/Layout';

export default class Dashboard extends Component{
    state = {
        tickets : [
            {id : 1, name : "Не работает приложение", client : "Василий Павленко", 
            priority : "Высокий", status : "Открыт", date : "12.58"},
            {id : 2, name : "Не работает приложение", client : "Василий Павленко", 
            priority : "Никзий", status : "В работе", date : "12.58"},
            {id : 3, name : "Не работает приложение", client : "Василий Павленко", 
            priority : "Средний", status : "Открыт", date : "12.58"},
            {id : 4, name : "Не работает приложение", client : "Василий Павленко", 
            priority : "Средний", status : "Отклонен", date : "12.58"},
            {id : 5, name : "Не работает приложение", client : "Василий Павленко", 
            priority : "Низкий", status : "В работе", date : "12.58"},
        ],
        articles : [
            {id : 1, name : "Описание принципов работы сайта", date :"14.11.18"},
            {id : 2, name : "Роли пользователей и их права", date : "01.11.18"},
            {id : 3, name : "Описание принципов работы сайта", date :"14.11.18"},
            // {id : 4, name : "Роли пользователей и их права", date : "01.11.18"},
            // {id : 5, name : "Описание принципов работы сайта", date :"14.11.18"}
        ],
        pieValues : [
            4,6,3,5
        ],
        ticketsPage : 0,
        ticketsRowsPerPage : 5
    }
    handleChangePage = (event, page) => {
        this.setState({ ticketsPage : page});
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ ticketsRowsPerPage : event.target.value });
    };

    render(){
        return(
            <Layout>
                <div className="ds-main">          
                    <LastArticleTable
                        articles={this.state.articles}/>
                    <Donut 
                        dValues={this.state.pieValues}
                        count={18}/>        
                    <TicketsTableLite 
                        tickets={this.state.tickets}
                        page={this.state.ticketsPage}
                        rowsPerPage={this.state.ticketsRowsPerPage}
                        pageChanged={this.handleChangePage}
                        rowsChanged={this.handleChangeRowsPerPage}/>    
                </div>
            </Layout>
        );
    }
}