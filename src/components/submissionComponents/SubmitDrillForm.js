import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import selectAllParticipants from '../../selectors/participants';

class SubmitDrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles_to_participants: []
        }

        this.participant_options = this.buildParticipantOptions();
    }

    buildMeasurementInput(type) {
        if (type == 1) {
            return (
                <div>
                    <select>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            )
        } else if (type == 2) {
            return (
                <div>
                    <input type="number" placeholder="0.00" />
                </div>
            )
        } else if (type == 3) {
            return (
                <div>
                    <input type="number" placeholder="0.00" />
                </div>
            )
        } else if (type == 4) {
            return (
                <div>
                    <input type="number" placeholder="0.00" />
                </div>
            )
        } else {
            return (<div>Nothing</div>)
        }
    }

    onSubmit() {
        console.log('Submit');
    }

    buildParticipantOptions() {
        var participant_options = [];
        let i = 0;

        for (i = 0 ; i < this.props.participants.length ; i++) {
            participant_options[i] = {
                'value': i,
                'label': this.props.participants[i].first_name + ' ' + this.props.participants[i].last_name
            };
        }

        console.log(participant_options);

        return participant_options;
    }

    onParticipantChange = (selector, selection) => {
        let old_roles = this.state.roles_to_participants;
        old_roles[selector] = selection.value;
        this.setState(() => ({ roles_to_participants : old_roles }));
    }

    render() {
        return (
            <div>
                <h1>{this.props.drill.name}</h1>
                <h3>{this.props.drill.description}</h3>
                {
                    this.props.drill.roles.map((role, index) => {
                        return (
                            <div className="sumbit_drill_role_container" key={index}>
                                <p>Role Name: {role.name}</p>
                                <Select
                                    onChange={this.onParticipantChange.bind(this, index)}
                                    options={this.participant_options}
                                    placeholder={'Select a Player'}
                                    name={`participant_selector_${index}`}
                                />
                            </div>
                        )
                    })
                }

                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        drill: state.drills.find((drill) => {
            return drill.id === props.match.params.id;
        }),
        participants: selectAllParticipants(state.participants)
    }
};

export default connect(mapStateToProps, undefined)(SubmitDrillForm);
