import React from 'react';

export const BigMenuButton = (props) => (
    <div>
        <button
            onClick={props.onClick}
        >{props.name}</button>
    </div>
);

export {BigMenuButton as default};