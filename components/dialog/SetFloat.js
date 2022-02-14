import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import {inputFloat, checkFloat} from '../../src/lib'
import TextField from '@material-ui/core/TextField';
import * as snackbarActions from '../../redux/actions/snackbar'

const SetFloat =  React.memo(
    (props) =>{
        const { classes, action } = props;
        const { showMiniDialog } = props.mini_dialogActions;
        const { showSnackBar } = props.snackbarActions;
        const { isMobileApp } = props.app;
        let [float, setFloat] = useState('');
        let [comment, setComment] = useState('');
        return (
            <div className={classes.main}>
                <TextField
                    className={classes.input}
                    label='Обоснование (не обязательно)'
                    value={comment}
                    onChange={(event)=>{setComment(event.target.value)}}
                />
                <TextField
                    type={isMobileApp?'number':'text'}
                    label='Сумма'
                    value={float}
                    className={classes.input}
                    onChange={(event)=>{setFloat(inputFloat(event.target.value))}}
                />
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                        if(float) {
                            float = checkFloat(float)
                            await action(float, comment)
                            showMiniDialog(false);
                        }
                        else
                            showSnackBar('Сумма слишком мала')
                    }} className={classes.button}>
                        Сохранить
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
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

SetFloat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetFloat));