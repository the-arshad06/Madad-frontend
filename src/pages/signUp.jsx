import { useEffect, useRef, useState } from "react"
import InputField from "../components/InputField"
import Checkbox from "../components/Checkbox"
import BtnComponent from "../components/BtnComponent"
import HaveAcc from "../components/HaveAcc"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()
    const [form, setform] = useState({ name: "", email: "", password: "" })
    const [check, setcheck] = useState(false)
    const [error, seterror] = useState("")
    const googleBtn = useRef(null);
    const url = "http://localhost:4000"
    
    function onchange(e) {
        setform({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value })
        console.log(e.target.type);
        setcheck(e.target.checked)
        seterror("")
    }
    
    // ✅ RE-INTEGRATED GOOGLE SIGN-UP LOGIC
    useEffect(() => {
        /* global google */ 
        if (window.google) {
            google.accounts.id.initialize({
                client_id:
                    "978012455765-5mp6056u22m5t3oei2jq3c8ur6msmg13.apps.googleusercontent.com",
                callback: async (res) => {
                    try {
                        const apiRes = await fetch(`${url}/user/google`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify(res),
                        });

                        const apiData = await apiRes.json();
                        console.log(apiData);

                        if (apiData) {
                            navigate("/");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                },
            });
            google.accounts.id.renderButton(
                googleBtn.current,
                { theme: "outline", size: "large", width: "320" }
            );
        }
    }, [url, navigate]); // Added navigate to dependency array for best practice

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(form);
        if (!form.name[0]) return seterror("Name is required")
        if (!form.password[0]) return seterror("Password is required")
        if (!form.email[0]) return seterror("Email is required")
        if (!check) return seterror("Accept terms and condition")
        try {
            const res = await fetch(`${url}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),

            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful ✅");
                navigate("/login")
            } else {
                seterror(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            seterror("Network error");
        }
    }

    return (
        // REDESIGN: Smoother background color
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            {/* REDESIGN: Enhanced Card Look */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center space-y-8 border border-gray-100">
                <div className="logo text-3xl font-extrabold text-indigo-600">YourBrand</div>
                <div className="title text-2xl font-bold text-gray-800">Create Account</div>
                <div className="inputs w-full flex flex-col space-y-6">
                    <InputField type="text" name={"name"} placeholder="Enter your Name" value={form.name} onChange={onchange} icon={"user"}/>
                    <InputField type="email" name={"email"} placeholder="Enter your Email" value={form.email} onChange={onchange} icon={"mail"}/>
                    <InputField type="password" name={"password"} placeholder="Enter your Password" value={form.password} onChange={onchange} icon={"lock"}/>
                    <Checkbox checked={check} onChange={onchange} name={"terms"} />
                    {/* UI FIX: Added mb-4 for better spacing below the error message */}
                    <p className="text-red-500 font-medium text-sm mb-4">{error}</p>
                    <BtnComponent text="Sign Up" onClick={handleSubmit} />
                    <HaveAcc />

                    {/* REDESIGN: Separator for visual hierarchy */}
                    <div className="relative flex justify-center items-center py-2">
                        <div className="absolute w-full border-t border-gray-200"></div>
                        <span className="relative bg-white px-3 text-sm text-gray-500">Or</span>
                    </div>

                    {/* ✅ GOOGLE BUTTON CONTAINER */}
                    <div ref={googleBtn} className="flex justify-center"></div>
                </div>
            </div>
        </div>
    )
}