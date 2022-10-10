import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { getUsers } from '../../src/gql/user'
import * as appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import AutocomplectOnline from '../app/AutocomplectOnline'

const SetCashier =  React.memo(
    (props) =>{
        const { classes } = props;
        const { setCashier } = props.appActions;
        const { legalObject, branch, isMobileApp } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        let [cashierChange, setCashierChange] = useState(undefined);
        const width = isMobileApp? (window.innerWidth-112) : 500
        return (
            <div className={classes.main} style={{width: width}}>
                <AutocomplectOnline setElement={setCashierChange} getElements={async (search)=>{return await getUsers({search, legalObject: legalObject._id, ...branch?{branch: branch._id}:{}})}} label={'кассира'}/>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                       if(cashierChange)
                           await setCashier(cashierChange)
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

SetCashier.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetCashier));