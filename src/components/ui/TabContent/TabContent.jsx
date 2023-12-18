import './tab-content.css'
import { tabElementsTypes } from '../../../enums/tabElemetsTypes';
import { useRef } from 'react';
import { ReactComponent as TriangleLogo } from '../../../assets/icons/triangle.svg'
import { factorQuestionName } from '../../../data/smartCities';

function PercentBar({percentRange}) {
  const leftPartMargin = {
    marginLeft: `${percentRange.min}%`,
    width: `${(percentRange.average - percentRange.min) - 0.5}%`,
  }
  
  const rightPartMargin = {
    marginRight: `${100 - percentRange.max}%`,
    width: `${(percentRange.max - percentRange.average) - 0.5}%`,
  }

  return (
    <div className='score-wrapper'>
      <div 
        className='popup' 
        style={{left: `${percentRange.min -5}%`}}
        value={percentRange.min}
      />
      <div 
        className='popup' 
        style={{left: `${percentRange.average-2 -2.5}%`}}
        value={percentRange.average}
      />
      <div 
        className='popup' 
        style={{right: `${100-percentRange.max -5}%`}}
        value={percentRange.max}
      />

      <div className='left' style={leftPartMargin}></div>
      <div className='right' style={rightPartMargin}></div>
    </div>
  )
}

function FactorRow({question, percentRange}) {
  return (
    <div className='factor-row'>
      <div className='factor-question'>{question}</div>
      <PercentBar percentRange={percentRange}/>
    </div>
  )
}

