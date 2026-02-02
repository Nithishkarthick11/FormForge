import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/NavBar"
import Home from "./pages/Home"
import ExerciseDetails from "./pages/ExerciseDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favorites from "./pages/Favourites"
import {useState} from "react"

export default function App() {
  const [dark,setDark] = useState(true)
  return (
    <BrowserRouter>
      <div
        style={{
          background: dark ? "#111" : "#f3f4f6",
          color: dark ? "white" : "black",
          minHeight: "100vh"
        }}
        >
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}