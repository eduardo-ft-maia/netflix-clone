import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState();
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista completa
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      let randFeatured = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let featured = originals[0].items.results[randFeatured];
      let featuredInfo = await Tmdb.getMovieInfo(featured.id, 'tv');

      setFeaturedData(featuredInfo);
    }  
    
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
          
        ))}
      </section>

      <footer>
        Obrigado por visitar! <span role='img' aria-label='moyai'>🗿</span>
        Edu Productions
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.wired.com%2Fphotos%2Fw_2000%2Fwp-content%2Fuploads%2F2016%2F01%2FNetflix_LoadTime.gif&f=1&nofb=1&ipt=9aea1a7641908ce5b473260ae1101bb5e62f7c5efa22044945c555add901fd19&ipo=images' alt='carregando'></img>
      </div>
      }
    </div>
  )
}
