import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookAtlas, faEarth, faExternalLink, faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand navbar-light bg-faded">
        <a class="brand" href="#"><h2>BookWorms</h2></a>
        <form class="form-control rounded-pill my-2 my-lg-0 d-flex p-2 w-50">
            <input class="form-control" type="text" placeholder="Search books, author, ..."></input>
            <button class="btn btn-outline-success my-2 my-sm-0 " type="submit"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 d-flex p-2 w-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories <FontAwesomeIcon icon={faBook}/></a>
                <div class="dropdown-menu" aria-labelledby="dropdownId">
                    <a class="dropdown-item" href="#">Action 1</a>
                    <a class="dropdown-item" href="#">Action 2</a>
                </div>
            </li>
            <li class="nav-item active">
                <a class="nav-link " href="#">About <FontAwesomeIcon icon={faEarth}/><span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link font-weight-bold" href="#">Log In <FontAwesomeIcon icon={faExternalLink}/></a>
            </li>
            
            
        </ul>
        
    </nav>
  )
}

export default Navbar
