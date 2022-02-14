import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { getClients } from '../../src/gql/client'
import * as appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import AutocomplectOnline from '../app/AutocomplectOnline'
import AddClient from './AddClient'

const SetClient =  React.memo(
    (props) =>{
        const { classes, dialogAddElement, _setClient } = props;
        const { setClient } = props.appActions;
        const { legalObject } = props.app;
        const { profile} = props.user;
        const { showMiniDialog } = props.mini_dialogActions;
        let [clientChange, setClientChange] = useState(undefined);
        return (
            <div className={classes.main}>
                <AutocomplectOnline
                    dialogAddElement={profile.add&&dialogAddElement?(setClient, setInputValue, value)=>{return <AddClient legalObject={legalObject._id} setInputValue={setInputValue} setClient={setClient} value={value}/>}:null}
                    setElement={_setClient?_setClient:setClientChange} getElements={async (search)=>{return await getClients({search, legalObject: legalObject._id})}} label={'клиента'}/>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                       if(clientChange)
                           await setClient(clientChange)
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
        app: state.app,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

SetClient.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetClient));