import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

const OLink = (props) => {
	const selectedStyle = props.selected && "selected "
	const styles = "nav-bar-link " + selectedStyle + props.customStyle;
	const isDisabled = props.disabled || props.loading;
	const onClickRoute = () => {props.history.push(props.route)};
	const hasRoute = props.route !== undefined;
	const onClick = hasRoute ? onClickRoute : props.onClick;

	return (
		<div
			className={styles}
			disabled={isDisabled}
			onClick={() => {onClick(); props.onRouteChanged(props.route)}} >
			{props.text}
		</div>
	);
}

OLink.defaultProps = {
	secondary: false,
	disabled: false,
	selected: false,
}

OLink.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	selected: PropTypes.bool,
}

export default withRouter(OLink);