import React, {Component} from 'react';
// import {Link} from 'react-router';
import axios from 'axios';

class Header extends Component {
    constructor() {
        super();
        this.state={
            categoryList:[]
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
      console.log("Success!");
      console.log('categoryList', result.data.items);
      this.setState({
        categoryList: result.data.items
      })
    });
    promise.catch(error=>{
      console.log(error);
    });
  }  


    render(){
        let catList = this.state.categoryList.map((cat,i)=>{
            return (
                <Navbar 
                    categoryId={cat.id}   
                    categoryName={cat.snippet.title}
                    />
            )
        })
        return (
                <div className='top'>
                <div className='row'>

                <div className='col-md-12'>
                    <nav className="navbar navbar-light bg-primary">

                    
                        <a className="navbar-brand" href="/"><img alt="the Top 5" src="TheTop5.jpg" width="100" /></a> 
                        <span className="navbar-text"> YouTube's Hottest</span>

                        {/* <form className="navbar-form navbar-right">
                            <input className="form-control" type="text" placeholder="Search"/>
                            <button className="btn btn-default" type="submit">Search</button>
                        </form>   */}

                    <div className="container">
                    <ul className="nav navbar-nav navbar-inverse navbar-center">

                        <li className="active"><a href="/">Top</a></li> 
                        <li className="active"><a href="/23">Comedy</a></li>
                        <li className="active"><a href="/23">Entertainment</a></li>
                        <li className="active"><a href="/1">Film</a></li>
                        <li className="active"><a href="/15">Pets / Animals</a></li>
                        <li className="active"><a href="/28">Science/Tech</a></li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="/">Other Categories
                            <span className="caret"></span></a>
                            
                                <ul className="dropdown-menu">
                                        {catList} 
                                </ul>
                        </li>

                    </ul>  
                    </div>
                    </nav>

                    
                </div>
                </div>
                </div>
        )
    }
}

class Navbar extends Component {

    render() {
        return (
            <li><a href={`/${this.props.categoryId}`}> {this.props.categoryName} </a> </li>
        )
    }

}

export default Header;
