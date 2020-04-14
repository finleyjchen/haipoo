import React from "react"
import { Router, Location } from "@reach/router"
import Poem from "../components/Messages/Poem"
import Messages from "../components/Messages"
import Layout from "../components/layout"
const Poets = () => {
    return(
        <Layout>
        <Location>
        {({ location })=> (
            <Router basepath="/poet">
            <Messages path="/all" />
            <Poem path="/:userId" key={location.key} />
        </Router>
        )}
        </Location>
        </Layout>
        )
}

export default Poets