import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import cardItemBarCodeStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { addItemBarCode, setItemBarCode, deleteItemBarCode } from '../src/gql/itemBarCode'
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import * as snackbarActions from '../redux/actions/snackbar'
import Confirmation from './dialog/Confirmation'
import * as appActions from '../redux/actions/app'
import { forceCheck } from 'react-lazyload';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ControlCamera from '../icons/barcode-scanner.svg';
import Input from '@material-ui/core/Input';
import { openScanner } from '../src/lib';

const CardItemBarCode = React.memo((props) => {
    const classes = cardItemBarCodeStyle();
    const { element, setList, list, idx, newBarCode } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    let [name, setName] = useState(element?element.name:'');
    let handleName =  (event) => {
        setName(event.target.value)
    };
    let [barCode, setBarCode] = useState(element?element.barCode:'');
    let [check, setCheck] = useState(element?element.check:false);
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    useEffect(() => {
        setBarCode(newBarCode)
    }, [newBarCode]);
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            <CardContent>
                {
                    profile.add?
                        <>
                        <TextField
                            label='Название'
                            value={name}
                            className={classes.input}
                            onChange={handleName}
                        />
                        <FormControl className={ classes.input}>
                            <InputLabel>Штрих-код</InputLabel>
                            <Input
                                type={'text'}
                                value={barCode}
                                onChange={(event)=>{setBarCode(event.target.value)}}
                                className={classes.input}
                                endAdornment={
                                    !element&&isMobileApp?
                                        <InputAdornment position='end'>
                                            <IconButton aria-label='scanner' onClick={()=>{
                                                openScanner({_idx: idx?idx:0, path: 'statistic/itembarcodes'})
                                            }}>
                                                <ControlCamera/>
                                            </IconButton>
                                        </InputAdornment>
                                        :
                                        null
                                }
                            />
                        </FormControl>
                        </>
                        :
                        <>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Название:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Штрих-код:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.barCode}
                            </div>
                        </div>
                        </>
                }
            </CardContent>
            {
                profile.add?
                    <CardActions>
                        {
                            element!==undefined?
                                <>
                                <Button onClick={async()=>{
                                    let editElement = {_id: element._id}
                                    if(name.length>0&&name!==element.name)editElement.name = name
                                    const action = async() => {
                                        await setItemBarCode(editElement)
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} color='primary'>
                                    Сохранить
                                </Button>
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        await setItemBarCode({_id: element._id, check: !check})
                                        setCheck(!check)
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} color={check?'primary':'secondary'}>
                                    {check?'Проверено':'Обработка'}
                                </Button>
                                <Button color='secondary' onClick={()=>{
                                    const action = async() => {
                                        await deleteItemBarCode(element._id)
                                        let _list = [...list]
                                        _list.splice(idx, 1)
                                        setList(_list)
                                        forceCheck();
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }}>
                                    Удалить
                                </Button>
                                </>
                                :
                                <Button onClick={async()=> {
                                    if (name.length) {
                                        setName('')
                                        setBarCode('')
                                        const action = async() => {
                                            let element = await addItemBarCode({barCode, name})
                                            if(element)
                                                setList([element, ...list])
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    } else
                                        showSnackBar('Заполните все поля')

                                }
                                } color='primary'>
                                    Добавить
                                </Button>}
                    </CardActions>
                    :
                    null
            }
        </Card>
    );
})

function mapStateToProps (state) {
    return {
        user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(CardItemBarCode)