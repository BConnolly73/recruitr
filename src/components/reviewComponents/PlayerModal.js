import React from 'react';
import Modal from 'react-modal';

export default class PlayerModal extends React.Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.handlePlayerModalClose();
    }

    getPositionName(id) {
        switch(id) {
            case '1':
                return 'Keeper';
            case '2':
                return 'Chaser';
            case '3':
                return 'Beater';
            case '4':
                return 'Any'
            default:
                return 'N/A';
        }
    }

    getTeamName(id) {
        switch(id) {
            case '1':
                return 'University of Guelph';
            case '2':
                return 'Royal City Quidditch';
            case '3':
                return 'Any Team';
            default:
                return 'N/A';
        }
    }

    getYear(id) {
        switch(id) {
            case '1':
                return 'First Year';
            case '2':
                return 'Second Year';
            case '3':
                return 'Third Year';
            case '4':
                return 'Fourth Year';
            case '5':
                return 'Fourth Year +';
            case '6':
                return 'Graduate Student';
            case '7':
                return 'Not a Student';
            default:
                return 'N/A';
        }
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
                <h4>{this.props.player && this.props.player.email}</h4>
                <h5>Position: {this.props.player && this.getPositionName(this.props.player.position)}</h5>
                <h5>Team: {this.props.player && this.getTeamName(this.props.player.team)}</h5>
                <h5>Academic Year: {this.props.player && this.getYear(this.props.player.year)}</h5>

                

                <button className="button" onClick={this.closeModal}>OK</button>
            </Modal>
        )
    }
}