import '../styles/App.css'
import axios from 'axios';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import { useEffect, useState } from 'react';
import {MdOutlineClear} from 'react-icons/md';
import {IoIosSearch} from 'react-icons/io';

function SearchPage() {

  const [photosData, setPhotosData] = useState([]);
  const [query, setQuery] = useState('Country');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState(false);

  const API_KEY = 'lvyG9BxtKdz-w8jMsPvRR-QnsQyGz42qsIbzW69o3RI'
  const URL = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${API_KEY}&per_page=50&location[name]`


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    if(query){
      setQuery('')
    }
  }

  const handleClick = () => {
    axios
        .get(URL)
        .then((response) => {
           console.log(response);
           setPhotosData(response.data.results);
           setTitle(query);
        })
        .catch( error =>{
          console.log('Error happend during fetching!', error)
        });
  }

  const clickImage = (imgSrc, imgAuth, imgLoc) => {
    setDetails(imgSrc);
    setAuthor(imgAuth);
    setLocation(imgLoc);
    setModel(true);
}

  const exitDetails = () => {
    setModel(false);
  }

  const search = (e) => {
    if(e.key === "Enter") {
       axios
        .get(URL)
        .then((response) => {
           console.log(response);
           setPhotosData(response.data.results);
           setTitle(query);
        })
        .catch( error =>{
          console.log('Error happend during fetching!', error)
        });
    };
  };

  useEffect(() => {
    axios
        .get(URL)
        .then((response) => {
           console.log(response);
           setPhotosData(response.data.results);
           setTitle(query);
        })
        .catch( error =>{
          console.log('Error happend during fetching!', error)
        });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <nav className="navigation">
          <div className = "search-box">
              <IoIosSearch onClick={handleClick}/>
              <input
                className = "search-input"
                type="text"  
                placeholder = "Search"
                onKeyPress = {search}
                onChange = {handleChange}
                value = {query}
              />
              <MdOutlineClear onClick={clearSearch}/>
          </div>
        </nav>
      </header>
      <section className = "container-title">
        <h1 className="title">{title.charAt(0).toUpperCase() + title.slice(1) }</h1>
      </section>
      <section className = "container-photo">
        <ResponsiveMasonry 
          columnsCountBreakPoints={{ 350: 1, 800: 2, 900: 3, 1250: 4 }}>
          <Masonry  
            columnsCount={4} 
            gutter="15px"
          >
            {photosData.map((image) => (
              <div className="card" onClick={()=>clickImage(image.urls.small, image.user.name, image.user.location)}>
                <img src={image.urls.small} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
      {model &&
          <div className='photo-details'>
              <div className='details-avatar'>
                <div className='info-photo'>
                  <p className='info'>Photo by: {author}</p>
                  <p className='info'>Location: {location}</p>
                </div>
                <MdOutlineClear className="exit" onClick={exitDetails}/>
              </div>
              <img src={details}/>
          </div>
      }
    </div>
  );
}

export default SearchPage;
