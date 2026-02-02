import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../firebase"
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { Link } from "react-router-dom"

export default function Favorites() {
  const { user, loading,setFavCount } = useAuth()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (loading) return
    if (!user) {
      setItems([])
      setFavCount(0)
      return
    }

    const ref = collection(db, "users", user.uid, "favorites")

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.docs.map((d) => d.data())
      setItems(data)
      setFavCount(data.length)
    })

    return () => unsub()
  }, [user, loading])

  const removeFav = async (id) => {
    if (!user) return
    await deleteDoc(doc(db, "users", user.uid, "favorites", id))
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
        <h1>Favorites</h1>
        <p style={{ opacity: 0.7 }}>Login to view saved workouts.</p>
        <Link to="/login" style={{ color: "#bbb", textDecoration: "none" }}>
          Go to Login →
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
      <h1>Favorites</h1>
      <p style={{ opacity: 0.7 }}>Your saved exercises</p>

      {items.length === 0 ? <p>No favorites saved yet.</p> : null}

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
        }}
      >
        {items.map((ex) => (
          <div
            key={ex.id}
            style={{
              border: "1px solid #222",
              background: "#111",
              borderRadius: 18,
              overflow: "hidden"
            }}
          >
            <Link to={`/exercise/${ex.id}`} style={{ textDecoration: "none" }}>
              <img
                src={ex.image}
                alt={ex.name}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />

              <div style={{ padding: 14 }}>
                <h3 style={{ margin: 0, color: "white" }}>{ex.name}</h3>
                <p style={{ margin: "8px 0 0", opacity: 0.7, color: "white" }}>
                  {ex.muscle} • {ex.equipment} • {ex.difficulty}
                </p>
              </div>
            </Link>

            <div style={{ padding: 14, paddingTop: 0 }}>
              <button
                onClick={() => removeFav(ex.id)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid #222",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}