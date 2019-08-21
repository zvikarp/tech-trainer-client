import React from 'react';
import PropTypes from 'prop-types';

const ODropdown = (props) => {

	const hasLabel = props.label !== undefined;
	const hasTooltip = props.tooltip !== undefined && hasLabel;
	const labledStyle = hasLabel ? "oinput labeld" : "oinput";

	return (
		<div className={labledStyle}>
			{hasLabel ? <label>{props.label}</label> : null}
			<select
				disabled={props.disabled}
				name={props.name}
				className="odropdown"
				value={props.selected}
				onChange={props.onChange}
			>
				{props.options.map((option) => <option value={option} key={option} >{option}</option>)}
			</select>
			{hasTooltip && (
				<i data-tip={props.tooltip} className="fas fa-info-circle tooltip" />
			)}
		</div>
	);
}

ODropdown.defaultProps = {
	disabled: false,
	options: [],
	selected: "",
	name: "",
	onChange: () => { }
}

ODropdown.propTypes = {
	onchange: PropTypes.func,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.string),
	selected: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
}

export default ODropdown;