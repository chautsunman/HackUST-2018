import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import IconButton from 'material-ui/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import CheckboxBlankCircle from 'mdi-material-ui/CheckboxBlankCircle'
import Avatar from 'material-ui/Avatar';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import './toolBar.css';
import Snackbar from 'material-ui/Snackbar';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
  },
});

const rootStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginRight:10,
  marginLeft:10,
};

class Icons extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      brushSize: 1,
      open: false,
      vertical: null,
      horizontal: null,
    };
  }
  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleBrushChange(e, func) {
    console.log(e.target.value);
    this.setState({ brushSize: e.target.value});
    func(e.target.value);
  }
// <SnackbarContent className={classes.snackbar} message="I love snacks." action={action} />
  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div style={rootStyle} className="container"> 
        <div style={{display: 'flex', flexDirection: 'row', borderRight: "solid 1px #c5c5c5", paddingRight: 20}}>
          {["Steven", "Man", "Michael"].map((value, i) => (
            <Avatar key={i} alt="Remy Sharp" src={`/img/${value}.jpg`} />
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <IconButton color="inherit" onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
            <Save />
          </IconButton>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={this.handleClose}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Save Successfully!</span>}
          />
          <IconButton color="inherit" aria-label="Menu">
            <EditIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => this.props.onUndo()} aria-label="Menu">
            <Undo />
          </IconButton>

          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#000000')} style={{color: "black"}}>
            <CheckboxBlankCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#FF0000')} style={{color: "red"}}>
            <CheckboxBlankCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#00FF00')} style={{color: "green"}}>
            <CheckboxBlankCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#0000FF')} style={{color: "blue"}}>
            <CheckboxBlankCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#FFFF00')} style={{color: "yellow"}}>
            <CheckboxBlankCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => this.props.onSelectPenColor('#FFFFFF')} style={{color: "#eceaea"}}>
            <CheckboxBlankCircle />
          </IconButton>

          <form autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="brush-size">Brush Size</InputLabel>
              <Select
                value={this.state.brushSize}
                onChange={(e) => {this.handleBrushChange(e, this.props.onSelectBrushSize)}}
                inputProps={{
                  name: 'brush-size',
                  id: 'brush-size',
                }}
              >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
          </form>
        </div>
      </div>
    );
  }

}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);
