import React, { Component } from "react";

class NavBar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav className="navbar navbar-dark bg-dark mb-3">
					<a className="navbar-brand" href="#">
						WordBrush
					</a>

					<this.props.AccountButton />
				</nav>
			</React.Fragment>
		);
	}
}

export default NavBar;
