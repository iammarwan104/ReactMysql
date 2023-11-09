import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MemberTeams from "./member_teams/member-teams"
import Dashboard from "../admin/dashboard"
import Portfolios from "../admin/member_teams/portfolios"
import Aside from "../admin/aside-component/aside"
export default function Admin() {
    return (
        <Router>
            <div className="flex w-screen bg-orange-200">
                <Aside />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/member-teams" element={<MemberTeams />} />
                    <Route path="/portfolios" element={<Portfolios />} />
                </Routes>
            </div>
        </Router>
    )
}