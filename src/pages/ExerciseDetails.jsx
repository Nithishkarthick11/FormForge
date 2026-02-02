import { useParams, Link,useLocation } from "react-router-dom"
import { exercises } from "../data/exercises"
import { useAuth } from "../context/AuthContext"
import { db } from "../firebase"
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function ExerciseDetails() {
  const { id } = useParams()
  const { user,loading:authLoading} = useAuth()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const location =useLocation()
  
 
  const ex = exercises.find((x) => x.id === id)

useEffect(() => {
  const checkSaved = async () => {
    if (authLoading) return

    if (!user || !ex) {
      setSaved(false)
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const ref = doc(db, "users", user.uid, "favorites", ex.id)
      const snap = await getDoc(ref)
      setSaved(snap.exists())
    } catch (e) {
      setSaved(false)
    } finally {
      setLoading(false)
    }
  }

  checkSaved()
}, [user, authLoading, ex?.id])
  const handleToggleFavorite = async () => {
    if (!user) return alert("Please login to save favorites")
    if (!ex) return

    const ref = doc(db, "users", user.uid, "favorites", ex.id)

    if (saved) {
      await deleteDoc(ref)
      setSaved(false)
    } else {
      await setDoc(ref, {
        id: ex.id,
        name: ex.name,
        muscle: ex.muscle,
        equipment: ex.equipment,
        difficulty: ex.difficulty,
        image: ex.image,
        createdAt: Date.now()
      })
      setSaved(true)
    }
  }

  if (!ex) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
        <h2>Exercise not found</h2>
        <Link to="/" style={{ color: "#bbb", textDecoration: "none" }}>← Back to Home</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
      <Link to={`/${location.search}`} style={{ color: "#bbb", textDecoration: "none" }}>← Back</Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ marginTop: 14 }}>{ex.name}</h1>

        <button
          onClick={handleToggleFavorite}
          disabled={loading}
          style={{
            padding: "12px 14px",
            borderRadius: 14,
            border: "1px solid #222",
            background: saved ? "#222" : "white",
            color: saved ? "white" : "black",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading ? "Loading..." : saved ? "Saved ✅" : "Save to Favorites"}
        </button>
      </div>

      <div
        style={{
          marginTop: 14,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #222",
          background: "inherit"
        }}
      >
        <img
          src={ex.image}
          alt={ex.name}
          style={{ width: "100%", height: "auto",maxHeight:420, objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          marginTop: 18,
          padding: 16,
          border: "1px solid #222",
          background: "inherit",
          borderRadius: 20
        }}
      >
        <p style={{ opacity: 0.7, marginTop: 0 }}>
          Muscle: <b style={{ color: "inherit" }}>{ex.muscle}</b> • Equipment:{" "}
          <b style={{ color: "inherit" }}>{ex.equipment}</b> • Difficulty:{" "}
          <b style={{ color: "inherit" }}>{ex.difficulty}</b>
        </p>

        <h2 style={{ marginTop: 12 }}>Correct Form Steps ✅</h2>

        <ol style={{ lineHeight: 2, marginTop: 10,paddingleft:0,marginleft:0,listStylePosition:"inside" }}>
          {ex.steps.map((step, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}