import { useEffect, useState, useRef } from "react";
import InputField from "../components/InputField";
import BtnComponent from "../components/BtnComponent";
import HaveAcc from "../components/HaveAcc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setform] = useState({ email: "", password: "" });
  const [error, seterror] = useState("");
  const url = "http://localhost:4000";
  const googleBtn = useRef(null); // ✅ Ref to attach Google button

  // ✅ Initialize Google login when component mounts (Logic untouched)
  useEffect(() => {
    /* global google */ 
    if (window.google) {
        // ... (Logic untouched)
      google.accounts.id.initialize({
        client_id:
          "854104136103-pd3n2tps6n0pfpo8k9h2qonef1tvdbc1.apps.googleusercontent.com",
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
              alert("Google login successful ✅");
              location.href = "https://islamic-studies.netlify.app";
            }
          } catch (err) {
            console.error("Google login error:", err);
          }
        },
      });

      // ✅ Render Google login button inside the div
      google.accounts.id.renderButton(googleBtn.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        width: "250",
      });

      google.accounts.id.prompt();
    }
  }, [url]);

  // ✅ handle input change (Logic untouched)
  function onchange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
    seterror("");
  }

  // ✅ handle normal email/password login (Logic untouched)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.password) return seterror("Password is required");
    if (!form.email) return seterror("Email is required");

    try {
      const res = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Login successful ✅");
        navigate("/");
      } else {
        seterror(
          data.error?.[0]?.message ||
            data.error?.[0]?.code ||
            data.error ||
            "Something went wrong"
        );
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
        <div className="logo text-3xl font-extrabold text-indigo-600">YourBrand</div> {/* Adjusted Logo Text */}
        <div className="title text-2xl font-bold text-gray-800">
          Sign In to Your Account
        </div>

        <div className="inputs w-full flex flex-col space-y-6">
          <InputField
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={form.email}
            onChange={onchange}
            icon={"mail"}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={form.password}
            onChange={onchange}
            icon={"lock"}
          />
          <p className="text-red-500 font-medium text-sm">{error}</p>

          <BtnComponent text="Login" onClick={handleSubmit} />
          
          {/* REDESIGN: Separator for visual hierarchy */}
          <div className="relative flex justify-center items-center py-2">
            <div className="absolute w-full border-t border-gray-200"></div>
            <span className="relative bg-white px-3 text-sm text-gray-500">Or</span>
          </div>
          
          <div ref={googleBtn} className="flex justify-center"></div>
          <HaveAcc />
        </div>
      </div>
    </div>
  );
}