import { useState } from 'react'; //importing react, duh

const URL = 'https://restaurant-inspection-api-40554916dc60.herokuapp.com'; //base url for api call
const SearchComponent = () => {
  const [restaurantName, setRestaurantName] = useState(''); //state for restaurant name
  const [results, setResults] = useState({ data: [] }); //state for results
  const [searched, setSearched] = useState(false); //state for search 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); //timeout state handler
  //some thoughts on the above: i had asked in call about methods of rate limiting- in furtherance of preventing too many api calls from being sent. this might be a knuckleheaded approach, but the goal is to disable searching (disable api calls) to the server for 5 seconds after a search is made. this is to prevent too many api calls from being made in a short period of time. i am not sure if this is the best way to do this, but it is certainly *a* way to do it. i am open to feedback on this.
  const handleInputChange = (event) => {
    setRestaurantName(event.target.value);//setting restaurant name to the value of the input
  };

  const handleSearch = async () => { //async function, better for api calls
    setIsButtonDisabled(true); //disabling the button
    try {
      const response = await fetch(`${URL}/search?restaurant_name=${restaurantName}`); //passing arg to base url
      const data = await response.json(); //parsing the response to json
      setResults(data);//setting the results to the data
    } catch (error) {
      console.error('Error fetching data:', error); //error catching
      setResults({});
    }
    setSearched(true); //setting searched to true
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000); //implemented a delay
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
      <button onClick={handleSearch}disabled={isButtonDisabled}>Search</button>
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