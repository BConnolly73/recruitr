import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import InputNumber from 'rc-input-number';
import moment from 'moment';

import selectAllParticipants from '../../selectors/participants';
import { startAddResults } from '../../actions/results';


class SubmitDrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles_to_participants: [],
            roles_to_measurements: [],
            error: ''
        }

        this.participant_options = this.buildParticipantOptions();
        this.onSubmit = this.onSubmit.bind(this);
    }

    addMeasurementToState = (role_index, measurement_index, value) => {
        let old_measurement = this.state.roles_to_measurements;

        if (old_measurement[role_index] == undefined) {
            old_measurement[role_index] = [];
        }

        if (old_measurement[role_index][measurement_index] == undefined) {
            old_measurement[role_index][measurement_index] = [];
        }

        old_measurement[role_index][measurement_index] = value;
        this.setState(() => ({ roles_to_measurements: old_measurement }));
    }

    onOneToTenChange = (role_index, measurement_index, value) => {
        this.addMeasurementToState(role_index, measurement_index, value)
    }

    onCountChange = (role_index, measurement_index, value) => {
        this.addMeasurementToState(role_index, measurement_index, value)
    }

    onTimeChange = (role_index, measurement_index, value) => {
        this.addMeasurementToState(role_index, measurement_index, value)
    }

    buildMeasurementInput(type, role_index, measurement_index) {
        if (type == 1) { //One to ten
            return (
                <div>
                    <InputNumber
                        min={0}
                        max={10}
                        placeholder={'Enter Value'}
                        precision={0}
                        onChange={this.onOneToTenChange.bind(this, role_index, measurement_index)}
                    />
                </div>
            )
        } else if (type == 2) { //Time
            return (
                <div>
                    <InputNumber
                        min={0}
                        max={10000}
                        precision={2}
                        placeholder={'Enter Time'}
                        onChange={this.onTimeChange.bind(this, role_index, measurement_index)}
                    />
                </div>
            )
        } else if (type == 3) { //Count
            return (
                <div>
                    <InputNumber
                        min={0}
                        max={100}
                        placeholder={'Enter Count'}
                        precision={0}
                        onChange={this.onCountChange.bind(this, role_index, measurement_index)}
                    />
                </div>
            )
        } else {
            return (<div>Nothing</div>)
        }
    }

    // Validate the data
    onSubmit() {
        let i = 0;
        let j = 0;
        let error = false;

        // Make sure all roles are filled in state
        for (i = 0; i < this.props.drill.roles.length; i++) {
            const current_role = this.props.drill.roles[i];
            if (this.state.roles_to_participants[i] === undefined) {
                this.setState(() => ({ error: 'Select a participant for each role in the drill' }));
                error = true;
                i = current_role.length + 1;
            }

            for (j = 0; j < current_role.measurements.length; j++) {
                if (this.state.roles_to_measurements[i] === undefined || this.state.roles_to_measurements[i][j] === undefined) {
                    this.setState(() => ({ error: `Please enter a valid measurement` }));
                    error = true;
                    j = current_role.measurements.length + 1;
                }
            }
        }

        // Once all good
        if (!error) {
            this.setState(() => ({ error: '' }));
            console.log('Valid submit');
            this.createSubmitObject(this.props, this.state);
        } else {
            console.log('Error submitting');
        }
    }

    createSubmitObject(props, state) {
        console.log(props);
        console.log(state);
        let i = 0;
        let j = 0;
        
        for (i = 0; i < this.state.roles_to_participants.length; i++) {
            const current_participant = this.getParticipantByIndex(this.state.roles_to_participants[i], props);
            const current_role = this.getRoleNameByIndex(i, props);
            console.log(`Creating for participant ${current_participant.first_name} of role ${current_role.name}`);

            for (j = 0; j < this.state.roles_to_measurements[i].length; j++) {
                const submit_data = {
                    'value': this.state.roles_to_measurements[i][j],
                    'time': moment().unix()
                };

                let firebase_path = `results/${current_participant.id}/${this.props.drill.id}_${this.props.drill.name}/${this.props.drill.id}_${i}_${current_role.name}/${current_role['measurements'][j].name}`;
                this.props.startAddResults(submit_data, firebase_path);
            }
        }
    }

    getParticipantByIndex(index, props) {
        return props.participants[index];
    }

    getRoleNameByIndex(index, props) {
        return props.drill.roles[index];
    }

    buildParticipantOptions() {
        var participant_options = [];
        let i = 0;

        for (i = 0 ; i < this.props.participants.length ; i++) {
            participant_options[i] = {
                'value': i,
                'label': this.props.participants[i].first_name + ' ' + this.props.participants[i].last_name
            };
        }

        return participant_options;
    }

    onParticipantChange = (selector, selection) => {
        let old_roles = this.state.roles_to_participants;
        old_roles[selector] = selection.value;
        this.setState(() => ({ roles_to_participants : old_roles }));
    }

    render() {
        return (
            <div className="content-container">
                <h1>{this.props.drill.name}</h1>
                <h3>{this.props.drill.description}</h3>
                {
                    this.props.drill.roles.map((role, role_index) => {
                        return (
                            <div className="sumbit_drill_role_container" key={role_index}>
                                <p>Role Name: {role.name}</p>
                                <Select
                                    onChange={this.onParticipantChange.bind(this, role_index)}
                                    options={this.participant_options}
                                    placeholder={'Select a Player'}
                                    name={`participant_selector_${role_index}`}
                                />

                                
                                <div className="submit_drill_measurements_container" >
                                {
                                    role.measurements.map((measurement, measurement_index) => {
                                        return (
                                            <div key={measurement_index}>
                                                <p>Measurement: {measurement.name}</p>
                                                {this.buildMeasurementInput(measurement.type, role_index, measurement_index)}
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                }

                {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        drill: state.drills.find((drill) => {
            return drill.id === props.match.params.id;
        }),
        participants: selectAllParticipants(state.participants)
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddResults: (result, path) => dispatch(startAddResults(result, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDrillForm);
