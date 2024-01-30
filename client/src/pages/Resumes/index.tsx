import { Route, Routes } from "react-router-dom";
import CreateResume from "./Create";
import ResumeList from "./List";

export default function Resumes() {

    return <>
        <Routes>
            <Route element={<CreateResume />} path="/create" />
            <Route element={<ResumeList />} path="/list" />
        </Routes>
    </>
}