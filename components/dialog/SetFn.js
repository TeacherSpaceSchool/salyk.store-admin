import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { reserveFn, deleteFn } from '../../src/gql/kkm-2.0'
import * as snackbarActions from '../../redux/actions/snackbar'

const SetFn =  React.memo(
    (props) =>{
        const { showSnackBar } = props.snackbarActions;
        const { classes, _id } = props;
        const { isMobileApp } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        const width = isMobileApp? (window.innerWidth-112) : 500
        let [fns, setFns] = useState(props.fns);
        let [fn, setFn] = useState('');
        let handleFn =  (event) => {
            setFn(event.target.value)
        };
        return (
            <div className={classes.main} style={{width}}>
                <FormControl className={classes.input}>
                    <InputLabel>ФМ</InputLabel>
                    <Select value={fn} onChange={handleFn}>
                        {fns.map((element, idx)=>
                            <MenuItem key={element.number} value={element.number}>
                                <div style={{width: 'calc(100% - 42px)'}}>{element.number}</div>
                                {
                                    fn!==element.number?
                                        <IconButton
                                            onClick={async ()=>{
                                                let res = await deleteFn({_id, fn: element.number})
                                                if(res==='OK') {
                                                    fns.splice(idx, 1);
                                                    setFns([...fns])
                                                    showSnackBar('Успешно', 'success')
                                                }
                                                else
                                                    showSnackBar('Ошибка', 'error')
                                            }}
                                            style={{color: 'red'}}
                                        >
                                            <Remove/>
                                        </IconButton>
                                        :
                                        null
                                }
                            </MenuItem>
                        )}
                        <MenuItem onClick={async ()=>{
                                let res = await reserveFn(_id)
                                if(res) {
                                    setFns([res, ...fns])
                                    setFn(res.number)
                                    showSnackBar('Успешно', 'success')
                                }
                                else
                                    showSnackBar('Ошибка', 'error')
                            }}>
                            <div style={{width: 'calc(100% - 42px)'}}>Добавить ФМ</div>
                            <IconButton style={{color: 'green'}}>
                                <Add/>
                            </IconButton>
                        </MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                        props.setFn(fn)
                        showMiniDialog(false);
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
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

SetFn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetFn));