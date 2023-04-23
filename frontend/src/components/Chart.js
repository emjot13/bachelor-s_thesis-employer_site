import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList() {
    const [usersData, setUsersData] = useState([]);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setStartDate(event.target.elements.start_date.value);
        setEndDate(event.target.elements.end_date.value);
        let url = '/admin';
        axios.get(url, {params: {
            start_date: start_date,
            end_date: end_date
          }})
        .then(response => {
            setUsersData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <h1>Book List</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Date:
                    <input type="date" name="start_date" />
                </label>
                <label>
                    End Date:
                    <input type="date" name="end_date" />
                </label>
                <button type="submit">Search</button>
            </form>
            
            {usersData.map(book => (
                <li>
                    {/* <ul>{book}</ul> */}
                    <ul>{book.avg_sleep_per_hour}</ul>

                </li>
            ))}
           
        </div>
    );
}

export default UsersList;
