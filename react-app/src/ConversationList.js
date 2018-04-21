import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const styles = {
  card: {
    width: 300,
    marginRight: 10

  },
  addBtn: {
    bottom: 32,
    position: 'absolute',
    right: 32
  }
};

class ConversationList extends Component {
  constructor(props) {
    super(props);
  }

  conversations = [
    {  
      id: '1', title: 'Friend Group', 
      member: 'Mary, Jane', lastEdit:'yesterday'
    },
    {
      id: '2', title: 'Conversation with Boss', 
      member: 'Prof. Song', lastEdit:'3 hours ago'
    },
    {
      id: '3', title: 'Bros Group', 
      member: 'Cameron, Man, Michael', lastEdit: '21 minutes ago'
    }
  ];

  addNewConversation() {
  }

  render() {
    return (
      <div style={{marginLeft:20}}>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              spacing={16}
              alignItems="center"
              direction="row"
              justify="flex-start"
            >
              {this.conversations.map(conversation => (
                <Card key={conversation.id} style={styles.card}>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {conversation.title}
                    </Typography>

                    <Typography component="p">
                      With: {conversation.member} <br />
                      Last edited: {conversation.lastEdit}
                    </Typography>

                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Link to="/contact-list">
          <Button variant="fab" color="primary" aria-label="add" onClick={this.addNewConversation} style={styles.addBtn}>
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

export default ConversationList;
