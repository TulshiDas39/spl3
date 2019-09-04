import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { sampleDescription } from "./data";
import { InputEditor } from "../../elements/inputEditor/InputEditor";

export class Discussion extends Component<any, any>{
    public render() {
        return (
            <div id="discussion_flow">
                <Post description={sampleDescription} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর ২ টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    <Post description={sampleDescription} />
                </div>

                <h2>আপনার উত্তর</h2>
                <InputEditor />

            </div>
        )
    }
}