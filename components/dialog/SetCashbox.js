import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { getCashboxes } from '../../src/gql/cashbox'
import * as appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import AutocomplectOnline from '../app/AutocomplectOnline'

const SetCashbox =  React.memo(
    (props) =>{
        const { classes, free } = props;
        const { setCashbox } = props.appActions;
        const { legalObject, branch } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        let [cashboxChange, setCashboxChange] = useState(undefined);
        return (
            <div className={classes.main}>
                <AutocomplectOnline setElement={setCashboxChange} getElements={async (search)=>{
                    let cashboxes = await getCashboxes({search, legalObject: legalObject._id, ...branch?{branch: branch._id}:{}})
                    if(free) cashboxes = cashboxes.filter(element=>!element.presentCashier)
                    return cashboxes
                }} label={'кассу/РНМ'} minLength={0}/>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                       if(cashboxChange)
                           await setCashbox(cashboxChange)
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
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

SetCashbox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetCashbox));