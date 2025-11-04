
import { useState } from "react"
import InputField from "../components/InputField"
import BtnComponent from "../components/btnComponent"
import HaveAcc from "../components/HaveAcc"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [form, setform] = useState({ email: "", password: "" })
    const [error, seterror] = useState("")

    function onchange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
        seterror("")
    }

    async function handleSubmit(e) {
        console.log(form);
        e.preventDefault();
        if (!form.password) return seterror("Password is required")
        if (!form.email) return seterror("Email is required")
        try {
            const res = await fetch(`https://madad-c0ci.onrender.com/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials : "include",
                body: JSON.stringify(form),
                
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert("Login successful ✅");
                navigate("/")
            } else {
                seterror(data.error[0]?.message || data.error[0]?.code || data.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            seterror("Network error");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center space-y-6">
                <div className="logo text-2xl font-bold text-blue-600">Logo</div>
                <div className="title text-xl font-semibold text-gray-800">Login to your Account</div>
                <div className="inputs w-full flex flex-col space-y-4">
                    <InputField type="email" name={"email"} placeholder="Enter your Email" value={form.email} onChange={onchange} />
                    <InputField type="password" name={"password"} placeholder="Enter your Password" value={form.password} onChange={onchange} />
                    <p className="text-red-500 b-500">{error}</p>
                    <BtnComponent text="Login" onClick={handleSubmit} />
                    <HaveAcc />
                </div>
            </div>
        </div>
    )
}