import React from 'react';
import {TextField, Button} from '@material-ui/core';

import './AuthComponents.css';

const ResetForm = (props) => (
    <form className="au-main-form" onSubmit={props.onSubmit}> 
        <TextField
            id="verifyCode"
            label="Код"
            placeholder="Введите код подтверждения"
            type="text"
            required
            onChange={props.codeChanged}
            value={props.code}
            margin="normal"/>
        <TextField
            id="resetPass"
            label="Пароль"
            required
            placeholder="Введите новый пароль"
            type="password"
            error={props.passHelperText != null}
            helperText={props.passHelperText}
            onChange={props.passChanged}
            value={props.password}
            margin="normal"/>
        <TextField
            id="resetPassConfirm"
            label="Пароль"
            required
            placeholder="Введите пароль еще раз"
            type="password"
            error={props.confPassHelperText != null}
            helperText={props.confPassHelperText}
            onChange={props.confirmPasswordChanged}
            value={props.confirmPassword}
            margin="normal"/>
        <div className="au-reset-toggle">
            <Button 
                onClick={props.toggleClick}
                variant="text" 
                style={{maxHeight : "30px", 
                        textTransform: "none", 
                        color : "#106CC8 "}}>
                Вернуться назад
            </Button>
        </div>
        <Button 
            type="submit"
            variant="contained" 
            style={{
                marginTop : "10px",
                backgroundColor : "#106CC8", 
                color : "#fff"}}>
            Подтвердить
        </Button>
        <p style={{fontSize : "14px", textAlign : "justify"}}>
            Если код не приходит в течении 1 минуты, вернитесь назад и нажмите кнопку "Сбросить пароль" еще раз.
        </p>
    </form>
);

export default ResetForm;