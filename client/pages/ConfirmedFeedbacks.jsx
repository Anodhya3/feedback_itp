import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmedFeedbacks = () => {
    const [confirmedFeedbacks, setConfirmedFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:3500/feedbacks/feedbacksWithReply')
            .then((response) => {
                setConfirmedFeedbacks(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, []); 

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Question</th>
                        <th>Rating</th>
                        <th>Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {confirmedFeedbacks.map((feedback, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.contactNumber}</td>
                            <td>{feedback.question}</td>
                            <td>{feedback.rating}</td>
                            <td>{feedback.Reply}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConfirmedFeedbacks;
