import React, { Component } from 'react';
import {COUNTRIES} from './countries';
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

export class TagInput {

  private state:state = {
    tags: [{ id: '1', text: "Thailand" }, { id: '2', text: "India" }],
    suggestions: COUNTRIES
  };

   constructor() {
  
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  private handleDrag(tag:tag, currPos:number, newPos:number) {
    const tags = [...this.state.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    // this.setState({ tags });
  }

  private handleTagClick(index:number) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  public build(additionHandler:(tag:string)=>any, deleteHandler:(i:number)=>any, tagState:state) {
    const { tags, suggestions } = tagState;
    return (
      <div id="app">
        <ReactTags
          tags={tags}
          suggestions={suggestions as any}
          handleDelete={deleteHandler}
          handleAddition={additionHandler as any}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
        />
      </div>
    );
  }
}

//render(<App />, document.getElementById('root'));
