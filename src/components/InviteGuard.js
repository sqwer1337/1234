import { Navigate } from "react-router-dom";

const InviteGuard = ({ children }) => {
  const inviteVerified = localStorage.getItem("inviteVerified");

  if (!inviteVerified) {
    return <Navigate to="/check-invite" replace />;
  }

  return children;
};

export default InviteGuard;