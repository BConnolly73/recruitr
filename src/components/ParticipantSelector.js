import React from 'react';
import Select from 'react-select';

class ParticipantSelector extends React.Component {
    constructor(props) {
        super(props);

        this.buildParticipantOptions = this.buildParticipantOptions.bind(this);
    }

    buildParticipantOptions(participants) {
        var participant_options = [];
        let i = 1;

        participant_options[0] = {
            'value': 0,
            'label': 'Select a Player'
        };

        for (i = 0 ; i < participants.length; i++) {
            participant_options[i+1] = {
                'value': i + 1,
                'label': participants[i].first_name + ' ' + participants[i].last_name
            };
        }

        return participant_options;
    }

    render() {
        const {onChange, name, value, participants} = this.props;
        const options = this.buildParticipantOptions(participants);
        return (
            <Select
                onChange={onChange}
                options={options}
                placeholder='Select a Player'
                name={name}
                value={value}
            />
        );
    }
}

export { ParticipantSelector as default };
