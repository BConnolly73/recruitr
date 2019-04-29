import React from 'react';

import { connect } from 'react-redux';
import { startCreateDrill } from './../../../actions/drills';
import { FaPlus } from 'react-icons/fa';

import BigButton from './../../Reusable/BigButton';

class CreateDrillPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            measurements: []
        };
        
        this.submitDrill = this.submitDrill.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleFieldEntry = this.handleFieldEntry.bind(this);
    }

    submitDrill() {
        if (this.validateForm()) {
            this.props.startCreateDrill(this.state);
        }
    }

    validateForm() {
        const { name, description, measurements } = this.state;

        if (name.trim() === '') {
            this.setState({ error: 'Invalid Drill Name'});
            return false;
        }

        if (description.trim() === '') {
            this.setState({ error: 'Invalid Drill Description'});
            return false;
        }

        // if (measurements.length === 0) {
        //     this.setState({ error: 'Invalid Drill Measurements'});
        //     return false;
        // }

        return true;
    }

    handleFieldEntry(field, event) {
        const value = event.target.value;
        this.setState({[field]: value})
    }

    render() {
        const { error, measurements } = this.state;
        const enabledDrillFields = [
            {enabled: true, type: 'text', fieldName: 'name', label: 'Drill Name'},
            {enabled: true, type: 'text', fieldName: 'description', label: 'Description'},
        ];

        return (
            <div className="content-container">
                <h1>Create Drill</h1>
                {enabledDrillFields.map((field, index) => {
                    const { enabled, type, fieldName, label } = field;
                    return enabled && (
                        <div key={index}>
                            <p>{label}:</p>
                            <input type={type} onChange={(e) => {this.handleFieldEntry(fieldName, e)}}/>
                        </div>
                    );
                })}

                {
                    measurements.map((measurement) => {
                        return (
                            <div>
                                {measurement.name}
                            </div>
                        )
                    })
                }

                <div>
                    <BigButton
                        icon={<FaPlus size={"2rem"}/>}
                        text={'Add Measurement'}
                        onClick={() => {console.log("Adding Measurement")}}
                    />
                </div>

                {error && (<p>{error}</p>)}
                <button onClick={this.submitDrill}>Create</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //settings: selectSettings(state.settings)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startCreateDrill: (drill) => dispatch(startCreateDrill(drill))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDrillPage);