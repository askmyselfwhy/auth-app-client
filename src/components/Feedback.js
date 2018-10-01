import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
	render() {
		let { alert } = this.props;
		return (
			<div className="logs">
				<p className={alert.type}
					key={alert.type}
					dangerouslySetInnerHTML={{ __html: alert.message }}>
				</p>
			</div>
		)

	}
}
const mapStateToProps = (state) => ({
	alert: state.alerts
});
export default connect(mapStateToProps)(Feedback);
