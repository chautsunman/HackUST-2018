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

const boardStyle = {
	width: '100%'
}

class WhiteBoard extends React.Component {

	constructor(props) {
		super(props);
		this.el = React.createRef();
		this.flag = false;
		this.prevX = 0;
		this.currX = 0;
		this.prevY = 0;
		this.currY = 0;
		this.dot_flag = false;
		this.ctx = null;
		this.x = 'black';
		this.y = 2;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.prevX, this.prevY);
		this.ctx.lineTo(this.currX, this.currY);
		this.ctx.strokeStyle = this.x;
		this.ctx.lineWidth = this.y;
		this.ctx.stroke();
		this.ctx.closePath();
	}

	erase() {
		if (this.m) {
			this.ctx.clearRect(0, 0, this.w, this.h);
			this.refs.canvas.style.display = "none";
		}
	}

	findxy(res, e) {
		if (res == 'down') {
			console.log(e.clientX);
			console.log(e.clientY);
			this.prevX = this.currX;
			this.prevY = this.currY;
			this.currX = e.clientX - this.refs.canvas.offsetLeft;
			this.currY = e.clientY - this.refs.canvas.offsetTop;

			this.flag = true;
			this.dot_flag = true;
			if (this.dot_flag) {
				this.ctx.beginPath();
				this.ctx.fillStyle = this.x;
				this.ctx.fillRect(this.currX, this.currY, 2, 2);
				this.ctx.closePath();
				this.dot_flag = false;
			}
		}
		if (res == 'up' || res == "out") {
			this.flag = false;
		}
		if (res == 'move') {
			if (this.flag) {
				this.prevX = this.currX;
				this.prevY = this.currY;
				this.currX = e.clientX - this.refs.canvas.offsetLeft;
				this.currY = e.clientY - this.refs.canvas.offsetTop;
				this.draw();
			}
		}
	}

	componentDidMount() {	
		this.ctx = this.refs.canvas.getContext('2d');
		this.w = this.refs.canvas.width;
		this.h = this.refs.canvas.height;
	}

	render() {

		return (
			<div>
				<Paper elevation={4}>
					<canvas id="board" 
						ref="canvas"
						style={boardStyle} 
						className="board"
						onMouseDown={(e) => this.findxy('down', e)}
						onMouseMove={(e) => this.findxy('move', e)}
						onMouseUp={(e) => this.findxy('up', e)}
						onMouseOut={(e) => this.findxy('out', e)}
					>
					</canvas>
				</Paper>
			</div>
		);
	}
}

WhiteBoard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WhiteBoard);
