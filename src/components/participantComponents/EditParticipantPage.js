import React from 'react';
import { connect } from 'react-redux';

import ParticipantForm from './ParticipantForm';
import { startEditParticipant } from '../../actions/participants';

export class EditParticipantPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (participant) => {
        this.props.startEditParticipant(this.props.participant.id, participant);
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <h1>Edit Participant</h1>
                <ParticipantForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startEditParticipant: (id, participant) => dispatch(startEditParticipant(id, participant))
});

export default connect(undefined, mapDispatchToProps)(EditParticipantPage);