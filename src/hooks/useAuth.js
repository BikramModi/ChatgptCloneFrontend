import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

const useAuth = () => useContext(AuthContext); 
export default useAuth;


/*
//how to use in a component? use like this.......
const { login } = useAuth();
const navigate = useNavigate();
const [form, setForm] = useState({ email: "", password: "" });
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { token } = await loginUser(form);
        login({ email: form.email }, token);
        navigate("/dashboard");
    } catch (err) {
        console.error(err);
        alert("Login failed");
    }
};
*/