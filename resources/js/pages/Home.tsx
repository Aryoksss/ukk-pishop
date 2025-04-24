import Carousel from '@/components/Carousel';
import Navbar from '@/components/Navbar';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Carousel />
                {/* Add more sections here as needed */}
            </main>
        </div>
    );
};

export default Home;
