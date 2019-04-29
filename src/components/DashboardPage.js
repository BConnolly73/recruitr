import React from 'react';

import MenuButton  from './MenuButton';

const DashboardPage = (props) => {
    return (
        <div className="content-container">
            <MenuButton
                onClick={() => {props.history.push('/create_participant')}}
                text={"Create Participant"}
            />

            <MenuButton
                onClick={() => {props.history.push('/drills')}}
                text={"Drills"}
            />
        </div>
    );
};

export { DashboardPage as default };