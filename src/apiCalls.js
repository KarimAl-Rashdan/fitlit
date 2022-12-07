C// Your fetch requests will live here!



 const getAllData = (url) => {
	console.log('pants')
	return fetch(url)
  	.then(response => response.json())
    .then(data => console.log('data', data,'data.Data', data.data))
	.catch(err => console.log('error',err))

}


export default getAllData