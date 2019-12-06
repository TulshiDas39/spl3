import React, { Component } from "react";
import styles from "./head.module.scss";
import { TagInput } from "../../reactTagEditor/TagInput";
import { COUNTRIES } from "../../reactTagEditor/countries";
import { IUserHead } from "../Types";

interface state {
    tags: {
        id: string,
        text: string
    }[],
    suggestions: string[]
}

export class Head extends Component<IUserHead, state>{

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
            <div id={styles.headArea}>
                <h1>ব্যবহারকারী</h1>
                <p>ব্যবহারকারী এখানে উল্লেখ করা হল</p>

                <div className={styles.searchAndFilters}>

                    <div className={styles.filter_search+" "+ styles.filter_item}>
                        <div className={styles.searchDiv}>
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="নাম..." onChange={this.props.handleSearchUser} />
                        </div>
                    </div>

                    <TagInput additionHandler={this.handleAddition} deleteHandler={this.handleDelete} />

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
        if (tags.map(val => val.text).indexOf(tag) === -1) {
            this.setState({ tags: [...tags, { id: (tags.length + 1) + "", text: tag }] });
            console.log('added ' + tag);
        }


    }
}