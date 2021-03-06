import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ChatRoom from './ChatRoom';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

import SimpleWebRTC from 'simplewebrtc';

const styles = theme => ({
	root: theme.mixins.gutters({
		marginLeft: 16,
		marginRight: 16,
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	})
});

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.el = React.createRef();
		this.webrtc = new SimpleWebRTC({
			localVideoEl: 'localVideo',
			remoteVideosEl: 'remoteVideos',
			autoRequestMedia: true
		});
	}

	componentDidMount() {
		this.webrtc.on('readyToCall', () => {
			console.log('Ready');
			this.webrtc.joinRoom('chatroom');
		});
	}

	render() {

		return (
			<div style={{marginLeft:30,marginRight:30}}>

				<ChatRoom />

				<div id="remoteVideos"></div>
				<video id="localVideo"></video>
			</div>
		);
	}
}

Chat.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
