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
            results: []
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addAverageToPlayerObject = this.addAverageToPlayerObject.bind(this);
    }

    addAverageToPlayerObject() {
        let results;

        for (let [p_id, drills] of Object.entries(this.props.results)) {
            for (let [d_id, roles] of Object.entries(drills)) {
                for (let [r_id, measurements] of Object.entries(roles)) {
                    for (let [m_id, values] of Object.entries(measurements)) {
                        this.props.average.map((drill) => {
                            if (drill.id === d_id.substring(0, 21)) {
                                console.log(drill[r_id][m_id]['average']);
                                results[p_id][d_id][r_id][m_id]['total_average'] = drill[r_id][m_id]['average']
                            }
                        });
                    }
                }
            }
        }

        this.setState(() => ({
            results: results
        }));
    }

    handlePlayerClick(player) {
        this.openModal(player);
    }

    openModal(player) {
        player['results'] = this.state.results;
        this.setState(() => ({ selected_player: player }))
    }

    closeModal() {
        this.setState(() => ({ selected_player: undefined }))
    }

    render() {
        console.log(this);

        return (
            <div className="content-container review_page_container">
                <h1 className="review_header">Tryout Results</h1>
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
                    results={this.addAverageToPlayerObject()}
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
