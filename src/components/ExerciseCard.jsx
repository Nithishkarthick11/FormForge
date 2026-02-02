import { Link } from "react-router-dom"
import { useLocation} from "react-router-dom"
 
export default function ExerciseCard({ ex }) {
  const location = useLocation()
  return (
    <Link to={`/exercise/${ex.id}${location.search}`}  style={{ textDecoration: "none" }}>
      <div
        style={{
          border: "1px solid #222",
          background: "#111",
          borderRadius: 18,
          overflow: "hidden"
        }}
      >
        <img
          src={ex.image}
          alt={ex.name}
          style={{ width: "100%", height: 160, objectFit: "cover" }}
        />

        <div style={{ padding: 14 }}>
          <h3 style={{ margin: 0, color: "white" }}>{ex.name}</h3>
          <p style={{ margin: "8px 0 0", opacity: 0.7, color: "white" }}>
            {ex.muscle} • {ex.equipment} • {ex.difficulty}
          </p>
        </div>
      </div>
    </Link>
  )
  }