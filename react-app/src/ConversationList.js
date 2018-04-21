import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    width: 300
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
    {id: '1', title: 'Conversation 1'},
    {id: '2', title: 'Conversation 2'},
    {id: '3', title: 'Conversation 3'},
    {id: '4', title: 'Conversation 4'}
  ];

  addNewConversation() {

  }

  render() {
    return (
      <div>
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
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Button variant="fab" color="primary" aria-label="add" onClick={this.addNewConversation} style={styles.addBtn}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default ConversationList;
