import React from 'react';

const Checkbox = (props) => (
    <label>
        <input type="checkbox" {...props} />
        <span className="checkbox-label">
            {props.label}
        </span>
    </label>
)

export { Checkbox as default};