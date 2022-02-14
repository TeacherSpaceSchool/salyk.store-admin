import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import * as snackbarActions from '../../redux/actions/snackbar'
import { checkFloat, inputFloat } from '../../src/lib'
import { addItem} from '../../src/gql/item'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const types = ['товары', 'услуги']
import {getItemBarCode} from '../../src/gql/itemBarCode'

const AddItem =  React.memo(
    (props) =>{
        const { classes, _addItem, value, _barCode } = props;
        const { isMobileApp, legalObject } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        const { showLoad } = props.appActions;
        const width = isMobileApp? (window.innerWidth-112) : 500
        const { showSnackBar } = props.snackbarActions;
        let [name, setName] = useState(value);
        let [price, setPrice] = useState('');
        let [unit, setUnit] = useState('шт');
        /*let [tnved, setTnved] = useState('');
        let [mark, setMark] = useState(false);*/
        let [type, setType] = useState('товары');
        let handleType = (event) => {
            setType(event.target.value)
        };
        let [barCode, setBarCode] = useState(_barCode?_barCode:'');
        useEffect(() => {
            (async()=>{
                if(_barCode) {
                    let itemBarCode = await getItemBarCode({barCode: _barCode})
                    if(itemBarCode&&itemBarCode.name) setName(itemBarCode.name)
                }
            })()
        }, []);
        return (
            <div className={classes.main}>
                <FormControl className={classes.input}>
                    <InputLabel>Тип</InputLabel>
                    <Select value={type} onChange={handleType}>
                        {types.map((element)=>
                            <MenuItem key={element} value={element}>{element}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <TextField
                    label='Название'
                    value={name}
                    style={{width: width}}
                    className={classes.textField}
                    onChange={(event)=>{setName(event.target.value)}}
                />
                <br/>
                <TextField
                    label='Штрих-код'
                    value={barCode}
                    style={{width: width}}
                    className={classes.textField}
                    onChange={(event)=>{setBarCode(event.target.value)}}
                    onBlur={async()=>{
                        if(barCode.length) {
                            let itemBarCode = await getItemBarCode({barCode: barCode})
                            if (itemBarCode&&itemBarCode.name) setName(itemBarCode.name)
                        }
                    }}
                />
                <br/>
                <TextField
                    type={isMobileApp?'number':'text'}
                    label='Цена'
                    value={price}
                    style={{width: width}}
                    className={classes.textField}
                    onChange={(event)=>{setPrice(inputFloat(event.target.value))}}
                />
                <br/>
                <TextField
                    label='Единица измерения'
                    value={unit}
                    style={{width: width}}
                    className={classes.textField}
                    onChange={(event)=>{setUnit(event.target.value)}}
                />
                <br/>
                {
                    /*
                    <TextField
                        label='Код ТНВЭД'
                        value={tnved}
                        className={classes.input}
                        onChange={(event)=>{setTnved(event.target.value)}}
                    />
                    <br/>
                    <div className={classes.row} style={{alignItems: 'flex-end'}}>
                        <div className={classes.nameField}>Признак маркировки:&nbsp;</div>
                        <Checkbox

                            checked={mark}
                            onChange={()=>{setMark(!mark)}}
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    <br/>
                    */
                }
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                        if(price>0&&name.length&&unit.length) {
                            showLoad(true)
                            let _id = await addItem({
                                legalObject: legalObject._id,
                                price: checkFloat(price),
                                unit,
                                barCode,
                                name,
                                type,
                                tnved: '',
                                mark: false,
                                priority: 0,
                                quick: false,
                                editedPrice: false,
                            })
                            _addItem({
                                editedPrice: false,
                                _id,
                                name,
                                unit,
                                tnved: '',
                                mark: false,
                                price: checkFloat(price)
                            })
                            showLoad(false)
                            showMiniDialog(false)
                        } else
                            showSnackBar('Заполните все поля')
                    }} className={classes.button}>
                        Добавить
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
        appActions: bindActionCreators(appActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

AddItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(AddItem));