import React, { Component } from 'react';
import { COUNTRIES } from './countries';
import './style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { ITagInputProps, ITagInput } from './Types';
import { httpService } from '../../services/HttpService';
import { API_CALLS } from '../../utils/api_calls';

interface tag {
  id: string,
  text: string
}

interface state {
  isLoading: boolean;
}

export class TagInput extends React.Component<ITagInputProps, state>{

  private inputState: ITagInput = {
    tags: [],
    suggestions: COUNTRIES
  };

  constructor(props: ITagInputProps) {
    super(props);
    this.state = { isLoading: false };
  }

  private updateComponent(){
    this.setState(this.state);
  }

  private handleDrag(tag: tag, currPos: number, newPos: number) {
    const tags = [...this.inputState.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    // this.setState({ tags });
  }

  private isExistTag(tagText:string){
    for(let i=0;i<this.inputState.tags.length;i++){
      if(this.inputState.tags[i].text === tagText) return true;
    }
    return false;
  }

  private handleAddition(tag:string){
    if(this.isExistTag(tag)) return;

    let length = this.inputState.tags.length;
    let data = {id:length+"",text:tag.toLowerCase()};
    this.props.additionHandler(tag.toLowerCase());
    this.inputState.tags.push(data);
    this.updateComponent();
  }

  private handleDelete(index: number) {
    this.inputState.tags.splice(index, 1);
    this.props.deleteHandler(index);
    this.updateComponent();

  }

  private handleTagClick(index: number) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  private handleInputChange(tag:string){
    console.log('input:'+tag);
    httpService.get(API_CALLS.tagSuggestion+tag.toLowerCase()).then(data=>{
      this.inputState.suggestions = data;
      this.updateComponent();
    })
  }

  render() {
    return (
      <div id="app">
        <ReactTags
          {...this.inputState}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this) as any}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          handleInputChange ={this.handleInputChange.bind(this)}
        />
      </div>
    );
  }

  // public build(additionHandler:(tag:string)=>any, deleteHandler:(i:number)=>any, tagState:state) {
  //   const { tags, suggestions } = tagState;

  // }
}

//render(<App />, document.getElementById('root'));
