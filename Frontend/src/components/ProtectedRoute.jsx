import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // If token does not exist
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/" replace />;
  }

  // Render protected content
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  );
}

export default ProtectedRoute;