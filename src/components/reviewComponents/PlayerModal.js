import React from 'react';
import Modal from 'react-modal';
import {
    id_to_year,
    id_to_position,
    id_to_team
} from './../../selectors/id_to_string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default class PlayerModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.handlePlayerModalClose();
    }

    structureDrillResultObject(results, drills) {
        let structured_drills = [];

        drills.map((drill, index) => {
            let matched = false;
            let structured_roles = [];

            for (let [d_id, roles] of Object.entries(results)) {
                if (d_id.substring(0, 20) === drill.id) {
                    matched = true;
                    for (let [r_id, measurements] of Object.entries(roles)) {
                        let current_role = {
                            'role_id': r_id,
                            'measurements': []
                        }

                        for (let [m_id, values] of Object.entries(measurements)) {
                            current_role.measurements.push({
                                'measurement': m_id,
                                'values': values
                            });
                        }

                        structured_roles.push(current_role);
                    }
                }
            }

            if (matched) {
                structured_drills.push({'roles': structured_roles});
            } else {
                structured_drills.push({});
            }

            matched = false;
        });

        console.log(structured_drills);

        return this.showDrillTabs(structured_drills);
    }
    

    showDrillTabs() {
        return (
            <Tabs>
                <TabList>
                <Tab>Title 1</Tab>
                <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        );
    }

    render() {
        const { player } = this.props;
        console.log(this.props);
        return (
            <Modal
                isOpen={!!player}
                onRequestClose={this.closeModal}
                contentLabel={(player) ? player.first_name + ' ' + player.last_name : ''}
                closeTimeoutMS={200}
                className="modal"
            >
                <div>
                    <h3 className="modal__title">{(player) ? player.first_name + ' ' + player.last_name : ''}</h3>
                    <div className="description_container">
                        <p className="small_text">{player && player.about}</p>
                        <p className="description_text">{player && player.email}</p>
                        <p className="description_text">Position: {player &&  id_to_position(player.position)}</p>
                        <p className="description_text">Team: {player && id_to_team(player.team)}</p>
                        <p className="description_text">Academic Year: {player && id_to_year(player.year)}</p>
                    </div>
                </div>

                {
                    this.props.player &&
                    this.structureDrillResultObject(this.props.player.results, this.props.drills)
                }

                <button className="button" onClick={this.closeModal}>Close</button>
            </Modal>
        )
    }
}