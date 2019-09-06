import React from 'react';
import { connect } from 'react-redux';

import DrillButton from './DrillButton';
import selectAllDrills from '../../selectors/drills';

class SubmitRecordDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getDrills = this.getDrills.bind(this);
    }

    getDrills() {
        if (this.props.drills.length > 0) {
            return (
                <div className="drill-button-container input-group">
                    {this.props.drills.map((drill) => {
                        return (
                            <DrillButton
                                drill={drill}
                                key={drill.id}
                                history={this.props.history}
                            />
                        )
                    })}
                </div>
            );
        }

        return (
            <div>
                <p>Please create a drill</p>
            </div>
        )
    }

    render() {
        return (
            <div className="content-container">
                {this.getDrills()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        drills: selectAllDrills(state.drills)
    }
}

export default connect(mapStateToProps, undefined)(SubmitRecordDashboard);