import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function HaveAcc() {
    const { pathname } = useLocation()
    return (
        pathname === "/login" ? <label htmlFor="terms" className="text-gray-600">
            Don't have an account {" "}
            <Link to={"/signup"} className="text-blue-600 underline">
                sign up
            </Link>
        </label> : <label htmlFor="terms" className="text-gray-600">
            Already have an Account {" "}
            <Link to={"/login"} className="text-blue-600 underline">
                Log In
            </Link>
        </label>
    )
}