import React from 'react';
import { Paper, Avatar} from '@material-ui/core';

import './AuthComponents.css';

const FormWrapper = (props) => (
    <Paper className="au-main-paper">
        <Avatar className="au-main-avatar">
            <i className="material-icons">
                assignment
            </i>
        </Avatar>
        <div className="au-main-title">
            {props.reseting ? "Для сброса пароля вам на почту был выслан код" : "Войдите в свой аккаунт"}
            <div className="au-main-error">
                {props.error}
            </div>
        </div>
        {props.loading ?(<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) : props.children}
    </Paper>
)

export default FormWrapper;