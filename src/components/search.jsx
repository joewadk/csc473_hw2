import { useState } from 'react'; //importing react, duh

const URL = 'https://restaurant-inspection-api-40554916dc60.herokuapp.com'; //base url for api call
const SearchComponent = () => {
  const [restaurantName, setRestaurantName] = useState(''); //state for restaurant name
  const [results, setResults] = useState({ data: [] }); //state for results
  const [searched, setSearched] = useState(false); //state for search 

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
    setSearched(true); //setting searched to true
  };

  return (//structured output. include a box for the output json. also used <br> to ensure search button and search box are on diff lines
    <div>
      <input 
        type="text" 
        value={restaurantName} 
        onChange={handleInputChange} 
        placeholder="Enter restaurant name" 
      />
        <br /> 
      <button onClick={handleSearch}>Search</button>
      <div>
        {//applying the conditional here to check response length ==0, if it is then print
            searched && results.data.length === 0 ? (
                <div>No results found.</div>
            ) : (
        results.data.map((entry, index) => (//mapping over the results and displaying them in a box
          <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        )))} 
      </div>
    </div>
  );
};

export default SearchComponent;