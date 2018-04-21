import io from 'socket.io-client';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: theme.mixins.gutters({
		marginLeft: 16,
		marginRight: 16,
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	})
});

class WhiteBoard extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io('http://52.163.125.99:8080/', {transports: ['websocket'], upgrade: false});
		this.el = React.createRef();
		this.drawing = false;
		this.ctx = null;
		this.width = 600;
		this.height = 500;
		this.points = [];
	}

	draw(lastX, lastY, currentX, currentY) {
		console.log(lastX);
		console.log(lastY);
		console.log(currentX);
		console.log(currentY);
		this.ctx.beginPath();
		this.ctx.moveTo(lastX, lastY);
		this.ctx.lineTo(currentX, currentY);
		this.ctx.stroke();
	}

	onTouch(res, e) {
		e.preventDefault();
		e.stopPropagation();
		this.findxy(res, e);
	}

	findxy(res, e) {
		if (res == 'touchstart') {
			this.lastX = e.touches[0].clientX - this.refs.canvas.offsetLeft;
			this.lastY = e.touches[0].clientY - this.refs.canvas.offsetTop;
			this.drawing = true;
			this.points.push({x: this.lastX, y: this.lastY});
		} else if (res == 'touchmove') {
			if (this.drawing) {
				this.draw(this.lastX, this.lastY, e.changedTouches[0].clientX - this.refs.canvas.offsetLeft, e.changedTouches[0].clientY - this.refs.canvas.offsetTop);
				this.lastX = e.changedTouches[0].clientX - this.refs.canvas.offsetLeft;
				this.lastY = e.changedTouches[0].clientY - this.refs.canvas.offsetTop;
				this.points.push({x: this.lastX, y: this.lastY});
			}
		} else if (res == 'touchend') {
			this.drawing = false;
			console.log(this.points);
			this.socket.emit('draw', {points: this.points});
			this.points = [];
		} else if (res == 'down') {
			this.lastX = e.clientX - this.refs.canvas.offsetLeft;
			this.lastY = e.clientY - this.refs.canvas.offsetTop;
			this.drawing = true;
		} else if (res == 'up' || res == "out") {
			this.drawing = false;
		} else if (res == 'move') {
			if (this.drawing) {
				this.draw(this.lastX, this.lastY, e.clientX - this.refs.canvas.offsetLeft, e.clientY - this.refs.canvas.offsetTop);
				this.lastX = e.clientX - this.refs.canvas.offsetLeft;
				this.lastY = e.clientY - this.refs.canvas.offsetTop;
			}
		}
	}

	componentWillMount() {
		//React.initializeTouchEvents(true);
	}

	componentDidMount() {
		this.ctx = this.refs.canvas.getContext('2d');
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
		console.log(this.width);
		console.log(this.height);

		this.socket.on('draw', (msg) => {
			console.log('Received');
			for (let i = 1; i < msg.points.length; ++i) {
				this.draw(msg.points[i-1].x, msg.points[i-1].y, msg.points[i].x, msg.points[i].y);
			}
		});

	}

	render() {
		return (
			<div>
				<Card ref="canvasContainer" elevation={4}>
					<canvas id="board"
						ref="canvas"
						className="board"
						width={this.width}
						height={this.height}
						onMouseDown={(e) => this.findxy('down', e)}
						onMouseMove={(e) => this.findxy('move', e)}
						onMouseUp={(e) => this.findxy('up', e)}
						onMouseOut={(e) => this.findxy('out', e)}
						onTouchStart={(e) => this.onTouch('touchstart', e)}
						onTouchMove={(e) => this.onTouch('touchmove', e)}
						onTouchEnd={(e) => this.onTouch('touchend', e)}
					>
					</canvas>
				</Card>
			</div>
		);
	}
}

export default (WhiteBoard);
