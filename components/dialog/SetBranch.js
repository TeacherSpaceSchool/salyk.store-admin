import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { getBranchs } from '../../src/gql/branch'
import * as appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import AutocomplectOnline from '../app/AutocomplectOnline'

const SetBranch =  React.memo(
    (props) =>{
        const { classes } = props;
        const { setBranch } = props.appActions;
        const { legalObject } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        let [branchChange, setBranchChange] = useState(undefined);
        return (
            <div className={classes.main}>
                <AutocomplectOnline setElement={setBranchChange} getElements={async (search)=>{return await getBranchs({search, legalObject: legalObject._id})}} minLength={0} label={'объект'}/>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                       if(branchChange)
                           await setBranch(branchChange)
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

SetBranch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetBranch));