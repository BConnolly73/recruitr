import React from 'react';
import { Link } from 'react-router-dom';


const ParticipantsViewItem = ({first_name, last_name, email, year, position, team, about, id}) => (
    <Link to={`edit_participant/${id}`}>
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
    </Link>
);

export { ParticipantsViewItem as default };