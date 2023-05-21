import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Appqq = () => {

  const [countries, setContries] = useState([]);
  const [countryMatch, setContrysMatch] = useState([]);
  

  useEffect(() => {
    const loadCountries =async() => {
      const response = await axios.get("https://restcountries.eu/rest/v2/all");
      setContries(response.data);
    };
    loadCountries();

  },[]);

  console.log(countries);

  const searchCountries =(text) => {
    let matches = countries.filter((country) =>{
      const regex = new RegExp(`${text}`, "gi");
      return country.match(regex) || country.capital.match(regex);
 
    });
    setContrysMatch(matches);
  };

  return (
    <>
    <div className="">
      <input  
      placeholder='type...'
      onChange={(e)=> searchCountries(e.target.value)}
      
      />


    </div>
    </>
  )
}

export default Appqq