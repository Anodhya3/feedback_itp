import React from "react"
import {Route,Routes} from "react-router-dom"
import PendingFeedbacks from "../pages/PendingFeedbacks"
import ConfirmedFeedbacks from "../pages/ConfirmedFeedbacks"

function App() {

  return (
    <Routes>
      <Route path='/feedback/pending' element={<PendingFeedbacks/>}></Route>
      <Route path='/feedback/confirmed' element={<ConfirmedFeedbacks/>}></Route>
    </Routes>
  )
}

export default App
