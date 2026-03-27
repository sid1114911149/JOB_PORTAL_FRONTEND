import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    // ✅ Toggle select/deselect
    const changeHandler = (value) => {
        if (selectedValue === value) {
            setSelectedValue("");   // 🔁 deselect
        } else {
            setSelectedValue(value);
        }
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="filter-card">
            <h1 className="filter-title">Filter Jobs</h1>
            <hr className="filter-divider" />

            {filterData.map((data, index) => (
                <div className="filter-section" key={index}>
                    <h1 className="filter-heading">{data.filterType}</h1>

                    {data.array.map((item, idx) => (
                        <div
                            key={idx}
                            className={`filter-option ${selectedValue === item ? "active" : ""}`}
                            onClick={() => changeHandler(item)}
                        >
                            <input
                                type="radio"
                                checked={selectedValue === item}
                                readOnly
                            />
                            <label>{item}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default FilterCard;