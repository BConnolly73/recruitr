import React from 'react';
import { Link } from 'react-router-dom';

const PlayerPanel = (props) => (
    <div className="player_panel">
        <p>{props.player.first_name} {props.player.last_name}</p>
        <button onClick={props.openModal}>Open</button>
    </div>
);

export { PlayerPanel as default };