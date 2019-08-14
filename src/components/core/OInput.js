import React from "react";
import PropTypes from "prop-types";

const OInput = props => {
	
	// NOTE: the input can have a tooltip only if it has a label.

	const hasLabel = props.label !== undefined;
	const hasTooltip = props.tooltip !== undefined && hasLabel;
	const labledStyle = hasLabel ? "oinput labeld" : "oinput";

	return (
		<div className={labledStyle}>
			{hasLabel ? <label>{props.label}</label> : null}
			<input
				onChange={props.onChange}
				value={props.value}
				id={props.id}
				type={props.type}
				name={props.name}
				disabled={props.disabled}
			/>
			{hasTooltip && (
				<i data-tip={props.tooltip} className="fas fa-info-circle tooltip" />
			)}
		</div>
	);
};

OInput.defaultProps = {
	type: "text",
	value: "",
	disabled: false,
	name: "",
	onChange: () => {}
};

OInput.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	id: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.string,
	disabled: PropTypes.bool
};

export default OInput;
