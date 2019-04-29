import React from 'react';


const BigButton = (props) => {
    const { icon, text, onClick } = props;
    return (
        <div className="big-button-container" onClick={onClick}>
            <div className="big-button-icon">
                {icon}
            </div>
            <div className="big-button-text">
                {text}
            </div>
        </div>
    );
}

export { BigButton as default };