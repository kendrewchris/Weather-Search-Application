const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b52720a439msh78bbdad17a79289p1b3633jsn66edb06d175d',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

//input form HTML element
var searchQuery = document.getElementById("searchBar");

//remove whitespace and convert all chars to lowercase
urlFormatter = (searchTerm) =>{
  if(searchTerm.includes(' ')){
    searchTerm = searchTerm.replace(/\s/g, "");
  }
  searchTerm = searchTerm.toLowerCase();
  return searchTerm;
}

beginSearch = () =>{

  let search = urlFormatter(searchQuery.value)
  let url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${search}&format=json&u=f`;
  
  let response = fetch(url, options)
	.then(response => response.json())
	.then(data => {
    //current weather
    document.getElementById('temp').innerHTML = data.current_observation.condition.temperature + '°';
    document.getElementById('weather').innerHTML = data.current_observation.condition.text;

  
    //geographical
    document.getElementById('country').innerHTML = 'Country: ' + data.location.country;
    document.getElementById('region').innerHTML = 'Region: ' + data.location.region;
    document.getElementById('city').innerHTML = 'City: ' + data.location.city;

    document.getElementById('error').innerHTML = '';
  })
	.catch(err => {
    console.error(err);
    document.getElementById('error').innerHTML = 'An error has occured. Try searching another term';
  });
}

searchQuery.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if(event.key === "Enter") {
    beginSearch();
  }
});