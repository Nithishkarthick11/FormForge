import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setErr(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "90px 16px 16px" }}>
      <h1>Welcome back</h1>

      <form onSubmit={handleLogin} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #222",
            background: "#111",
            color: "white",
            outline: "none"
          }}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #222",
            background: "#111",
            color: "white",
            outline: "none"
          }}
        />

        <button
          disabled={loading}
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #222",
            background: "white",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {err ? <p style={{ color: "tomato" }}>{err}</p> : null}
      </form>

      <p style={{ marginTop: 12, opacity: 0.8 }}>
        New user?{" "}
        <Link to="/register" style={{ color: "#bbb", textDecoration: "none" }}>
          Register
        </Link>
      </p>
    </div>
  )
}