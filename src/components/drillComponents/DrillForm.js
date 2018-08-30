import React from 'react';

import MeasurementAddModal from './MeasurementAddModal';

export default class DrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.drill ? props.drill.name : '',
            description: props.drill ? props.drill.description : '',
            measurements: props.drill ? props.drill.measurements : [],
            open_modal: false,
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
        } else if (this.state.measurements.length === 0) {
            this.setState(() => ({ error: 'Please provide at least one measurement' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                name: this.state.name,
                description: this.state.description,
                measurements: this.state.measurements
            });
        }
    }

    onSkillConfirm = (measurement) => {
        if (measurement) {
            this.setState((prevState) => ({ 
                open_modal : false,
                measurements: prevState.measurements.concat(measurement)
            }));
        } else {
            this.setState(() => ({ open_modal : false }))
        }
    }

    openSkillModal = (e) => {
        e.preventDefault();

        this.setState(() => ({ open_modal : true }));
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

                    <button type="button" onClick={this.openSkillModal}>Add Measurement</button>

                    {
                        (this.state.measurements.length > 0) ? (
                            <div>
                                {this.state.measurements.map((measurement, index) => {
                                    return (
                                        <div key={index}>
                                            <p>Measurement Name: {measurement.name}</p>
                                            <p>Measurement Type: {measurement.type}</p>
                                            <p>*******</p>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                <p>No Measurements</p>
                            </div>
                        )
                    }

                    <div>
                        <input type="submit" value="Save Drill" />
                    </div>

                </form>

                <MeasurementAddModal handleClearSelectedOption={this.onSkillConfirm} open_modal={this.state.open_modal}/>
            </div>
        )
    }
}

