import React from 'react';

import { connect } from 'react-redux';
import { selectSettings } from './../../../selectors/settings';
import { startCreateParticipant } from './../../../actions/participants';

class CreateParticipantPage extends React.Component {
    constructor(props) {
        super(props);

        this.formConfigs = props.settings.particiapntFormChecks;
        this.state = {
            firstName: '',
            lastName: '',
            age: 0,
            height: 0,
            weight: 0,
            about: '',
            error: ''
        };

        this.submitParticipant = this.submitParticipant.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleFieldEntry = this.handleFieldEntry.bind(this);
    }

    submitParticipant() {
        if (this.validateForm(this.formConfigs)) {
            this.props.startCreateParticipant(this.state)
        }
    }

    validateForm(configs) {
        const { firstName, lastName, age, height, weight, about } = this.state;
        if (configs.firstName && firstName.trim() === '') {
            this.setState({error: 'Invalid First Name'});
            return false;
        }

        if (configs.lastName && lastName.trim() === '') {
            this.setState({error: 'Invalid Last Name'});
            return false;
        }

        if (configs.age && age === 0) {
            this.setState({error: 'Invalid Age'});
            return false;
        }

        if (configs.height && height === 0) {
            this.setState({error: 'Invalid Height'});
            return false;
        }

        if (configs.weight && weight === 0) {
            this.setState({error: 'Invalid Weight'});
            return false;
        }

        if (configs.about && about.trim() === '') {
            this.setState({error: 'Invalid About'});
            return false;
        }

        return true;
    }

    handleFieldEntry(field, event) {
        const value = event.target.value;
        this.setState({[field]: value})
    }

    render() {
        const { firstName, lastName, age, height, weight, about } = this.formConfigs;
        const { error } = this.state;
        const enabledFields = [
            {enabled: firstName, type: 'text', fieldName: 'firstName', label: 'First Name'},
            {enabled: lastName, type: 'text', fieldName: 'lastName', label: 'Last Name'},
            {enabled: age, type: 'number', fieldName: 'age', label: 'Age'},
            {enabled: height, type: 'number', fieldName: 'height', label: 'Height'},
            {enabled: weight, type: 'number', fieldName: 'weight', label: 'Weight'},
            {enabled: about, type: 'text', fieldName: 'about', label: 'About'},
        ];

        return (
            <div className="content-container">
                <h2>Create Participant</h2>

                {enabledFields.map((field, index) => {
                    const { enabled, type, fieldName, label } = field;
                    return enabled && (
                        <div key={index}>
                            <p>{label}:</p>
                            <input type={type} onChange={(e) => {this.handleFieldEntry(fieldName, e)}}/>
                        </div>
                    );
                })}

                {error && (<p>{error}</p>)}
                <button onClick={this.submitParticipant}>Create</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: selectSettings(state.settings)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startCreateParticipant: (participants) => dispatch(startCreateParticipant(participants))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateParticipantPage);