import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

import { FaCog } from 'react-icons/fa';

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <div>
                    <Link className="header__title" to="/dashboard">
                        <h1>Clipboard</h1>
                    </Link>
                </div>
                <div className="header-options-container">
                    <FaCog
                        className={"settings-icon"}
                        onClick={() => {props.history.push('/settings')}}
                        size={"2rem"}
                    />
                    <button className="button button--link" onClick={props.startLogout}>Logout</button>
                    
                </div>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);