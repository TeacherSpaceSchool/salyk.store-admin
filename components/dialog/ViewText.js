import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { pdDDMMYYHHMM } from '../../src/lib'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'

const History =  React.memo(
    (props) =>{
        const { classes, text } = props;
        const { showMiniDialog } = props.mini_dialogActions;
        return (
            <div className={classes.main}>
                <div className={classes.value}>
                    {text}
                </div>
                <br/>
                <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                    Закрыть
                </Button>
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
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(History));