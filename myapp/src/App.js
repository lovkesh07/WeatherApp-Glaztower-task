import { useState } from "react";
import DetailCard from "./WeatherApp/DetailCard";
import SummaryCard from "./WeatherApp/SummaryCard";


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY


  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      let res = await fetch(`${process.env.REACT_APP_URL+how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if(data.cod != 200) {
        setNoData('Location Not Found')
        
        return 
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }


 


  return (
    <>

    <div className="maincon  flex items-center justify-center w-screen h-screen py-2 z-50">
     
      <div className="  flex  rounded-[20px]  m-auto 
       
       grid grid-cols-1 lg:grid-cols-2">

        <div className="form-container drop-shadow-2xl rounded-l-[20px] w-[580px]  p-10 py-10 ">
          <div className="flex items-center justify-center">
            
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right ">
                <p className="font-semibold text-[20px] ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-4xl"> Weather Forecast App</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Enter location... (eg. Delhi,Goa..)" 
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange} 
               
                required />
                <button type="submit" className="z-10" >
                
                
                  <i className="fa fa-search text-black -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
              <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP)
              }}></i>

            </form>
          </div>
        </div>


        <div className="maincon2  rounded-r-[20px] w-[580px] p-5 ">

          <div className="flex flex-col my-1">
            {weatherData.length === 0 ? 
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-800 text-4xl font-bold uppercase">{noData}</h1>
              
              </div> :
              <>
                <h1 className="text-4xl sm:text-center sm:text-4xl text-black-800 mt-auto mb-2">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-3xl sm:text-center sm:text-4xl text-gray-600 mb-4 mt-10">More On {city}</h1>
                <ul className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
                  {weatherData.list.map( (days, index) => {
                    if(index > 0){
                    return (
                      <SummaryCard className="box-border" key={index} day={days} />
                    )
                  }
                  })}
                </ul>
              </>
            }
          </div>
        </div>

        </div>
        </div>

    </>
  );
}

export default App;

