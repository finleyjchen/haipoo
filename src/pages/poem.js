import React from "react"
import { Router } from "@reach/router"

import Haipoo from "../templates/haipoo"
import Layout from "../components/layout"
const Poem = () => {
    return(
        <Router basepath="/poem">
            <Poem path="/:id" />
        </Router>
        )
}

export default Poem