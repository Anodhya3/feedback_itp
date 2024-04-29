import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const FeedbackReport = () => {
    const [confirmedFeedbacks, setConfirmedFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(null);

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

    const downloadPdf = () => {
        const content = contentRef.current;

        html2canvas(content)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p','mm','a4',true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth *ratio,imgHeight * ratio);
                pdf.save("document.pdf")
            })
    };

    return (
        <div className='p-4'>
            <table className="table table-striped" id="feedback-table" ref={contentRef}>
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
                {confirmedFeedbacks.map((feedback, index) => (
                    <tr key={index}>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-center'>{feedback.name}</td>
                        <td className='text-center'>{feedback.email}</td>
                        <td className='text-center'>{feedback.contactNumber}</td>
                        <td className='text-center'>{feedback.question}</td>
                        <td className='text-center'>{feedback.rating}</td>
                        <td className='text-center'>{feedback.Reply}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='p-2'>
                <button className='btn btn-primary' onClick={downloadPdf}>Download PDF</button>
            </div>
        </div>
    );
}

export default FeedbackReport;
