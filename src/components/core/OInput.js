import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OInput extends Component {
	render() {

		return (
			<div>
				<label>{this.props.label}</label>
				<input
					onChange={this.props.onChange}
					value={this.props.value}
					id={this.props.id}
					type={this.props.type}
				/>
			</div>
		);
	}
}

OInput.defaultProps = {
	type: "text",
}

OInput.propTypes = {
	lable: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	id: PropTypes.string,
	type: PropTypes.string,
}

export default OInput;