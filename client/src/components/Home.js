import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1>Welcome to the Fashion Social App!</h1>
            <p>
                Connect with fashion enthusiasts, explore channels dedicated to your favorite styles,
                and share your thoughts on the latest trends.
            </p>
            <div className="mt-4">
                <Link to="/channels" className="btn btn-primary me-2">
                    Explore Channels
                </Link>
            </div>
        </div>
    );
};

export default Home;
