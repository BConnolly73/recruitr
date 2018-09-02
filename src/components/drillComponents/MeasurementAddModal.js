import React from 'react';
import Modal from 'react-modal';

export default class MeasurementAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: 0,
            role: 0,
            error: '',
            roles: []
        }

        this.onOpen = this.onOpen.bind(this);
    }

    onMeasurementNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name : name }));
    }

    onMeasurementRoleChange = (e) => {
        const role = e.target.value;
        this.setState(() => ({ role : role }));
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
        } else if (this.state.role === -1) {
            this.setState(() => ({ error: 'Please provide a role' }));
        } else {
            this.closeAndResetModal({
                'name': this.state.name,
                'type': this.state.type,
                'role': this.state.role
            })
        }
    }

    closeModalNoReturn = (e) => {
        this.closeAndResetModal();
    }

    closeAndResetModal = (return_val = null) => {
        this.setState(() => ({ 
            error: '',
            name: '',
            type: 0,
            role: 0
        }));

        this.props.handleMeasurementModalClose(return_val);
    }

    onOpen() {
        this.setState(() => ({ roles: this.props.roles }));
    }

    render() {
        return (
            <div>
                <form>
                    <Modal
                        isOpen={this.props.open_measurement_modal}
                        onRequestClose={this.closeModalNoReturn}
                        contentLabel="Add Measurement"
                        closeTimeoutMS={200}
                        className="modal"
                        onAfterOpen={this.onOpen}
                        props={this.props}
                    >
                        <h3 className="modal__title">Enter Measurement Details</h3>
                        {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                        <input
                            type="text"
                            id="new_measurement_name"
                            placeholder="Measurement Name"
                            onChange={this.onMeasurementNameChange}
                        />

                        <select id="new_measurement_type" onChange={this.onMeasurementTypeChange}>
                            <option value={0}> Select a Measurement Type </option>
                            <option value={1}> Out of 10 </option>
                            <option value={2}> Time </option>
                            <option value={3}> Count </option>
                            <option value={4}> Ratio </option>
                        </select>

                        <select id="new_measurement_role" onChange={this.onMeasurementRoleChange}>
                            <option value={-1}> Select a Role </option>
                            {
                                this.state.roles.map((role, index) => {
                                    return (
                                        <option key={index} value={index}>{role.name}</option>
                                    )
                                })
                            }
                        </select>

                        <button className="button" onClick={this.handleSumbit}>OK</button>
                    </Modal>
                </form>
            </div>
        );
    }
}
