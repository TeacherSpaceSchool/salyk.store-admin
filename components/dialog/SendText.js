import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import { validPhone1, validMail, inputPhone } from '../../src/lib'
import * as snackbarActions from '../../redux/actions/snackbar'
import InputAdornment from '@material-ui/core/InputAdornment';

const SendText =  React.memo(
    (props) =>{
        const { classes, type, text, title } = props;
        let [address, setAddress] = useState('');
        const { isMobileApp } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        const width = isMobileApp? (window.innerWidth-112) : 500
        const { showSnackBar } = props.snackbarActions;
        return (
            <div className={classes.main}>
                <TextField
                    style={{width}}
                    type={type==='whatsapp'?'number':'text'}
                    label={
                        type==='whatsapp'?
                            'Телефон. Формат: +996556899871'
                            :
                            type==='mail'?
                                'Почта. Формат: yourmail@mail.com'
                                :
                                'Адрес отправки'
                    }
                    className={classes.textField}
                    margin='normal'
                    value={address}
                    InputProps={{
                        startAdornment: type==='whatsapp'?<InputAdornment position='start'>+996</InputAdornment>:null
                    }}
                    error={
                        type==='whatsapp'?
                            !validPhone1(address)
                            :
                            type==='mail'?
                                !validMail(address)
                                :
                                false
                    }
                    onChange={(event)=>{
                        address = event.target.value
                        if(type==='whatsapp')
                            address = inputPhone(address)
                        setAddress(address)
                    }}
                />
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                        if(type==='whatsapp'&&validPhone1(address)) {
                            window.open(`https://wa.me/+996${address}?text=${text}`)
                            showMiniDialog(false);
                        }
                        else if(type==='mail'&&validMail(address)) {
                            window.open(`mailto:${address}?subject=${title}&body=${text}`)
                            showMiniDialog(false);
                        }
                        else
                            showSnackBar('Проверьте правильность')
                    }} className={classes.button}>
                        Отправить
                    </Button>
                    <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

SendText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SendText));