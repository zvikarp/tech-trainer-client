import React from 'react';
import PropTypes from 'prop-types';

const OButton = (props) => {

	const hasIcon = props.icon !== undefined;
	const center = props.center ? "center " : "";
	const type = props.secondary ? "secondary " : "primary ";
	const styles = "obutton " + center + type + props.customStyle;
	// const text = props.loading ? "WORKING ON IT..." : props.text;
	const isSubmitButton = props.submit ? "submit" : null;
	const isDisabled = props.disabled || props.loading;

	return (
		<select className="odropdown">
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
	);
}

OButton.defaultProps = {
	secondary: false,
	disabled: false,
	submit: false,
	loading: false,
	center: false,
}

OButton.propTypes = {
	onClick: PropTypes.func,
	// text: PropTypes.string.isRequired,
	icon: PropTypes.string,
	secondary: PropTypes.bool,
	disabled: PropTypes.bool,
	submit: PropTypes.bool,
	loading: PropTypes.bool,
	center: PropTypes.bool,
}

export default OButton;