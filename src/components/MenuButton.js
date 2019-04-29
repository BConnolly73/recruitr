import React from 'react';

const MenuButton = (props) => {
    const {
        text = 'Fill Text',
        onClick,
    } = props;

    return (
        <button 
            className="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export { MenuButton as default };