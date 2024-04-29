import React from "react"
import {Route,Routes} from "react-router-dom"
import PendingFeedbacks from "../pages/PendingFeedbacks"
import ConfirmedFeedbacks from "../pages/ConfirmedFeedbacks"
import ReplyForm from "../pages/ReplyForm.jsx";
import UpdateConfirmFeedback from "../pages/updateConfirmFeedback.jsx";
import DeleteConfirmed from "../pages/DeleteConfirmed.jsx";
import CreateFeedback from "../pages/CreateFeedback.jsx";
import FeedbackReport from "../pages/FeedbackReport.jsx";

function App() {

  return (
    <Routes>
      <Route path='/' element={<PendingFeedbacks/>}></Route>
      <Route path='/feedback/confirmed' element={<ConfirmedFeedbacks/>}></Route>
      <Route path='/feedback/replyFeedback/:id' element={<ReplyForm/>}></Route>
      <Route path='/feedback/updateConfirm/:id' element={<UpdateConfirmFeedback/>}></Route>
      <Route path='/feedback/deleteConfirm/:id' element={<DeleteConfirmed/>}></Route>
      <Route path='/feedback/addFeedback' element={<CreateFeedback/>}></Route>
      <Route path='/feedback/Report' element={<FeedbackReport/>}></Route>
    </Routes>
  )
}

export default App
