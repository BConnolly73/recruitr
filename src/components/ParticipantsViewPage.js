import React from 'react';
import { connect } from 'react-redux';

import ParticipantsViewItem from './ParticipantsViewItem'
import selectAllParticipants from '../selectors/participants';

export class ParticipantsViewPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.participants.length === 0? (
                        <div>No Participants Created...</div>
                    ) : (
                        this.props.participants.map((participant, index) => {
                            return <ParticipantsViewItem {...participant} key={participant.id} /> 
                        })
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        participants: selectAllParticipants(state.participants)
    }
}

export default connect(mapStateToProps, undefined)(ParticipantsViewPage);