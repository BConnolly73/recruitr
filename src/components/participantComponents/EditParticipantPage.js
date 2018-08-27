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
                <ParticipantForm onSubmit={this.onSubmit} participant={this.props.participant}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        participant: state.participants.find((participant) => {
            return participant.id === props.match.params.id;
        })
    }
}

const mapDispatchToProps = (dispatch) => ({
    startEditParticipant: (id, participant) => dispatch(startEditParticipant(id, participant))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditParticipantPage);