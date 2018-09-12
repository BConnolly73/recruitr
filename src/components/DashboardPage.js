import React from 'react';
import BigMenuButton from './BigMenuButton';

const DashboardPage = (props) => (
    <div>
        <BigMenuButton name={"Create Participant"} onClick={() => {props.history.push('/new_participant')}}/>
        <BigMenuButton name={"View Participant"} onClick={() => {props.history.push('/participants')}}/>
        <BigMenuButton name={"Submit Results"} onClick={() => {props.history.push('/submit_dashboard')}}/>
        <BigMenuButton name={"Review Tryout Results"} onClick={() => {props.history.push('/review')}}/>

        <BigMenuButton name={"Create Drill"} onClick={() => {props.history.push('/new_drill')}}/>
    </div>
);

export { DashboardPage as default };