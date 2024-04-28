import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const UpdateConfirmFeedback = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState(0);
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3500/feedbacks/getFeedback/' + id)
            .then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
                setPhone(res.data.contactNumber)
                setQuestion(res.data.question)
                setRating(res.data.rating)
                setAnswer(res.data.Reply)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id]);


    const handleEditConfirms = () => {

        const data = {
            name,
            email,
            phone,
            question,
            rating,
            answer
        }

        axios.put(`http://localhost:3500/feedbacks/update/${id}`,data)
            .then(() => {
                navigate('/feedback/confirmed');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(

        <div className='p-lg-5 bg-secondary m-auto mt-5' style={{width: '80vw'}}>
            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    Name :
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    email :
                </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    phone Number :
                </label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    question :
                </label>
            </div>
            <textarea className='m-4' cols="70" rows="10" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>

            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    Rating :
                </label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)}/>
            </div>

            <div className='p-2'>
                <label className='p-2 fs-5 text-white'>
                    Reply :
                </label>
            </div>
            <textarea className='m-4' cols="70" rows="10" value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
            <div className='p-2'>
                <button type='button' className='btn btn-success' onClick={handleEditConfirms}>Edit</button>
            </div>

        </div>

    )
}

export default UpdateConfirmFeedback;