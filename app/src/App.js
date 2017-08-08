import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';

class App extends Component {
      constructor() {
        super();
        this.state={
            categoryList:[],
            currentCategory:""
        }

    }
  componentWillMount(){
    const promise = axios.get('https://www.googleapis.com/youtube/v3/videoCategories', {
      params: {
        'key': 'AIzaSyC5lJIkV7lPWS9p_gC3LB50Yy8fQOrKjuY',
        'part': 'snippet',
        'regionCode': 'CA'}      
    });
    promise.then(result=>{

      this.setState({
        categoryList: result.data.items
      })
      let catId = this.props.params.category;
      let currentCategory = this.state.categoryList.find((cat)=>{
          return cat.id === catId
      });
      if (currentCategory) {
              this.setState({
                currentCategory: currentCategory.snippet.title
              })
              document.title = 'Top Five Videos in ' + currentCategory.snippet.title;}
            else {

                document.title = "The Top Five";
            }

 });
    promise.catch(error=>{
      console.log(error);
    });
  }  

  render() {
    return (
      <div className="App">
          <Header categoryList = {this.state.categoryList}/>  
        {React.cloneElement(this.props.children, {currentCategory: this.state.currentCategory})}
      </div>
    );
  }
}

export default App;
