import React from 'react';
import { connect } from 'react-redux';

import selectAllDrills from '../../selectors/drills';

class SubmitRecordDashboard extends React.Component {
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
                                        <button
                                            onClick={() => {
                                                this.props.history.push({
                                                    pathname: `/submit/${drill.id}`,
                                                    state: {
                                                        drill: drill
                                                    }
                                                })}
                                            }
                                        >{drill.name}</button>
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
    return {
        drills: selectAllDrills(state.drills)
    }
}

export default connect(mapStateToProps, undefined)(SubmitRecordDashboard);