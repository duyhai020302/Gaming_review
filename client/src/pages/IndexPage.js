import Post from "../Post";
import {useEffect, useState} from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  const [search,setSearch]=useState('');
  useEffect(()=>{
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts =>{
        setPosts(posts);
      });
    });
  },[]);

  return(
    <>
    <div className="search">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input id="searchInput" type='text' onChange={(e)=>{
        setSearch(e.target.value);
      }}/>
    </div>
      {posts.length>0 && posts.filter((item)=>{
        const lowerSearch = search.toLowerCase();
        const lowerTitle=item.title.toLowerCase();
        return lowerSearch === '' ? item:lowerTitle.includes(lowerSearch);
      }).map(post =>(
        <Post {...post} />  
      ))}
    </>
  );
}