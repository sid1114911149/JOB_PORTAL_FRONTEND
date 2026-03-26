import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cyber Security Analyst",
    "Mobile App Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Software Tester",
    "Blockchain Developer",
    "AI Engineer",
    "Game Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <div className="carousel-container">
                <Carousel>
                    <CarouselContent className="carousel-content">
                        {category.map((cat, index) => (
                            <CarouselItem className="carousel-item" key={index}>
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    className="carousel-btn"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* <CarouselPrevious />
                    <CarouselNext /> */}
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel