import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export default function Login(){

const navigate = useNavigate();
const { login } = useContext(AuthContext);

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async (e) => {

  e.preventDefault();

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  console.log(data);

  if (data.success) {

    login({
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    role: data.user.role,
});

    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } else {

    alert(data.message);

  }

};

return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">

<form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">

<h2 className="text-2xl font-bold text-center">Login</h2>

<input
type="email"
placeholder="Email"
className="w-full p-3 bg-black border border-gray-700 rounded"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-3 bg-black border border-gray-700 rounded"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="w-full bg-orange-500 py-3 rounded font-bold">
Login
</button>

</form>

</div>

)

}