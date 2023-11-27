import './city-tab.css'
import { ReactComponent as ArrowIcon } from '../../assets/icons/angle-down.svg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateIsShown } from '../../services/state/display/cityTabSlice';
import { smartCities } from '../../data/smartCities';

export default function CityTab() {
  const dispatch = useDispatch();
  const isShown = useSelector(store => store.cityTab.isShown);
  const cityId = useSelector(store => store.cityTab.id);
  if (cityId === -1) return <></>

  const cityData = smartCities.find(city => city.id === cityId);

  function updateCurrentIsShown() {
    dispatch(updateIsShown());
  }

  return (
    <div className="city-tab-container" isHidden={`${!isShown}`}>
      <div className='switch-visibility-button' onClick={updateCurrentIsShown}>
        <ArrowIcon className='arrow-icon'/>
      </div>
      <header className='header'>
        <span className='main'>{cityData.name}</span> - столиця та найбільше місто України. Розташований у середній течії Дніпра, у північній Наддніпрянщині.
      </header>
      <main className='content-container'>
        <div className='test'>{cityData.description}</div>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
      </main>
    </div>
  )
} 