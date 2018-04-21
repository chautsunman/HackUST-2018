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
	}

	draw(lastX, lastY, currentX, currentY) {
		this.ctx.beginPath();
		this.ctx.moveTo(lastX, lastY);
		this.ctx.lineTo(currentX, currentY);
		this.ctx.stroke();
	}

	findxy(res, e) {
		if (res == 'down') {
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

	componentDidMount() {
		this.ctx = this.refs.canvas.getContext('2d');
	}

	render() {
		return (
			<div>
				<Paper ref="canvasContainer" elevation={4}>
					<canvas id="board"
						ref="canvas"
						className="board"
						width={500}
						height={500}
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

export default (WhiteBoard);
