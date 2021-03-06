import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Btn from './confirmBtn.js';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <p>Invite friends to the conversation:</p>
        </div>
        <div className={classes.root} style={{marginLeft:"auto",marginRight:"auto"}}>
          <List>
            {["Steven", "Cameron", "Man", "Michael"].map((value,i) => (
              <ListItem key={i} dense button className={classes.listItem}>
                <Avatar alt="Remy Sharp" src={`/img/${value}.jpg`} />
                <ListItemText primary={`${value}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle(value)}
                    checked={this.state.checked.indexOf(value) !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
            <Btn />
        </div>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);