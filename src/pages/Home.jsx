import { useMemo, useState } from "react"
import { exercises } from "../data/exercises"
import ExerciseCard from "../components/ExerciseCard"
import { useSearchParams } from "react-router-dom";


export default function Home() {
  const [q, setQ] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
const muscle = searchParams.get("muscle") || "all"
const equipment = searchParams.get("equipment") || "all"


  const filtered = useMemo(() => {
    return exercises.filter((e) => {
      const matchQ = e.name.toLowerCase().includes(q.toLowerCase())
      const matchMuscle = muscle === "all" || e.muscle === muscle
      const matchEquip = equipment === "all" || e.equipment === equipment
      return matchQ && matchMuscle && matchEquip 
    })
  }, [q, muscle, equipment])

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 16px 16px" }}>
      <h1 style={{ fontSize: 42, marginBottom: 10 }}>Find the correct form 🏋️</h1>
      <p style={{ opacity: 0.7, marginTop: 0 }}>
        Search workouts and learn step-by-step form with images.
      </p>

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gap: 12,
          gridTemplateColumns: "1fr"
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search exercises..."
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #222",
            background: "#111",
            color: "white",
            outline: "none"
          }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={muscle}
            onChange={(e) =>  setSearchParams(prev =>{ prev.set("muscle", e.target.value )
               return prev })
}
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #222",
              background: "#111",
              color: "white"
            }}
          >
            <option value="all">All Muscles</option>
            <option value="chest">Chest</option>
            <option value="legs">Legs</option>
            <option value="core">Core</option>
            <option value="arms">Arms</option>
          </select>

          <select
            value={equipment}
             onChange={(e) =>
  setSearchParams(prev => {
    prev.set("equipment", e.target.value)
    return prev
  })
}
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #222",
              background: "#111",
              color: "white"
            }}
          >
            <option value="all">All Equipment</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="dumbbell">Dumbbell</option>
          </select>

          

        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
        }}
      >
        {filtered.map((ex) => (
          <ExerciseCard key={ex.id} ex={ex} />
        ))}
      </div>
    </div>
  )
}