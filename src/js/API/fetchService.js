const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'genius.p.rapidapi.com',
		'X-RapidAPI-Key': 'd0e982f63emsh6693baa875f497ep1632d4jsna4447d354e03'
	}
};

class FetchService {
  static async getSongs(id) {
    const response = await fetch(`https://genius.p.rapidapi.com/songs/${id}`, options)
	  .then(response => response.json())
    return response;
  }
}

export default FetchService;
