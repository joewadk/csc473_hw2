import { useState } from 'react'; //importing react, duh

const URL = 'https://restaurant-inspection-api-40554916dc60.herokuapp.com'; //base url for api call
const SearchComponent = () => {
  const [restaurantName, setRestaurantName] = useState(''); //state for restaurant name
  const [results, setResults] = useState({}); //state for results

  const handleInputChange = (event) => {
    setRestaurantName(event.target.value);//setting restaurant name to the value of the input
  };

  const handleSearch = async () => { //async function, better for api calls
    try {
      const response = await fetch(`${URL}/search?restaurant_name=${restaurantName}`); //passing arg to base url
      const data = await response.json(); //parsing the response to json
      setResults(data);//setting the results to the data
    } catch (error) {
      console.error('Error fetching data:', error); //error catching
      setResults({});
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={restaurantName} 
        onChange={handleInputChange} 
        placeholder="Enter restaurant name" //text
      /> 
        <br />
      <button onClick={handleSearch}>Search</button>
      <div> 
        {Object.keys(results).map((key, index) => (
          <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <pre>{JSON.stringify({ [key]: results[key] }, null, 2)}</pre>
          </div> //the json response to be formatted using a key:value pair
          //currently looks really messy, gonna have to fix ui
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;