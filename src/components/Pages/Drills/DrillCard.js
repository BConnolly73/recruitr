import React from 'react';

const DrillCard = (props) => {
    const { name, description, id } = props;

    return (
        <div className="drill-card" key="id">
            <p>{name}</p>
            <p>{description}</p>
        </div>
    );
}

export { DrillCard as default };