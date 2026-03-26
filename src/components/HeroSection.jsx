import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="hero">
            <div className="hero-content">
                <span className="hero-badge">
                    No. 1 Job Hunt Website
                </span>

                <h1 className="hero-title">
                    Search, Apply & <br />
                    Get Your <span>Dream Jobs</span>
                </h1>

                <p className="hero-desc">
                    Unlock opportunities that match your passion and take the next step toward your dream career
                </p>

                <div className="hero-search">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Button onClick={searchJobHandler} className="hero-btn">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection