import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import IconButton from 'material-ui/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Undo from '@material-ui/icons/Undo';
import CheckboxBlankCircle from 'mdi-material-ui/CheckboxBlankCircle'
// import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import Avatar from 'material-ui/Avatar';

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

function Icons(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {["Steven", "Man", "Michael"].map((value, i) => (
        <Avatar key={i} alt="Remy Sharp" src={`/img/${value}.jpg`} />
      ))}
      <IconButton color="inherit" aria-label="Menu">
        <EditIcon />
      </IconButton>
      
      <IconButton color="inherit" onClick={() => props.onUndo()} aria-label="Menu">
        <Undo />
      </IconButton>

      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#000000')} style={{color: "black"}}>
        <CheckboxBlankCircle />
      </IconButton>
      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#FF0000')} style={{color: "red"}}>
        <CheckboxBlankCircle />
      </IconButton>
      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#00FF00')} style={{color: "green"}}>
        <CheckboxBlankCircle />
      </IconButton>
      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#0000FF')} style={{color: "blue"}}>
        <CheckboxBlankCircle />
      </IconButton>
      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#FFFF00')} style={{color: "yellow"}}>
        <CheckboxBlankCircle />
      </IconButton>
      <IconButton color="inherit" onClick={() => props.onSelectPenColor('#FFFFFF')} style={{color: "white"}}>
        <CheckboxBlankCircle />
      </IconButton>

      
      
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);