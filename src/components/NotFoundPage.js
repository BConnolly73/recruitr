import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>YOU DON"T KNOW WHERE YOU GOING! 404!!</p>
        <Link to="/">GO HOME FUCKER</Link>
    </div>
);

export { NotFoundPage as default };