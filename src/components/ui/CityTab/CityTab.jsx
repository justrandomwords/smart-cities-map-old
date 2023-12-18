import './city-tab.css'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/angle-down.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateIsMinimised, updateIsShown } from '../../../services/state/display/cityTabSlice';
import { smartCities } from '../../../data/smartCities';
import TabContent from '../TabContent/TabContent';

export default function CityTab() {
  const dispatch = useDispatch();
  const isShown = useSelector(store => store.cityTab.isShown);
  const isMinimised = useSelector(store => store.cityTab.isMinimised);
  const cityKey = useSelector(store => store.cityTab.key);

  const cityData = smartCities[cityKey];

  function updateCurrentIsMinimised(newValue) {
    if (newValue !== isMinimised)
      dispatch(updateIsMinimised())
  }

  function updateCurrentIsShown() {
    dispatch(updateIsShown());
  }

  if (!cityData) {
    return <></>
  }

  return (
    <div className="city-tab-container" isHidden={`${!isShown}`} isMinimised={`${isMinimised}`}>
      <div className='switch-visibility-button' onClick={updateCurrentIsShown}>
        <ArrowIcon className='arrow-icon'/>
      </div>
      <header className='header'>
        <div className='main'>{cityData.name}</div>
        <span className='short-descripion'>
          - {cityData.content.description}
        </span> 
      </header>
      <TabContent 
        data={cityData.content} 
        handleScroll={updateCurrentIsMinimised} 
        isMinimised={isMinimised}
      />
    </div>
  )
} 