function FactorTable({header, questions, tableData}) {
  const healthSafetyFactors = getFactors(questions.health_safety, tableData.health_safety);
  const mobilityFactors = getFactors(questions.mobility, tableData.mobility);
  const activitiesFactors = getFactors(questions.activities, tableData.activities);
  const opportunitiesFactors = getFactors(questions.opportunities, tableData.opportunities);
  const governanceFactors = getFactors(questions.governance, tableData.governance);

  function getFactors(questionsArray, percentRangesArray) {
    return questionsArray.map((question, index) => 
      <FactorRow
        question={question}
        percentRange={
          percentRangesArray[index] || {min:0, average:0, max:0}
        }
      />
    )
  }

    return (
    <div className='factor-table block'>
      <header className='factor-title'>{header}</header>
      <div className='main-content'>
        <div className='factor-section'>
          <div className='subtitle-wrapper'>
            <p className='subtitle'>Діяльності</p>
            <div className='score-header'>
              <p><p>0</p></p>
              <p><p>20</p></p>
              <p><p>40</p></p>
              <p><p>60</p></p>
              <p><p>80</p></p>
              <p><p>100</p></p>
            </div>
          </div>
          <div className='factor-list'>
            {activitiesFactors}
          </div>
        </div>
        <div className='factor-section'>
          <div className='subtitle-wrapper'>
            <p className='subtitle'>Можливості</p>
          </div>
          <div className='factor-list'>
            {opportunitiesFactors}
          </div>
        </div>
        <div className='factor-section'>
          <div className='subtitle-wrapper'>
            <p className='subtitle'>Управління</p>
          </div>
          <div className='factor-list'>
            {governanceFactors}
          </div>
        </div>
        <div className='factor-section'>
          <div className='subtitle-wrapper'>
            <p className='subtitle'>Здоров'я та безпека</p>
                      </div>
          <div className='factor-list'>
            {healthSafetyFactors}
          </div>
        </div>
        <div className='factor-section'>
          <div className='subtitle-wrapper'>
            <p className='subtitle'>Мобільність</p>
          </div>
          <div className='factor-list'>
            {mobilityFactors}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TabContent(props) {
  const tabContentRef = useRef(null);

  const content = props.data.rows.map(row => 
  <div className='row' style={getRowStyle(row.elements, row.properties)}>
    {row.elements.map(column => getCurrentElement(column))}
  </div> 
  )

  const circleDiagramStyle = {
    strokeDashoffset: `calc(472 - 440/100*${props.data.HDI*100}`,
  }

  function getRowStyle(elements, properties) {
    const columnsSize = elements.map(element => `${element.space}fr`);

    const propertiesStyle = {
      height: '',
    };
    try {
      propertiesStyle.height = properties.height;
    } catch (error) {}

    const rowStyle = {
      gridTemplateColumns: columnsSize.join(' '),
      minHeight: `${propertiesStyle.height * 15}rem`,
    }

    return rowStyle;
  }

  function getCurrentElement(cityData) {
    const fontStyle = {
      fontSize: `${cityData.font_size}rem`
    }

    switch (cityData.type) {
      case tabElementsTypes.text:
        return <div className='block text-element' style={fontStyle}>{cityData.text}</div>
      case tabElementsTypes.image:
        return <div className='block image-element' >
          <img className='image' src={cityData.image_url}  alt="My Image"/>
          <div className='block text-wraper' style={{...fontStyle,}}>
            <p>{cityData.text}</p>
          </div>
        </div>
      case tabElementsTypes.header:
        return <div className='block header-element' style={fontStyle}>
          <h2>{cityData.text}</h2>
        </div>
      default:
        return <></>
    }
  }


  function handleScroll() {
    const container = tabContentRef.current;

    if (container.scrollTop > 0 && !props.isMinimised) {
      props.handleScroll(true)
      container.scrollTop = 0;
    }
  }

  function handleWheel(e) {
    if (tabContentRef.current.scrollTop === 0 && e.deltaY < 0)
      props.handleScroll(false)
  }

  const shiftedRankState = props.data.shifted_place === 0 ? 'hidden' :
  props.data.shifted_place > 0 ? 'positive' : 'negative'

  return (
    <main className='tab-content-container' ref={tabContentRef} onWheel={handleWheel} onScroll={handleScroll}>
      <div className='main row'>
        <div className='block ranking' placeholder='Рейтинг місце'>
          <p className='current-ranking'>{props.data.rank}</p>
          <div className='changing' state={shiftedRankState}>
            <TriangleLogo className='triangle'/>
            <p className='changed-position'>({props.data.shifted_place})</p>
          </div>
        </div>
        <div className='block hdi' placeholder='Індекс людського розвитку'>
          <svg className='svg-circle' viewBox="-10 -10 180 180">
            <circle cx="80" cy="80" r="70" stroke-linecap="round" style={circleDiagramStyle} />
          </svg>
          <p className='hdi-value'>{props.data.HDI}</p>
        </div>
        <div className='block letter-grade' placeholder='Рейтинг міста'>{props.data.general_rating}</div>
        <div className='block letter-grade' placeholder='Рейтинг споруд'>{props.data.structures_rating}</div>
        <div className='block letter-grade' placeholder='Рейтинг технологій'>{props.data.technologies_rating}</div>
      </div>
       <div className='history-statistics row'>
        <div className='block image-element'>
          <img className='image' src='https://th.bing.com/th/id/R.3e8acf9ad7346efe73e1d8dacf277fac?rik=xV3q8RNmVa6%2buQ&pid=ImgRaw&r=0'/>
        </div>
        <div className='block table'>
          <div className='column'>
            <div className='table-header'>Країна</div>
            <div>Індекс людського розвитку</div>
            <div>Очікувана тривалість життя при народженні</div>
            <div>Очікувані роки навчання</div>
            <div>Середні роки навчання</div>
            <div>ВНД на душу населення</div>
          </div>
          <div className='column'>
            <div className='table-header'>2018</div>
            <div>{props.data.main_statistic[0][2018]}</div>
            <div>{props.data.main_statistic[0][2019]}</div>
            <div>{props.data.main_statistic[0][2020]}</div>
            <div>{props.data.main_statistic[0][2021]}</div>
            <div>{props.data.main_statistic[0].now}</div>
          </div>
          <div className='column'>
            <div className='table-header'>2019</div>
            <div>{props.data.main_statistic[1][2018]}</div>
            <div>{props.data.main_statistic[1][2019]}</div>
            <div>{props.data.main_statistic[1][2020]}</div>
            <div>{props.data.main_statistic[1][2021]}</div>
            <div>{props.data.main_statistic[1].now}</div>
          </div>
          <div className='column'>
            <div className='table-header'>2020</div>
            <div>{props.data.main_statistic[2][2018]}</div>
            <div>{props.data.main_statistic[2][2019]}</div>
            <div>{props.data.main_statistic[2][2020]}</div>
            <div>{props.data.main_statistic[2][2021]}</div>
            <div>{props.data.main_statistic[2].now}</div>
          </div>
          <div className='column'>
            <div className='table-header'>2021</div>
            <div>{props.data.main_statistic[3][2018]}</div>
            <div>{props.data.main_statistic[3][2019]}</div>
            <div>{props.data.main_statistic[3][2020]}</div>
            <div>{props.data.main_statistic[3][2021]}</div>
            <div>{props.data.main_statistic[3].now}</div>
          </div>
          <div className='column'>
            <div className='table-header'>зміна за рік</div>
            <div>{props.data.main_statistic[4][2018]}</div>
            <div>{props.data.main_statistic[4][2019]}</div>
            <div>{props.data.main_statistic[4][2020]}</div>
            <div>{props.data.main_statistic[4][2021]}</div>
            <div>{props.data.main_statistic[4].now}</div>
          </div>
        </div>
      </div>
      <div className='row' style={{display: 'flex', minHeight: '18rem'}}>
        {props.data.rows[0].elements.map(column => getCurrentElement(column))}
      </div> 
      <div className='factor-statistics row'>
        <FactorTable 
          header='Споруди'
          questions={factorQuestionName.structures}
          tableData={props.data.factor_statistic.structures} 
        />
        <FactorTable 
          header='Технології'
          tableData={props.data.factor_statistic.technologies} 
          questions={factorQuestionName.technologies}
        />
      </div>
      {content}
    </main>
  )
}