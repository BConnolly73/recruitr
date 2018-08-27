import React from 'react';
import { connect } from 'react-redux';

import ParticipantForm from './ParticipantForm';
import { startAddParticipant } from '../../actions/participants';

export class NewParticipantPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (participant) => {
        this.props.startAddParticipant(participant);
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <h1>New Participant</h1>
                <ParticipantForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddParticipant: (participant) => dispatch(startAddParticipant(participant))
});

export default connect(undefined, mapDispatchToProps)(NewParticipantPage);