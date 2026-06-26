import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      email,
      password,
    }),
  });

const data = await res.json();

if(data.success){
alert(data.message);
navigate("/login");
}else{
alert(data.message || "Registration failed");
}
}

return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">

<form onSubmit={handleRegister} className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">

<h2 className="text-2xl font-bold text-center">Create Account</h2>

<input
type="text"
placeholder="Name"
className="w-full p-3 bg-black border border-gray-700 rounded"
onChange={(e)=>setName(e.target.value)}
/>

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
Register
</button>

</form>

</div>

)

}