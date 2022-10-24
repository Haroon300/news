import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function App() {

  const[data, setData] = useState([]);
  const[query, setQuery] = useState("");
  const[isLoading, setIsLoading] = useState(false);


  useEffect(()=>{

    function getTrending(){
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '4ed0e684femsh3bbf96fb64048d9p1942a8jsn710b2da94432',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setData(response.data.value)
      }).catch(function (error) {
        console.error(error);
      });
    }

    getTrending();
  },[])

  const getNews = (e)=>{
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4ed0e684femsh3bbf96fb64048d9p1942a8jsn710b2da94432',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    setIsLoading(true)

    axios.request(options).then(function (response) {
    
      setIsLoading(false)
    
      console.log(response.data.value);

      setData(response.data.value)
    
    })
    .catch(function (error) {
      setIsLoading(false) 
      console.error(error);
    
    });

  }

  return (
    <div className='flex'>
      <div className='flex col'>
        <div className='flex col header'>
          <h1 className='h1'>World News</h1>
          <div>
            <form onSubmit={getNews}>
              <input 
              type="text" 
              placeholder='Search here' 
              
              onChange={(e)=>{
                setQuery(e.target.value)
              }}
              className='marg'
              />
              
              <button type='submit' className='marg'>Search</button>
            </form>
          </div>
        </div>

        <div className='flex width'>

          <div className='over flex col'>
            {
              (isLoading)?<h1 className='heading'>Loading...</h1>:""
            }
            {
            data.map(eachPost => (
            <div key={eachPost?.name} className='background-col marg'>
              <h2>{eachPost?.name}</h2>
              <span>
                {
                  moment(eachPost?.datePublished)
                  .format('Do MMMM, hh:mm a')
                }
              </span>
              <br/>
              <img src={eachPost?.image?.thumbnail?.contentUrl
                .replace("&pid=News","")
                .replace("pid=News&","")
                .replace("pid=News","")
              }/>
              <p>{eachPost?.description}</p>
              <a href={eachPost?.url} target = "blank" > <button>For More Info</button></a>
            </div>
            ))
            }
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default App;
