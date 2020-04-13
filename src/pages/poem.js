import React from "react"
import { Router, Location } from "@reach/router"
import Poem from "../components/Messages/Poem"
import Messages from "../components/Messages"
import Layout from "../components/layout"
const Poems = () => {
    return(
        <Layout>
        <Location>
        {({ location })=> (
            <Router basepath="/poem">
            <Messages path="/all" />
            <Poem path="/:messageId" key={location.key} />
        </Router>
        )}
        </Location>
        </Layout>
        )
}

export default Poems