import React from 'react';
import BigMenuButton from './BigMenuButton';

const DashboardPage = (props) => (
    <div>
        <BigMenuButton name={"Create Participant"} onClick={() => {props.history.push('/new_participant')}}/>
        <BigMenuButton name={"Edit Participant"} onClick={() => {alert("EDIT_PART")}}/>
        <BigMenuButton name={"Submit Results"} onClick={() => {alert("SUBMIT_RESULTS")}}/>
        <BigMenuButton name={"Review Tryout Results"} onClick={() => {alert("REVIEW")}}/>
    </div>
);

export { DashboardPage as default };