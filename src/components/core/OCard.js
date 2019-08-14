import React from "react";
import PropTypes from 'prop-types';

const OCard = props => {
	const styles = "ocard " + (props.wide && "wide");

	return <div className={styles} >{props.children}</div>;
};

OCard.defaultProps = {
	wide: false,
}

OCard.propTypes = {
	wide: PropTypes.bool,
}

export default OCard;
