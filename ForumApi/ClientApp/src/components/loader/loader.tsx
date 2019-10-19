import React, { Component } from "react";

export class Loader extends Component<any,any>{
    render(){
        return <span className="fa fa-circle-o-notch fa-spin" style={{fontSize:'24px',height:'fit-content',textAlign:'center',margin:'auto'}}></span>;
    }
}