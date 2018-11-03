import React from 'react';

import MeasurementAddModal from './MeasurementAddModal';

import {id_to_measurement_type} from '../../selectors/id_to_string'; 

export default class RoleAndMeasurementDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roles: this.props.roles,
            open_measurement_modal: false,
            open_measurement_role: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.roles !== this.props.roles) {
            this.setState({
                roles: nextProps.roles
            });
        }
    }

    openMeasurementModal = (role_index, e) => {
        e.preventDefault();
        this.setState(() => ({
            open_measurement_modal : true,
            open_measurement_role: role_index
        }));
    }

    onMeasurementConfirm = (measurement) => {
        if (measurement) {
            this.setState((prevState) => ({
                open_measurement_modal : false,
                open_measurement_role: undefined
            }));

            var current_roles = this.state.roles;
            if (!current_roles[measurement.role].measurements) {
                current_roles[measurement.role].measurements = [];
            }

            current_roles[measurement.role].measurements.push({
                'name' : measurement.name,
                'type' : measurement.type
            });

            this.setState(() => ({
                roles: current_roles
            }));

        } else {
            this.setState(() => ({
                open_measurement_modal : false,
                open_measurement_role: undefined
            }))
        }
    }

    render() {
        return (
            <div>
                <h3>Roles</h3>
                {
                    this.props.roles.map((role, r_index) => {
                        return (
                            <div key={r_index}>
                                <h5>{role.name}</h5>
                                {role.measurements.map((measurement, m_index) => {
                                    return (
                                        <div key={m_index}>
                                            <p>Measurement: {measurement.name}</p>
                                            <p>Type: {id_to_measurement_type(measurement.type)}</p>
                                        </div>
                                    )
                                })}
                                <button onClick={(e) => {this.openMeasurementModal(r_index, e)}}>Add Measurement</button>
                            </div>
                        )
                    })
                }

                <MeasurementAddModal
                    handleMeasurementModalClose={this.onMeasurementConfirm}
                    open_measurement_modal={this.state.open_measurement_modal}
                    roles={this.state.roles}
                    selected_role={this.state.open_measurement_role}
                />
            </div>
        )
    }
}