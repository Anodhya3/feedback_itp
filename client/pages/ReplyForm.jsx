import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ReplyForm = () => {

    const [feedback, setFeedback] = React.useState({});
    const [answer, setAnswer] = React.useState('');
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3500/feedbacks/getFeedback/' + id)
            .then(res => {
                setFeedback(res.data);
            })
            .catch((err) => console.log(err))
    }, [id]);

    const handleSubmit = () => {

        const data = {
            answer
        }

        axios.put(`http://localhost:3500/feedbacks/addAnswer/${id}`,data)
        .then(() => {
            navigate('/feedback/confirmed');
        })
        .catch((err) => console.log(err));
    }

    return(
        <>
            <div className='p-lg-5 bg-secondary m-auto mt-5' style={{width: '80vw'}}>
                <p className='p-2 fs-5 text-white'>Name : {feedback.name}</p>
                <p className='p-2 fs-5 text-white'>Email : {feedback.email}</p>
                <p className='p-2 fs-5 text-white'>phone : {feedback.contactNumber}</p>
                <p className='p-2 fs-5 text-white'>Feedback :<br/> <p className='p-1'>{feedback.question}</p></p>
                <div>
                    <p className='p-2 fs-5 text-white'>
                        ANSWER :
                    </p>
                    <textarea className='m-4' cols="70" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea>
                </div>
                <div>
                    <button type='button' className='m-4 btn btn-primary' onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </>
    )
}

export default ReplyForm;