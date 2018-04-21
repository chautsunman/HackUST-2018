import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
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
		this.el = React.createRef();
		this.drawing = false;
		this.ctx = null;
		this.width = 800;
		this.height = 500;
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

	findxy(res, e) {
		if (res == 'touchstart') {
			this.lastX = e.touches[0].clientX - this.refs.canvas.offsetLeft;
			this.lastY = e.touches[0].clientY - this.refs.canvas.offsetTop;
			this.drawing = true;
		} else if (res == 'touchmove') {
			if (this.drawing) {
				this.draw(this.lastX, this.lastY, e.changedTouches[0].clientX - this.refs.canvas.offsetLeft, e.changedTouches[0].clientY - this.refs.canvas.offsetTop);
				this.lastX = e.changedTouches[0].clientX - this.refs.canvas.offsetLeft;
				this.lastY = e.changedTouches[0].clientY - this.refs.canvas.offsetTop;
			}
		} else if (res == 'touchend') {
			this.drawing = false;
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
	}

	render() {
		return (
			<div>
				<Paper ref="canvasContainer" elevation={4}>
					<canvas id="board"
						ref="canvas"
						className="board"
						width={this.width}
						height={this.height}
						onMouseDown={(e) => this.findxy('down', e)}
						onMouseMove={(e) => this.findxy('move', e)}
						onMouseUp={(e) => this.findxy('up', e)}
						onMouseOut={(e) => this.findxy('out', e)}
						onTouchStart={(e) => this.findxy('touchstart', e)}
						onTouchMove={(e) => this.findxy('touchmove', e)}
						onTouchEnd={(e) => this.findxy('touchend', e)}
					>
					</canvas>
				</Paper>
			</div>
		);
	}
}

export default (WhiteBoard);
