import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import io from 'socket.io-client';

class ChatRoom extends React.Component {
	constructor(props) {
		super(props);

    this.state = {msg: '', msgs: []};

		this.socket = io('http://52.163.125.99:8080/', {transports: ['websocket'], upgrade: false});

		this.msgChange = this.msgChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
	}

	times = {};

	msgChange(event) {
    this.setState({
      msg: event.target.value
    });
	}

	sendMsg() {
		let time = new Date().getTime();
    this.times[time] = true;
    this.socket.emit('chat', {time: time ,msg: this.state.msg, name:""});
    this.setState({
      msg: ''
    });
	}

	componentDidMount() {
		this.socket.on('chat', (msg) => {
			if (msg.time in this.times) {
				// It's you.
				msg.name = "You";

			} else {
				msg.name = "Michael";
			}

			this.setState((prevState, props) => {
				prevState.msgs.push(msg);
				return {
					msgs: prevState.msgs
				};
			});
		});
	}

	render() {
		console.log('hi', this.state.msgs);

		return (
			<div>
				{this.state.msgs.map((msg, i) => (<div key={i}>{msg.name}: {msg.msg}</div>))}
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
