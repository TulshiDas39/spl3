import React, { Component } from 'react';
//import { render } from 'react-dom';
import {COUNTRIES} from './countries';
//import Hello from './Hello';
import './style.css';
import { WithContext as ReactTags } from 'react-tag-input';

interface tag{
  id:string,
  text:string
}

interface state{
  tags:tag[],
  suggestions:string[]
}

export class TagInput extends Component <{}, state>{
  constructor(props:any) {
    super(props);
    this.state = {
      tags: [{ id: '1', text: "Thailand" }, { id: '2', text: "India" }],
      suggestions: COUNTRIES,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i:number) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag:string) {
    let { tags } = this.state;
    this.setState({ tags: [...tags, { id: (tags.length + 1)+"", text: tag }] });
  }

  handleDrag(tag:tag, currPos:number, newPos:number) {
    const tags = [...this.state.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags });
  }

  handleTagClick(index:number) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div id="app">
        <ReactTags
          tags={tags}
          //@ts-ignore
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          //@ts-ignore
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
        />
      </div>
    );
  }
}

//render(<App />, document.getElementById('root'));
