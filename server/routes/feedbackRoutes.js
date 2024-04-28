import express from 'express';
import {Feedback} from '../models/feedbackModel.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    const feedback = await Feedback.find({});
    res.json(feedback);
  });

  router.get('/allPendingFeedbacks', async (req, res) => {
    try {
        const pendingFeedbacks = await Feedback.find({ Reply: { $exists: false } });
        res.json(pendingFeedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/feedbacksWithReply', async (req, res) => {
  try {
      const feedbacksWithReply = await Feedback.find({ Reply: { $exists: true, $ne: "" } });
      res.json(feedbacksWithReply);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


router.get('/getFeedback/:id', async (req, res) => {
  const id = req.params.id;

  const feedback =await Feedback.findById(id)

  res.status(200).json(feedback)

})

  router.post('/add', async (req, res) => {
    const { name, email, contactNumber, question, rating } = req.body;
    const newFeedback = new Feedback({
      name,
      email,
      contactNumber,
      question,
      rating
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  });
  
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    const data = {
      name : req.body.name,
      email : req.body.email,
      contactNumber : req.body.phone,
      question : req.body.question,
      rating : req.body.rating,
      Reply : req.body.answer
    }

    const result = await Feedback.findByIdAndUpdate(id,data);

    if(!result) {
      return res.status(404).send({message:"Feedback can not be found"});
    }

    return res.status(200).json(result)
    
  });

router.put('/addAnswer/:id', async (req, res) => {
  const { id } = req.params;

  const answer = {
    Reply : req.body.answer
  }

  const result = await Feedback.findByIdAndUpdate(id,answer);

  if(!result) {
    return res.status(404).send({message:"Feedback can not be found"});
  }

  return res.status(200).json(result)

});
  
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Feedback.findByIdAndDelete((id));
    res.status(204).send();
  });

  

export default router;