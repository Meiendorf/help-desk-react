import React from 'react';
import {TextField, FormControlLabel, Checkbox, Button, FormGroup} from '@material-ui/core';
import './AuthComponents.css';

const AuthForm = (props) => (
    <form className="au-main-form" onSubmit={props.onSubmit}>
        <TextField
            id="email"
            label="Почта"
            placeholder="Введите вашу почту"
            type="email"
            required
            error={props.emailHelperText != null}
            helperText={props.emailHelperText}
            onChange={props.emailChanged}
            value={props.email}
            margin="normal"/>
        <TextField
            id="pass"
            label="Пароль"
            required
            placeholder="Введите ваш пароль"
            type="password"
            error={props.passHelperText != null}
            helperText={props.passHelperText}
            onChange={props.passChanged}
            value={props.password}
            margin="normal"/>
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={props.remember}
                    value={""}
                    onChange={props.rememberChanged}
                    style={{color : "#106CC8"}}
                    />

                }
                label="Запомнить"/>
            <div className="au-reset-toggle">
                <Button 
                    onClick={props.toggleClick}
                    variant="text" 
                    style={{maxHeight : "30px", 
                            textTransform: "none", 
                            color : "#106CC8 "}}>
                    Сбросить пароль
                </Button>
            </div>
        </FormGroup>
        <Button 
            type="submit"
            variant="contained" 
            style={{
                backgroundColor : "#106CC8", 
                color : "#fff"}}>
            Войти
        </Button>
        <p style={{fontSize : "14px", textAlign : "justify"}}>
            Самостоятельная регистрация на сайте невозможна. 
            Если у вас возникли проблемы,<a href="#" className="au-adm-link"> свяжитесь </a>с администрацией.
        </p>
    </form>
)

export default AuthForm;