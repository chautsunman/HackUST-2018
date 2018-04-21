import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import IconButton from 'material-ui/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Undo from '@material-ui/icons/Undo';
import checkboxBlankCircle from 'mdi-material-ui'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
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
    	{["Steven", "Man", "Michael"].map(value => (
    		<Avatar alt="Remy Sharp" src={`/img/${value}.jpg`} />
    	))}
			<IconButton color="inherit" aria-label="Menu">
			  <EditIcon />
			</IconButton>
			
			<IconButton color="inherit" aria-label="Menu">
			  <Undo />
			</IconButton>

			<IconButton color="inherit" aria-label="Menu" style={{color: "black"}}>
			  <RadioButtonChecked />
			</IconButton>
			<IconButton color="inherit" aria-label="Menu" style={{color: "red"}}>
			  <RadioButtonChecked />
			</IconButton>
			<checkboxBlankCircle />

			
			
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);