import React from 'react';

import MeasurementAddModal from './MeasurementAddModal';
import PlayerAddModal from './PlayerAddModal';

export default class DrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.drill ? props.drill.name : '',
            description: props.drill ? props.drill.description : '',
            roles: props.drill ? props.drill.roles : [],
            open_measurement_modal: false,
            open_role_modal: false,
            error: ''
        };
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name : name }));
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description : description }));
    }

    //Validates Data
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: 'Please provide a name' }));
        } else if (!this.state.description) {
            this.setState(() => ({ error: 'Please provide a description' }));
        } else if (!this.state.roles) {
            this.setState(() => ({ error: 'Please provide at least role ' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                name: this.state.name,
                description: this.state.description,
                roles: this.state.roles
            });
        }
    }

    openRoleModal = (e) => {
        e.preventDefault();
        this.setState(() => ({ open_role_modal : true }));
    }

    onRoleConfirm = (role) => {
        if (role) {
            this.setState((prevState) => ({
                open_role_modal : false,
                roles: prevState.roles.concat(role)
            }));
        } else {
            this.setState(() => ({ open_role_modal : false}))
        }
    }

    openMeasurementModal = (e) => {
        e.preventDefault();
        this.setState(() => ({ open_measurement_modal : true }));
    }

    onMeasurementConfirm = (measurement) => {
        if (measurement) {
            this.setState((prevState) => ({ 
                open_measurement_modal : false
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
            this.setState(() => ({ open_measurement_modal : false }))
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                    <input
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />

                    <button type="button" onClick={this.openRoleModal}>Add Player Role</button>

                    {
                        this.state.roles.length > 0
                        && <button type="button" onClick={this.openMeasurementModal}>Add Measurement</button>
                    }

                    {
                        (this.state.roles.length > 0) ? (
                            <div>
                            </div>
                        ) : (
                            <div>
                            </div>
                        )
                    }

                    <div>
                        <input type="submit" value="Save Drill" />
                    </div>

                </form>

                <MeasurementAddModal
                    handleMeasurementModalClose={this.onMeasurementConfirm}
                    open_measurement_modal={this.state.open_measurement_modal}
                    roles={this.state.roles}
                />

                <PlayerAddModal
                    handleRoleModalClose={this.onRoleConfirm}
                    open_role_modal={this.state.open_role_modal}
                />
            </div>
        )
    }
}

