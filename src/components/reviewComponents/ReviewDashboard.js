import React from 'react';
import { connect } from 'react-redux';

import PlayerPanel from './PlayerPanel';
import PlayerModal from './PlayerModal';

import getAllParticipants from '../../selectors/participants';
import getAllResults from '../../selectors/results';
import getAllAverage from '../../selectors/average';

class ReviewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_player: undefined,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handlePlayerClick(player) {
        this.openModal(player);
    }

    openModal(player) {
        player['results'] = this.props.results[player.id];
        this.setState(() => ({ selected_player: player }))
    }

    closeModal() {
        this.setState(() => ({ selected_player: undefined }))
    }

    render() {
        return (
            <div>
                <p>In the review dashboard</p>
                {this.props.participants.map((player) => {
                    return (
                        <PlayerPanel 
                            key={player.id} 
                            player={player} 
                            openModal={() => { this.handlePlayerClick(player) }}
                        />
                    )
                })}

                <PlayerModal
                    handlePlayerModalClose={this.closeModal}
                    player={this.state.selected_player}
                    average={this.props.average}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        participants: getAllParticipants(state.participants),
        results: getAllResults(state.results),
        average: getAllAverage(state.average)
    }
};

export default connect(mapStateToProps)(ReviewDashboard);
