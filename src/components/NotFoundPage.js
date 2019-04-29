import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>Return home</p>
        <Link to="/">Home</Link>
    </div>
);

export { NotFoundPage as default };