import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


const PendingFeedbacks = () => {

    const [pendingFeedbacks, setPendingFeedback] = useState([]);
    const [loading, setLoading] = useState(false);

    const data = { pendingFeedbacks: pendingFeedbacks };

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3500/feedbacks/allPendingFeedbacks')
            .then(res => {
                setPendingFeedback(res.data);
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
              </tr>
              </thead>
              <tbody>
              {pendingFeedbacks.map((feedback, index) => (
                  <tr key={index}>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-center'>{feedback.name}</td>
                      <td className='text-center'>{feedback.email}</td>
                      <td className='text-center'>{feedback.contactNumber}</td>
                      <td className='text-center'>{feedback.question}</td>
                      <td className='text-center'>{feedback.rating}</td>
                      <td className='text-center'>
                          <Link to={`/feedback/replyFeedback/${feedback._id}`}>
                            <button type='button' className='btn btn-primary'>Reply</button>
                          </Link>
                      </td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>
  )
}

export default PendingFeedbacks
