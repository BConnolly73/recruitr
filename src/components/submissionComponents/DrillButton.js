import React from 'react';

class DrillButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { drill, history } = this.props;
        return (
            <div key={drill.id} className="drill-select-button__container">
                <button
                    className="drill-select-button__button input-group__item"
                    onClick={() => {
                        history.push({
                            pathname: `/submit/${drill.id}`,
                            state: {
                                drill: drill
                            }
                        })}
                    }
                >{drill.name}</button>
            </div>
        )
    }
}

export { DrillButton as default };