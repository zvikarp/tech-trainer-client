import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OButton extends Component {
	render() {

		const hasIcon = this.props.icon !== undefined;
		const center = this.props.center ? "center " : "";
		const type = this.props.secondary ? "secondary " : "primary ";
		const styles = center + type + this.props.customStyle;
		const text = this.props.loading ? "WORKING ON IT..." : this.props.text;
		const isSubmitButton = this.props.submit ? "submit" : null;
		const isDisabled = this.props.disabled || this.props.loading;

		return (
			<button
				type={isSubmitButton}
				className={styles}
				disabled={isDisabled}
				onClick={this.props.onClick} >
				{hasIcon ? <i className={this.props.icon} /> : null}
				{text}
			</button>
		);
	}
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