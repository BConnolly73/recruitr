import React from 'react';
import { connect } from 'react-redux';

import selectAllParticipants from '../../selectors/participants';

class SubmitDrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: props.drill ? props.drill.roles : []
        }
    }

    onOneToTenChange = (e) => {
        const value = e.target.value;
        //this.setState(() => ({}));
    }

    onTimeChange = (e) => {
        const time = e.target.value;
        //this.setState(() => ({}));
    }

    onCountChange = (e) => {
        const count = e.target.value;
        //this.setState(() => ({}));
    }

    onRatioChange = (e) => {
        const ratio = e.target.value;
        //this.setState(() => ({}));
    }

    buildMeasurementInput(type) {
        if (type == 1) {
            return (
                <div>
                    <select onChange={this.onOneToTenChange}>
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
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>{this.props.drill.name}</h1>
                <h3>{this.props.drill.description}</h3>
                {
                    this.props.drill.roles.map((role, index) => {
                        return (
                            <div key={index}>
                                <p>Role Name: {role.name}</p>
                                <select>
                                    <option value={0}>Select Participants</option>
                                    {
                                        this.props.participants.map((player, index) => {
                                            return (
                                                <option key={index+1} value={index + 1}>{player.first_name} {player.last_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    role.measurements.map((measurement, index) => {
                                        return (
                                            <div key={index}>
                                                <p>Measurement: {measurement.name}</p>
                                                {this.buildMeasurementInput(measurement.type)}
                                            </div>
                                        )
                                    })
                                }
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
