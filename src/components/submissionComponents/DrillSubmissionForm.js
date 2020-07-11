import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import ParticipantSelector from './../ParticipantSelector';
import MeasurementForm from './MeasurementForm';

class DrillSubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:   [],
            success: '',
            roles_to_participants: [],
            roles_to_measurements: []
        }

        this.onParticipantChange = this.onParticipantChange.bind(this);
        this.onMeasurementChange = this.onMeasurementChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setError = this.setError.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    onParticipantChange(e, roleIndex) {
        let currentRoleToParticipant = this.state.roles_to_participants;
        currentRoleToParticipant[roleIndex] = e.value;
        this.setState(() => ({
            roles_to_participants : currentRoleToParticipant
        }));
    }

    onMeasurementChange(value, roleIndex, measurementIndex) {
        console.log(`Received ${value}, ${roleIndex}, ${measurementIndex}`);

        let currentRoleToMeasurement = this.state.roles_to_measurements;
        if (typeof currentRoleToMeasurement[roleIndex] === 'undefined') {
            currentRoleToMeasurement[roleIndex] = [];
        }

        currentRoleToMeasurement[roleIndex][measurementIndex] = value;
        this.setState(() => ({
            roles_to_measurements : currentRoleToMeasurement
        }));
    }

    onSubmit(e,r,t) {
        e.preventDefault();
        const { roles_to_participants, roles_to_measurements } = this.state;
        const isValid = this.validateForm(roles_to_participants, roles_to_measurements);

        if (isValid) {
            this.submitForm();
        }
    }

    validateForm(selectedParticipants, selectedMeasurements) {
        const { participants, drill } = this.props;
        let i, j = 0;
        let valid = true;


        if (drill.roles.length !== selectedParticipants.length) {
            this.setError('Missing Participant');
            valid = false;
        }

        if (drill.roles.length !== selectedMeasurements.length) {
            this.setError('Missing Role');
            valid = false;
        }

        for (i = 0; i < selectedParticipants.length; i++) {
            if (selectedParticipants[i] === 0) {
                this.setError(`Participant ${i+1} is missing`);
                valid = false;
            }
        }

        i = 0;

        for (i = 0; i < selectedMeasurements.length; i++) {
            const role = selectedMeasurements[i];
            if (typeof role === 'undefined') {
                this.setError(`Measurement ${j+1} on role ${i+1} is missing`);
                valid = false;
            }

            for (j = 0; j < role.length; j++) {
                if (role[j] === 0) {
                    this.setError(`Measurement ${j+1} on role ${i+1} is missing`);
                    valid = false;
                }
            }
        }

        setTimeout(() => {this.clearErrors()}, 3000);
        return valid;
    }

    submitForm() {
        const { participants, drill } = this.props;
        const { roles_to_participants, roles_to_measurements, startAddResults } = this.state;

        let i = 0;
        let j = 0;
        
        for (i = 0; i < roles_to_participants.length; i++) {
            const current_participant = this.getParticipantByIndex(roles_to_participants[i].value - 1, participants);
            const current_role = this.getRoleNameByIndex(i, drill);

            for (j = 0; j < drill.roles[i].measurements.length; j++) {
                const submit_data = {
                    'value': roles_to_measurements[i][j],
                    'time': moment().format('YYYY-MM-DD HH:mm:ss')
                };

                const firebase_path = `results/${current_participant.id}/${drill.id}_${drill.name}/${drill.id}_${i}_${current_role.name}/${current_role['measurements'][j].name}`;
                startAddResults(submit_data, firebase_path);
            }
        }

        this.clearForm();
    }

    getParticipantByIndex(index, participants) {
        return participants[index];
    }

    getRoleNameByIndex(index, drill) {
        return drill.roles[index];
    }

    clearForm() {
        this.setState(() => ({
            errors:  [],
            success: '',
            roles_to_participants: [],
            roles_to_measurements: []
        }));
    }

    setError(error) {
        let errors = this.state.errors;
        errors[errors.length] = error;

        this.setState(() => ({
            errors: errors,
            success: ''
        }));
    }

    clearErrors() {
        this.setState(() => ({
            errors: [],
            success: ''
        }));
    }

    render() {
        const { participants, drill } = this.props;
        const { roles } = drill;
        const { roles_to_measurements, errors } = this.state;

        return (
            <div>
                {roles.map((role, index) => {
                    return (
                        <div className="sumbit_drill_role_container" key={`role_${index}`}>
                            <h4>Role Name: {role.name}</h4>

                            <ParticipantSelector
                                onChange={(e) => { this.onParticipantChange(e, index) }}
                                participants={participants}
                            />

                            <MeasurementForm
                                role={role}
                                roleIndex={index}
                                roleValues={roles_to_measurements}
                                onMeasurementChange={(e, _, m_index) => { this.onMeasurementChange(e, index, m_index) }}
                            />
                        </div>
                    );
                })}

                {
                    errors.map((error, index) => (
                        <p className="form__error" key={index}>ERROR: {error}</p>
                    ))
                }

                {
                    this.state.success && (<p className="form__error">{this.state.success}</p>)
                }
                <button className="submit_button" onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddResults: (result, path) => dispatch(startAddResults(result, path))
});

export default connect(null, mapDispatchToProps)(DrillSubmissionForm);
