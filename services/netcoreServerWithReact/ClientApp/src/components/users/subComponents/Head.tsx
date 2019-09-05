import React, { Component } from "react";
import "./head.css";
import { TagInput } from "../../../utilities/elements/reactTagEditor/TagInput";
import { COUNTRIES } from "../../../utilities/elements/reactTagEditor/countries";

interface state {
    tags: {
        id: string,
        text: string
    }[],
    suggestions: string[]
}

export class Head extends Component<any, state>{

    constructor(props: any) {
        super(props);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            tags: [{ id: '1', text: "Thailand" }, { id: '2', text: "India" }],
            suggestions: COUNTRIES
        }
    }

    public render() {
        return (
            <div id="headArea">
                <h1>ব্যবহারকারী</h1>
                <p>ব্যবহারকারী এখানে উল্লেখ করা হল</p>

                <div className="searchAndFilters">

                    <div className="filter-search filter-item">
                        <form >
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="নাম..." />
                        </form>
                    </div>

                    <div id="filterByPlaceContainer" className="filter-search filter-item">
                        <form>
                            <input type="text" placeholder="স্থান..." />
                        </form>
                    </div>

                    {new TagInput().build(this.handleAddition, this.handleDelete,
                        { tags: this.state.tags, suggestions: this.state.suggestions })}

                </div>

            </div>
        );
    }

    public handleDelete(i: number) {
        this.setState({
            tags: this.state.tags.filter((tag, index) => index !== i),
        });
        console.log('delete ' + i);
    }

    public handleAddition(tag: string) {

        let { tags } = this.state;
        if (tags.map(val=> val.text).indexOf(tag) === -1) {
            this.setState({ tags: [...tags, { id: (tags.length + 1) + "", text: tag }] });
            console.log('added ' + tag);
        }


    }
}