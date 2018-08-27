import React from 'react';
import { connect } from 'react-redux';

import DrillForm from './DrillForm';
import { startAddDrill } from '../../actions/drills';

export class NewDrillPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (drill) => {
        console.log(drill);
        this.props.startAddDrill(drill);
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <h1>New Drill</h1>
                <DrillForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddDrill: (drill) => dispatch(startAddDrill(drill))
});

export default connect(undefined, mapDispatchToProps)(NewDrillPage);