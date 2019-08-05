import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OButton extends Component {
	render() {
		const hasIcon = this.props.icon !== undefined;
		return (
			<button
				className={this.props.type}
				disabled={this.props.disabled}
				onClick={this.props.onClick} >
					 {hasIcon ? <i className={this.props.icon} /> : null}
					<div>{this.props.text}</div>
      </button>
		);
	}
}

OButton.defaultProps = {
	type: "primary",
	disabled: false,
}

OButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
	type: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.bool,
}

export default OButton;