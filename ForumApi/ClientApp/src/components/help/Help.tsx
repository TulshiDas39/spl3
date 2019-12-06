import React from "react";
import "./help.scss";
import { Button } from "@material-ui/core";
export class Help extends React.Component<any, any>{

    render() {
        return (
            <div className="container">
                <h2 className="heading">How can we help you today?</h2>
                <Button className="sendMailBtn" variant="outlined" color="primary" href="mailto:bsse0811@iit.du.ac.bd?Subject=Help">
                    Send Your Query
                </Button>
            </div>
        )
    }
}