import Auth from "./AuthComponents/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

const App = () => {

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;