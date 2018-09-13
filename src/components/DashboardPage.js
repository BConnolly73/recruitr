import React from 'react';
import BigMenuButton from './BigMenuButton';

const DashboardPage = (props) => (
    <div>
        <BigMenuButton name={"Create Participant"} onClick={() => {props.history.push('/new_participant')}}/>
        <BigMenuButton name={"Create Drill"} onClick={() => {props.history.push('/new_drill')}}/>
        <BigMenuButton name={"Submit Results"} onClick={() => {props.history.push('/submit_dashboard')}}/>
        <BigMenuButton name={"Review Tryout Results"} onClick={() => {props.history.push('/review')}}/>
    </div>
);

export { DashboardPage as default };