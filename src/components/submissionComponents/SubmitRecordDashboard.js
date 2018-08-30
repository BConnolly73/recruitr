import React from 'react';
import { connect } from 'react-redux';

import selectAllDrills from '../../selectors/drills';

export  class SubmitRecordDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.drills.length > 0 ? (
                        <div>
                            {this.props.drills.map((drill) => {
                                return (
                                    <div key={drill.id}>
                                        <p>Drill named {drill.name} described by {drill.description}</p>
                                        {drill.measurements && drill.measurements.map((measurement, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>Measurement: {measurement.name}</p>
                                                    <p>Type: {measurement.type}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            <p>Please create a drill</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        drills: selectAllDrills(state.drills)
    }
}

export default connect(mapStateToProps, undefined)(SubmitRecordDashboard);