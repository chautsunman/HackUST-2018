import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import io from 'socket.io-client';

class ChatRoom extends React.Component {
	constructor(props) {
		super(props);

    this.state = {msg: ''};

		this.socket = io('http://52.163.125.99:8080/', {transports: ['websocket'], upgrade: false});

		this.msgChange = this.msgChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
	}

	msgChange(event) {
    this.setState({
      msg: event.target.value
    });
	}

	sendMsg() {
    this.socket.emit('chat', {msg: this.state.msg});
    this.setState({
      msg: ''
    });
	}

	componentDidMount() {
		this.socket.on('msg', function(msg) {
			console.log(msg);
		});
	}

	render() {
		return (
			<div>
				<form noValidate autoComplete="off">
					<TextField
            id="msg"
            value={this.state.msg}
						onChange={this.msgChange}
						label="message"
						margin="normal"
					/>
					<Button variant="raised" onClick={this.sendMsg}>
						Send
					</Button>
				</form>
			</div>
		);
	}
}

export default ChatRoom;
