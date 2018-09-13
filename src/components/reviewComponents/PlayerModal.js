import React from 'react';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class PlayerModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.handlePlayerModalClose();
    }

    getPositionName(id) {
        switch(id) {
            case '1':
                return 'Keeper';
            case '2':
                return 'Chaser';
            case '3':
                return 'Beater';
            case '4':
                return 'Any'
            default:
                return 'N/A';
        }
    }

    getTeamName(id) {
        switch(id) {
            case '1':
                return 'University of Guelph';
            case '2':
                return 'Royal City Quidditch';
            case '3':
                return 'Any Team';
            default:
                return 'N/A';
        }
    }

    getYear(id) {
        switch(id) {
            case '1':
                return 'First Year';
            case '2':
                return 'Second Year';
            case '3':
                return 'Third Year';
            case '4':
                return 'Fourth Year';
            case '5':
                return 'Fourth Year +';
            case '6':
                return 'Graduate Student';
            case '7':
                return 'Not a Student';
            default:
                return 'N/A';
        }
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

        return this.buildDrillTabs(structured_drills);
    }

    //TODO:
    // - Pass list of expected roles to say nothing avaible
    // - Find error with player average calc
    buildDrillTabs(drills) {
        console.log(drills);
        return (
            <div>
            {
                drills.map((drill) => {
                    return (
                        <TabPanel key={drill.id}>
                        {
                            drill.roles !== undefined ? (
                                <div>
                                    {
                                        drill.roles.map((role) => {
                                            return (
                                                <div className="role_container" key={role.role_id}>
                                                    <b>{role.role_id.substring(23, role.role_id.length)}</b>
                                                    {
                                                        role.measurements.map((metric, metric_index) => {
                                                            return (
                                                                <div className="measurement_container" key={metric_index}>
                                                                    <p>{metric.measurement}</p>
                                                                    <div className="measurement_container_no_title">
                                                                        <p>Player Average: {parseFloat(metric.values.player_average).toFixed(2)}</p>
                                                                        <p>Tryout Average: {parseFloat(metric.values.total_average).toFixed(2)}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p>No results for this drill</p>
                            )
                        }
                        </TabPanel>
                    )
                })
            }
            </div>
        )
    }

    render() {
        return (
            <Modal
                isOpen={!!this.props.player}
                onRequestClose={this.closeModal}
                contentLabel={(this.props.player) ? this.props.player.first_name + ' ' + this.props.player.last_name : ''}
                closeTimeoutMS={200}
                className="modal"
            >
                <div>
                    <h3 className="modal__title">{(this.props.player) ? this.props.player.first_name + ' ' + this.props.player.last_name : ''}</h3>
                    <div className="description_container">
                        <p className="small_text">{this.props.player && this.props.player.about}</p>
                        <p className="description_text">{this.props.player && this.props.player.email}</p>
                        <p className="description_text">Position: {this.props.player && this.getPositionName(this.props.player.position)}</p>
                        <p className="description_text">Team: {this.props.player && this.getTeamName(this.props.player.team)}</p>
                        <p className="description_text">Academic Year: {this.props.player && this.getYear(this.props.player.year)}</p>
                    </div>
                </div>

                <Tabs>
                    <TabList>
                    {
                        this.props.drills.map((drill) => {
                            return (
                                <Tab key={drill.id}>{drill.name}</Tab>
                            )
                        })
                    }
                    </TabList>

                    {
                        this.props.player && this.structureDrillResultObject(this.props.player.results, this.props.drills)
                    }
                </Tabs>

                <button className="button" onClick={this.closeModal}>OK</button>
            </Modal>
        )
    }
}