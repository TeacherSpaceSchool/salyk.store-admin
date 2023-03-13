import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';

const SetFMData =  React.memo(
    (props) =>{
        const { classes, list, selectData, defaultCode } = props;
        const { isMobileApp } = props.app;
        const { showMiniDialog } = props.mini_dialogActions;
        const width = isMobileApp? (window.innerWidth-112) : 500
        const [search, setSearch] = useState('');
        const handleSearch = (event) => {
            setSearch(event.target.value)
        };
        return (
            <div className={classes.main} style={{width: width}}>
                <Input className={classes.input}
                       value={search}
                       onChange={handleSearch}
                       endAdornment={
                           search?<InputAdornment position='end'>
                               <IconButton aria-label='Search' onClick={()=>{setSearch('')}}>
                                   <Cancel />
                               </IconButton>
                           </InputAdornment>:null
                       }/>
                {list.map((element, idx)=> {
                    if(element.name.toLowerCase().includes(search.toLowerCase()))
                        return <div key={`fmData${idx}`} className={classes.row} style={{alignItems: 'center'}}>
                            <Radio checked={defaultCode === element.code} onClick={() => {
                                selectData(element.code, element.name)
                                showMiniDialog(false)
                            }}/>&nbsp;{element.name}
                        </div>
                })}
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

SetFMData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(SetFMData));