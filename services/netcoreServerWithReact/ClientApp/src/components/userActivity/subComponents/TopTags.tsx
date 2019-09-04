import React, { Component } from "react";
import "./styles/topTags.css";

export class TopTags extends Component<any, any>{
    public render() {
        return (
            <div className="top-tags">
                <span className="tag-head">শীর্ষ ট্যাগসমুহ(১,২০৪)</span>
                {this.getFirstLineTag()}
                {this.getSecondLineTag()}
                {this.getThirdLineTag()}
            </div>
        )
    }

    private getFirstLineTag(): JSX.Element {
        return (
            <div className="first-line-tag tag-line">
                <span className="main-tag-name">Docker</span>
                <span className="fa fa-certificate main-tag-icon"></span>
                <span className="score">
                    <span>স্কোর</span>
                    <span style={{ fontSize: '1.5em' }}>১০০২৩</span>
                </span>
                <span className="posts">
                    <span>পোস্ট</span>
                    <span style={{ fontSize: '1.5em' }}>১০০</span>
                </span>
                <span className="post-percent">
                    <span>পোস্ট%</span>
                    <span style={{ fontSize: '1.5em' }}>১০%</span>
                </span>
            </div>

        )
    }

    private getSecondLineTag() {
        return (
            <div className="second-line-tag tag-line">
                <div className="fg-1 mr-5">
                    <span className="second-line-tagname">Python</span>
                    <span className="fa fa-certificate second-line-icon"></span>
                    <span className="ml-auto">
                        <span>স্কোর</span>
                        <span className="fs-1p3em">২০৮</span>
                    </span>
                    <span className="ml-10">
                        <span>পোস্ট</span>
                        <span className="fs-1p3em">২৩৪</span>
                    </span>
                </div>
                <div className="fg-1 ml-5">
                    <span className="second-line-tagname">Python</span>
                    <span className="fa fa-certificate second-line-icon"></span>
                    <span className="ml-auto">
                        <span>স্কোর</span>
                        <span className="fs-e1p3em">২০৮</span>
                    </span>
                    <span className="ml-10">
                        <span>পোস্ট</span>
                        <span className="fs-1p3em" >২৩৪</span>
                    </span>
                </div>
            </div>


        )
    }

    private getThirdLineTag() {
        return (
            <div className="third-line-tag tag-line">
                <div className="third-line-tagitem"
                >
                    <span className="third-line-tagname">Python</span>
                    <span className="fa fa-certificate second-line-icon"></span>
                    <span className="third-line-tagstatus">
                        <span>
                            <span>স্কোর</span>
                            <span className="fs-1p1em">২০৮</span>
                        </span>
                        <span>
                            <span>পোস্ট</span>
                            <span className="fs-1p1em">২৩৪</span>
                        </span>
                    </span>

                </div>

                <div className="third-line-tagitem">
                    <span className="third-line-tagname">Python</span>
                    <span className="fa fa-certificate second-line-icon"></span>
                    <span className="third-line-tagstatus">
                        <span>
                            <span>স্কোর</span>
                            <span className="fs-1p1em">২০৮</span>
                        </span>
                        <span>
                            <span>পোস্ট</span>
                            <span className="fs-1p1em">২৩৪</span>
                        </span>
                    </span>

                </div>

                <div className="third-line-tagitem">
                    <span className="third-line-tagname">Python</span>
                    <span className="fa fa-certificate second-line-icon"></span>
                    <span className="third-line-tagstatus">
                        <span>
                            <span>স্কোর</span>
                            <span className="fs-1p1em">২০৮</span>
                        </span>
                        <span>
                            <span>পোস্ট</span>
                            <span className="fs-1p1em">২৩৪</span>
                        </span>
                    </span>

                </div>


            </div>


        )
    }
}