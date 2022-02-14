import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as userActions from '../../redux/actions/user'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Link from 'next/link';

const Sign =  React.memo(
    (props) =>{
        let [loginEnter, setLoginEnter] = useState('');
        let [passEnter, setPassEnter] = useState('');
        let handlePassEnter =  (event) => {
            setPassEnter(event.target.value)
        };
        let handleLoginEnter =  (event) => {
            setLoginEnter(event.target.value)
        };
        let [hide, setHide] = useState('password');
        let handleHide =  () => {
            setHide(!hide)
        };
        const { error } = props.user;
        const { isMobileApp } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        const { signin, clearError } = props.userActions;
        const { classes } = props;
        const width = isMobileApp? (window.innerWidth-112) : 500
        return (
            <div className={classes.main} style={{width}}>
                <TextField
                    label='Логин'
                    className={classes.input}
                    margin='normal'
                    value={loginEnter}
                    onChange={handleLoginEnter}
                    onKeyPress={event => {
                        if (event.key === 'Enter'&&loginEnter.length>0&&passEnter.length>0)
                            signin({login: loginEnter, password: passEnter})
                    }}
                />
                <br/>
                <FormControl className={classNames(classes.margin, classes.input)}>
                    <InputLabel>Пароль</InputLabel>
                    <Input
                        type='text'
                        style={hide?{'text-security': 'disc', '-webkit-text-security': 'disc'}:{}}
                        value={passEnter}
                        onChange={handlePassEnter}
                        onKeyPress={event => {
                            if (event.key === 'Enter'&&loginEnter.length>0&&passEnter.length>0)
                                signin({login: loginEnter, password: passEnter})
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={handleHide}>
                                    {hide ? <VisibilityOff />:<Visibility />  }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {error?
                    <div className={classes.error_message}>{error}</div>
                    :
                    <br/>
                }
                <div>
                    {/*<div style={{width: width}} className={classes.message} onClick={()=>{setType('reg')}}>Зарегистрироваться</div>*/}
                    <div>Если забыли пароль или хотите зарегестрироваться, то перейдите в раздел <Link href='/contact'><a><b onClick={()=>{clearError();showMiniDialog(false);}}>«Контакты»</b></a></Link> или <Link href='/connectionapplications'><a><b onClick={()=>{clearError();showMiniDialog(false);}}>«Заявка на подключение»</b></a></Link> и свяжитесь с нашими специалистами.</div>
                    <div>Нажимая «Войти» вы принимаете положения документов <Link href='/privacy'><a><b onClick={()=>{clearError();showMiniDialog(false);}}>«Политика конфиденциальности»</b></a></Link> и <Link href='/ofert'><a><b onClick={()=>{clearError();showMiniDialog(false);}}>«Публичная оферта»</b></a></Link>.</div>
                </div>
                <br/>
                <div>
                    <Button variant="contained" color="primary" onClick={()=>{
                        if(loginEnter.length>0&&passEnter.length>0) {
                            signin({login: loginEnter, password: passEnter})
                        }
                    }} className={classes.button}>
                        Войти
                    </Button>
                    <Button variant="contained" color="secondary" onClick={()=>{
                        clearError()
                        showMiniDialog(false);
                    }} className={classes.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(Sign));