import React, { useState, useEffect, useReducer } from 'react';
import Checkbox from './../Reusable/Checkbox';
import ContactInfo from '../Reusable/ContantInfo';

import { connect } from 'react-redux';
import { selectSettings } from './../../selectors/settings';
import { startUpdateSettings } from './../../actions/settings';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        const { particiapntFormChecks } = props.settings;
        this.state = {
            particiapntFormChecks: (particiapntFormChecks) ? particiapntFormChecks : {
                firstName: false,
                lastName: false,
                age: false,
                height: false,
                weight: false,
                about: false
            }
        }

        this.handleSaveSettings = this.handleSaveSettings.bind(this);
        this.handleOnCheckboxClick = this.handleOnCheckboxClick.bind(this);
    }

    handleSaveSettings() {
        this.props.startUpdateSettings(this.state);
    }

    handleOnCheckboxClick(container, value, e) {
        const checked = e.target.checked;
        this.setState(prevState => ({
            [container]: {
                ...prevState[container],
                [value]: checked
            }
        }));
    }

    render() {
        const renderParticipantFormOptions = () => {
            const optionsList = [
                {name: 'firstName', label: 'First Name', value: this.state.particiapntFormChecks.firstName},
                {name: 'lastName', label: 'Last Name', value: this.state.particiapntFormChecks.lastName},
                {name: 'age', label: 'Age', value: this.state.particiapntFormChecks.age},
                {name: 'height', label: 'Height', value: this.state.particiapntFormChecks.height},
                {name: 'weight', label: 'Weight', value: this.state.particiapntFormChecks.weight},
                {name: 'about', label: 'About', value: this.state.particiapntFormChecks.about},
            ];

            return (
                <div className="checkout-container">
                    {optionsList.map((option, index) => {
                        return (
                            <Checkbox
                                key={index}
                                checked={option.value}
                                onChange={(e) => {this.handleOnCheckboxClick('particiapntFormChecks', option.name, e)}}
                                label={option.label}
                            />
                        )
                    })}
                </div>
            );
        };

        return (
            <div className="content-container">
                <div>
                    <h2>Settings</h2>
                    <p>Configure your tryout settings</p>
                </div>
                <div>
                    <h3>Participant Form Configurations</h3>
                    <p>Check which questions you would to be avalible on the particiapnt registration form:</p>
                    {renderParticipantFormOptions()}
                </div>
                <ContactInfo />
                <div>
                    <button onClick={this.handleSaveSettings}>Save</button>
                </div>
            </div>
        );
    }
}