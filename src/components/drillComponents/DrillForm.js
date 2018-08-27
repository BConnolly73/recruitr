import React from 'react';

export default class DrillForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.drill ? props.drill.name : '',
            description: props.drill ? props.drill.description : '',
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
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                name: this.state.name,
                description: this.state.description,
            });
        }
    }

    render() {
        return (
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

                <div>
                    <button>Save Drill</button>
                </div>

            </form>
        )
    }
}

