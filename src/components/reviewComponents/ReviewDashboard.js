import React from 'react';
import { connect } from 'react-redux';

import PlayerPanel from './PlayerPanel';
import PlayerModal from './PlayerModal';

import getAllParticipants from '../../selectors/participants';
import getAllResults from '../../selectors/results';
import getAllAverage from '../../selectors/average';
import selectAllDrills from '../../selectors/drills';

class ReviewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_player: undefined,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addAverageToPlayerObject = this.addAverageToPlayerObject.bind(this);

        this.final_results = this.addAverageToPlayerObject();
    }

    addAverageToPlayerObject() {
        this.final_results = this.props.results;

        for (let [p_id, drills] of Object.entries(this.props.results)) {
            for (let [d_id, roles] of Object.entries(drills)) {
                for (let [r_id, measurements] of Object.entries(roles)) {
                    for (let [m_id, values] of Object.entries(measurements)) {
                        this.props.average.map((drill) => {
                            if (drill.id === d_id.substring(0, 21)) {
                                this.final_results[p_id][d_id][r_id][m_id]['total_average'] = drill[r_id][m_id]['average']
                            }
                        });
                    }
                }
            }
        }

        return this.final_results;
    }

    handlePlayerClick(player) {
        this.openModal(player);
    }

    openModal(player) {
        player['results'] = this.final_results[player.id];
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
                    drills={this.props.drills}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        participants: getAllParticipants(state.participants),
        results: getAllResults(state.results),
        average: getAllAverage(state.average),
        drills: selectAllDrills(state.drills)
    }
};

export default connect(mapStateToProps)(ReviewDashboard);
