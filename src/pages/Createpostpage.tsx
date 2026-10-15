import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Createpostpage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h1>Create a post!</h1>{" "}
      <button onClick={() => signOut(() => navigate("/", { replace: true }))}>
        Log Out!
      </button>
    </>
  );
};

export default Createpostpage;
