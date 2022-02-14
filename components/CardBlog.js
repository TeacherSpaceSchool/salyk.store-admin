import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import cardPageListStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import { pdDDMMYYYY } from '../src/lib'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { deleteBlog, addBlog, setBlog } from '../src/gql/blog'
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import * as snackbarActions from '../redux/actions/snackbar'
import Confirmation from './dialog/Confirmation'


const CardBlog = React.memo((props) => {
    const classes = cardPageListStyle();
    const { element, setList, list, idx} = props;
    const { profile } = props.user;
    const { isMobileApp } = props.app;
    //addCard
    let [preview, setPreview] = useState(element?element.image:'/add.png');
    let [image, setImage] = useState(undefined);
    let handleChangeImage = ((event) => {
        if(event.target.files[0]&&event.target.files[0].size/1024/1024<50){
            setImage(event.target.files[0])
            setPreview(URL.createObjectURL(event.target.files[0]))
        } else {
            showSnackBar('Файл слишком большой')
        }
    })
    let [name, setName] = useState(element?element.name:'');
    let handleName =  (event) => {
        setName(event.target.value)
    };
    let [text, setText] = useState(element?element.text:'');
    let handleText =  (event) => {
        setText(event.target.value)
    };
    let date = pdDDMMYYYY(element?new Date(element.createdAt):new Date())
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    let [all, setAll] = useState(false);
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            {
                ['superadmin', 'admin'].includes(profile.role)&&profile.add?
                    <>
                    <CardHeader
                        subheader={date}
                    />
                    <CardActionArea>
                        <label htmlFor={element?element._id:'add'}>
                            <img
                                className={isMobileApp?classes.mediaM:classes.mediaD}
                                src={preview}
                                alt={'Изменить'}
                            />
                        </label>
                        <CardContent>
                            <TextField
                                style={{width: '100%'}}
                                label='Заголовок'
                                value={name}
                                className={classes.input}
                                onChange={handleName}
                            />
                            <br/>
                            <br/>
                            <TextField
                                multiline={true}
                                style={{width: '100%'}}
                                label='Текст'
                                value={text}
                                className={classes.input}
                                onChange={handleText}
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            element!==undefined?
                                <>
                                <Button onClick={async()=>{
                                    let editElement = {_id: element._id}
                                    if(name.length>0&&name!==element.name)editElement.name = name
                                    if(text.length>0&&text!==element.text)editElement.text = text
                                    if(image!==undefined)editElement.image = image
                                    const action = async() => {
                                        await setBlog(editElement)
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} color='primary'>
                                    Сохранить
                                </Button>
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        await deleteBlog(element._id)
                                        let _list = [...list]
                                        _list.splice(idx, 1)
                                        setList(_list)
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} color='secondary'>
                                    Удалить
                                </Button>
                                </>
                                :
                                <Button onClick={async()=> {
                                    if (image !== undefined && text.length > 0 && name.length > 0) {
                                        setImage(undefined)
                                        setPreview('/add.png')
                                        setName('')
                                        setText('')
                                        const action = async() => {
                                            setList([
                                                await addBlog({image: image, text: text, name: name}),
                                                ...list
                                            ])
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    } else {
                                        showSnackBar('Заполните все поля')
                                    }
                                }
                                } color='primary'>
                                    Добавить
                                </Button>
                        }
                    </CardActions>
                    <input
                        accept='image/*'
                        style={{ display: 'none' }}
                        id={element?element._id:'add'}
                        type='file'
                        onChange={handleChangeImage}
                    />
                    </>
                    :
                    element!==undefined?
                        <>
                            <img
                                className={isMobileApp?classes.mediaM:classes.mediaD}
                                src={element.image}
                                alt={element.name}
                            />
                            <div className={classes.shapka}>
                                <div className={classes.title}>{element.name}</div>
                                <div className={classes.date}>{date}</div>
                            </div>
                            {all?
                                <div style={{fontSize: '1rem', margin: 20, whiteSpace: 'pre-wrap'}}>
                                    {element.text}
                                </div>:null}
                        <CardActions onClick={async()=> {
                            setAll(!all)
                        }}>
                            <Button color='primary'>
                                {all?'Свернуть':'Посмотреть полностью'}
                            </Button>
                        </CardActions>
                        </>
                        :null
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
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBlog)