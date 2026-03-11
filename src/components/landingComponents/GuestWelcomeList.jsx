import useAuth from "../../hooks/useAuth";
import GuestWelcomeCard from "../common/GuestWelcomeCard";

const GuestWelcomeList = () => {
  const { user } = useAuth();

  // ✅ If logged in, don't show
 // if (user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <GuestWelcomeCard />
    </div>
  );
};

export default GuestWelcomeList;
