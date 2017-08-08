import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';

class Header extends Component {

    render(){
        let catList = this.props.categoryList.map((cat,i)=>{
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


                    <div className="container">
                    <ul className="nav navbar-nav navbar-inverse navbar-center">

                        <li className="active"><a href="/">Top</a></li> 
                        <li className="active"><a href="/23">Comedy</a></li>
                        <li className="active"><a href="/24">Entertainment</a></li>
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
