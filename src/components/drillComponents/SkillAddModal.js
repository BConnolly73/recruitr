import React from 'react';
import Modal from 'react-modal';

export default class SkillAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: 0,
            error: ''
        }
    }

    onMeasurementNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name : name }));
    }

    onMeasurementTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({ type : type }));
    }

    handleSumbit = () => {
        if (!this.state.name) {
            this.setState(() => ({ error: 'Please provide a name' }));
        } else if (this.state.type === 0) {
            this.setState(() => ({ error: 'Please provide a type' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.handleClearSelectedOption({
                'name': this.state.name,
                'type': this.state.type
            });
            this.state.name = '';
            this.state.type = 0;
        }
    }

    render() {
        return (
            <div>
                <form>
                    <Modal
                        isOpen={this.props.open_modal}
                        onRequestClose={this.handleSumbit}
                        contentLabel="Add Skill"
                        closeTimeoutMS={200}
                        className="modal"
                    >
                        <h3 className="modal__title">Enter Skill Details</h3>
                        {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                        <input
                            type="text"
                            id="new_measurement_name"
                            placeholder="Skill Name"
                            onChange={this.onMeasurementNameChange}
                        />
                        <select id="new_measurement_type" onChange={this.onMeasurementTypeChange}>
                            <option value={0}> Select a Measurement Type </option>
                            <option value={1}> Out of 10 </option>
                            <option value={2}> Time </option>
                            <option value={3}> Count </option>
                            <option value={4}> Ratio </option>
                        </select>
                        <button className="button" onClick={this.handleSumbit}>OK</button>
                    </Modal>
                </form>
            </div>
        );
    }
}
