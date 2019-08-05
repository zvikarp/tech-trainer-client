import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OInput extends Component {
	render() {
		const hasLabel = this.props.label !== undefined;
		const hasTooltip = this.props.tooltip !== undefined;
		const labledStyle = (hasLabel || hasTooltip) ? "labeld-input" : "";

		return (
			<div className={labledStyle}>
				{ hasLabel ? <label>{this.props.label}</label> : null }
				<input
					onChange={this.props.onChange}
					value={this.props.value}
					id={this.props.id}
					type={this.props.type}
					name={this.props.name}
					disabled={this.props.disabled}
				/>
				{ hasTooltip ? <i data-tip={this.props.tooltip} className="fas fa-info-circle tooltip-button"></i> : null }
			</div>
		);
	}
}

OInput.defaultProps = {
	type: "text",
	disabled: false,
	name: "",
	onChange: () => {},
}

OInput.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	id: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.string,
	disabled: PropTypes.bool,
}

export default OInput;