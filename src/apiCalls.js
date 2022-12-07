// Your fetch requests will live here!
const getAllData = (url) => {
	return fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(err => console.log('error', err))
}

console.log('I will be a fetch request!')

export default getAllData;