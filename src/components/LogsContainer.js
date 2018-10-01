import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogsContainer extends Component {
	render() {
		let { alerts } = this.props;
		return (
			<div className="logs">
				{Object.keys(alerts).map(key => {
					let item = alerts[key];
					if (item) {
						return (
							<p className={item.className} key={item.id}
								dangerouslySetInnerHTML={{ __html: item.message }}>
							</p>
						)
					}
				})
				}
			</div>
		)

	}
}
const mapStateToProps = (state) => ({
	alerts: state.alerts
});
export default connect(mapStateToProps)(LogsContainer);
