import { Route, Routes } from "react-router-dom";
import CreateResume from "./Create";
import ResumeList from "./List";
import EditResume from "./Edit";

export default function Resumes() {

    return <>
        <Routes>
            <Route element={<CreateResume />} path="/create" />
            <Route element={<ResumeList />} path="/list" />
            <Route element={<EditResume />} path="/:resumeId" />
        </Routes>
    </>
}