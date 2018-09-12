import React from 'react';
import Modal from 'react-modal';

export default class PlayerModal extends React.Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        console.log(this.props);
        this.props.handlePlayerModalClose();
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
                <h3 className="modal__title">{(this.props.player) ? this.props.player.first_name + ' ' + this.props.player.last_name : ''}</h3>
                <h4>{this.props.player && this.props.player.about}</h4>

                <button className="button" onClick={this.closeModal}>OK</button>
            </Modal>
        )
    }
}