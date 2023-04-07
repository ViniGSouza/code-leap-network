import { Posts } from './pages/Posts';
import { Welcome } from './pages/Welcome';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/posts' element={<Posts />}/>
      </Routes>
    </>
  )
}

export default App
