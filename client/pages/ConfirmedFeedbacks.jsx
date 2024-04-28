import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const ConfirmedFeedbacks = () => {
    const [confirmedFeedbacks, setConfirmedFeedback] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3500/feedbacks/feedbacksWithReply')
            .then(res => {
                setConfirmedFeedback(res.data);
                setLoading(false);

            })
            .catch((err) => {
                console.error('Error fetching feedbacks:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className='text-center'>No</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Phone Number</th>
                    <th className='text-center'>Question</th>
                    <th className='text-center'>Rating</th>
                    <th className='text-center'>Reply</th>
                    <th className='text-center'>Action</th>
                </tr>
                </thead>
                <tbody>
                {confirmedFeedbacks.map((feedback, index) => (
                    <tr key={index}>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-center'>{feedback.name}</td>
                        <td className='text-center'>{feedback.email}</td>
                        <td className='text-center'>{feedback.contactNumber}</td>
                        <td className='text-center'>{feedback.question}</td>
                        <td className='text-center'>{feedback.rating}</td>
                        <td className='text-center'>{feedback.Reply}</td>
                        <td className='text-center'>
                            <div className='d-flex gap-3'>
                                <Link to={`/feedback/updateConfirm/${feedback._id}`}>
                                    <button type='button' className='btn btn-success'>Edit</button>
                                </Link>

                                <Link to={`/feedback/DeleteConfirm/${feedback._id}`}>
                                    <button type='button' className='btn btn-danger'>Delete</button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConfirmedFeedbacks;
