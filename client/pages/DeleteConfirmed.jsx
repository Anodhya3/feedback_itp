import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const DeleteConfirmed = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteConfirmed = () => {
        axios.delete(`http://localhost:3500/feedbacks/delete/${id}`)
            .then(() => {
                navigate('/feedback/confirmed')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <div className='p-lg-5 bg-secondary m-auto mt-5' style={{width: '80vw'}}>
            <p className='text-center fs-4 text-white'>Are you sure you want to delete this Feedback?</p>
            <div className='d-flex justify-content-center gap-3'>
                <button type="button" className="btn btn btn-danger" onClick={handleDeleteConfirmed}>Confirm</button>
                <Link to={'/feedback/confirmed'}>
                    <button type="button" className="btn btn-primary">Cancel</button>
                </Link>


            </div>
        </div>
    )
}

export default DeleteConfirmed;