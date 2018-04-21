import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Link to="/whiteboard">
        <Button variant="raised" className={classes.button}>
          OK
        </Button>
      </Link>

      <Link to="/">
        <Button variant="raised" className={classes.button}>
          Cancel
        </Button>
      </Link>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);