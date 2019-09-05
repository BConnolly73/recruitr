import React from 'react';
import Modal from 'react-modal';

export default class PlayerAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            error: ''
        }
    }

    onPlayerRoleChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name : name }));
    }

    handleSumbit = () => {
        if (!this.state.name) {
            this.setState(() => ({ error: 'Please provide a role name' }));
        } else {
            this.closeAndResetModal({
                'name': this.state.name,
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
        }));

        this.props.handleRoleModalClose(return_val);
    }

    render() {
        return (
            <div>
                <form>
                    <Modal
                        isOpen={this.props.open_role_modal}
                        onRequestClose={this.closeModalNoReturn}
                        contentLabel="Add Role"
                        closeTimeoutMS={200}
                        className="modal"
                    >
                        <h3 className="modal__title">Enter Role Name</h3>
                        {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                        <input
                            type="text"
                            id="new_player_role"
                            placeholder="Role Name"
                            onChange={this.onPlayerRoleChange}
                        />

                        <button className="button" onClick={this.handleSumbit}>OK</button>
                    </Modal>
                </form>
            </div>
        );
    }
}
