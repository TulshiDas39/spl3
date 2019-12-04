import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

export class Footer extends React.Component<any, any>{

    render() {
        return (
            <div className="footerDiv">
                <div className="optionSet">
                    <Link to="#">&copy;tulshidas</Link>
                    <Link to = "#">Terms</Link>
                    <Link to="#">Privacy</Link>
                    <Link to="#">Security</Link>
                    <Link to="#">Help</Link>
                </div>
                <div className="optionSet">
                    <Link to="/" className="fa fa-hand-o-up" style={{ color: 'teal' }}></Link>
                </div>
                <div className="optionSet">
                    <Link to="/">Contact</Link>
                    <Link to="/">Pricing</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Blog</Link>
                    <Link to= "/">API</Link>
                </div>
            </div>
        )
    }
}