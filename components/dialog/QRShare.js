import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import QRCode from 'react-qr-code';

const QR =  React.memo(
    (props) =>{
        const { classes, value } = props;
        const { showMiniDialog } = props.mini_dialogActions;
        return (
            <div className={classes.main}>
                <QRCode value={value}/>
                <br/>
                <div>
                    <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps () {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

QR.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(QR));