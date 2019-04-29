import React from 'react';

import { FaPlus } from 'react-icons/fa';
import BigButton from './../../Reusable/BigButton';
import DrillCard from './DrillCard';

import { connect } from 'react-redux';
import { selectDrills } from './../../../selectors/drills';
import { startGetDrills } from '../../../actions/drills';

class DrillDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { drills } = this.props;

        return (
            <div className="content-container">
                <h1>Drills</h1>

                <div className="drill-dashboard-container">
                    <BigButton
                        icon={<FaPlus size={"3rem"} />}
                        text={"New Drill"}
                        onClick={() => {this.props.history.push('/create_drill')}}
                    />

                    {
                        drills && drills.map((drill, index) => {
                            return (
                                <DrillCard
                                    id={drill.id}
                                    name={drill.name}
                                    description={drill.description}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        drills: selectDrills(state.drills)
    };
};

const mapDispatchToProps = (dispatch) => ({
    //startGetDrills: (drills) => dispatch(startGetDrills(drills))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrillDashboard);