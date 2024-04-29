import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateFeedback = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState(0);
    const [question, setQuestion] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const navigate = useNavigate();

    const handleAddFeedback = () => {

        const nameRegex = /^[a-zA-Z\s]*$/;
        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /^\d{10}$/;

        if (!nameRegex.test(name)) {
            alert("Name should only contain letters and spaces.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Phone number should contain exactly 10 digits and only numbers.");
            return;
        }


        const newFeedback = {
            name,
            email,
            phone,
            question,
            rating
        }

        axios.post('http://localhost:3500/feedbacks/add',newFeedback)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div className='p-lg-5 m-auto mt-5' style={{width: '80vw', border: '1px solid'}}>
            <div className='m-2'>
                <label className='p-2 form-label'>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className='m-2'>
                <label className='p-2 form-label'>Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='m-2'>
                <label className='p-2 form-label'>phone number</label>
                <input type="number" onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className='m-2'>
                <label className='p-2 form-label'>Feedback</label>
            </div>
            <textarea className='m-4' cols="70" rows="10" onChange={(e) => setQuestion(e.target.value)}></textarea>

            <div className='m-2'>
                <label className='p-2 form-label'>Rating</label>
                <input type="number" onChange={(e) => setRating(e.target.value)}/>
            </div>

            <div className='m-2'>
                <button type='button' className='btn btn-success' onClick={handleAddFeedback}>Add Feedback</button>
            </div>
        </div>
    )
}

export default CreateFeedback;