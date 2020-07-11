import React from 'react';
import { connect } from 'react-redux';

import DrillSubmissionForm from './DrillSubmissionForm';

import selectAllParticipants from '../../selectors/participants';
import { startAddResults } from '../../actions/results';


class SubmitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { drill, participants } = this.props;
        const { name, description } = drill;
        return (
            <div className="content-container">
                <h1>{name}</h1>
                <h5>{description}</h5>

                <DrillSubmissionForm
                    drill={drill}
                    participants={participants}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        drill: state.drills.find((drill) => {
            return drill.id === props.match.params.id;
        }),
        participants: selectAllParticipants(state.participants)
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddResults: (result, path) => dispatch(startAddResults(result, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitForm);
