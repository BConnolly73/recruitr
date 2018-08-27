import React from 'react';
import { connect } from 'react-redux';

const ParticipantsViewItem = ({first_name, last_name, email, year, position, team, about}) => (
    <div>
        <p>First Name: {first_name}</p>
        <p>Last Name: {last_name}</p>
        <p>Email: {email}</p>
        <p>Year: {year}</p>
        <p>Position: {position}</p>
        <p>Team: {team}</p>
        <p>About: {about}</p>
        <div>
            <h1> *********************** </h1>
        </div>
    </div>
);

export { ParticipantsViewItem as default };