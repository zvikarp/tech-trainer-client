import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./Tile.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Tile extends Component {

	onAdminClick() {
		this.props.history.push({
			pathname: '/profile',
			data: {"userId": this.props.user.id},
		});
	}

	renderTile() {
		return(
			<div id="tile">
          <h3 className="tile-points"> {this.props.user.points} </h3>
          <h3 className="tile-username"> {this.props.user.name} </h3>
        </div>
		);
	}

  render() {
		if (this.props.admin) {
			return (
				<div className="admin-tile-button" onClick={() => this.onAdminClick()}>
					{this.renderTile()}
				</div>
			);
		}
    else if (this.props.user) {
      return (this.renderTile());
    } else {
      return (
        <div id="tile">Loading...</div>
      );
    }
  }
	
	static propTypes = {
		history: PropTypes.object.isRequired
	}
}
	

export default withRouter(Tile);