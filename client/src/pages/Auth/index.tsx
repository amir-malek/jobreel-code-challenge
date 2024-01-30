import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Auth() {

    return <>
        <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
        </Routes>
    </>
}