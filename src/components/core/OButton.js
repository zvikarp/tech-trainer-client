import React from 'react';
import PropTypes from 'prop-types';

const OButton = (props) => {

	const hasIcon = props.icon !== undefined;
	const center = props.center ? "center " : "";
	const type = props.secondary ? "secondary " : "primary ";
	const styles = "obutton " + center + type + props.customStyle;
	const text = props.loading ? "WORKING ON IT..." : props.text;
	const isSubmitButton = props.submit ? "submit" : null;
	const isDisabled = props.disabled || props.loading;

	return (
		<button
			type={isSubmitButton}
			className={styles}
			disabled={isDisabled}
			onClick={props.onClick} >
			{hasIcon ? <i className={props.icon} /> : null}
			{text}
		</button>
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
	text: PropTypes.string.isRequired,
	icon: PropTypes.string,
	secondary: PropTypes.bool,
	disabled: PropTypes.bool,
	submit: PropTypes.bool,
	loading: PropTypes.bool,
	center: PropTypes.bool,
}

export default OButton;