import { Link, useNavigate,useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useAuth } from "../context/AuthContext"
import {useState} from "react"


export default function Navbar({dark,setDark}) {
  const { user, favCount } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }
  const handleToggleTheme = () => {
     setDark(!dark)
     document.body.style.background = dark ? "#ffffff" : "#000000"
     document.body.style.color = dark ? "#000000" : "#ffffff"
  }
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        borderBottom: "1px solid #222",
        background: "#111"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        <Link
          to={location.search ? '/${location.search} ': "/"}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 18,
            whiteSpace: "nowrap"
          }}
        >
          FormForge
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14, overflowX: "auto", whiteSpace: "nowrap" }}>
          <Link to="/" style={{ textDecoration: "none", opacity: 0.8, color: "white" }}>Home</Link>
          <Link to="/favorites" style={{ textDecoration: "none", opacity: 0.8, color: "white" }}>Favorites({favCount})</Link>
          <button
            onClick={handleToggleTheme}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #222",
              background: dark ? "#222" : "#ddd",
              color: dark ? "white" : "black",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            {dark ? "Light" : "Dark"}
          </button>
          {!user ? (
            <>
              <Link to="/login" style={{ textDecoration: "none", opacity: 0.8, color: "white" }}>Login</Link>
              <Link to="/register" style={{ textDecoration: "none", opacity: 0.8, color: "white" }}>Register</Link>
            </>
          ) : (
            <>
              <span style={{ opacity: 0.7, fontSize: 13 }}>{user.email}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #222",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}