const directory = document.querySelector('#directory');

console.log(fetchData('https://randomuser.me/api/?inc=name,email,picture,dob,phone,location'));

function fetchData(url) {
	return fetch(url)
		.then(checkStatus)
		.then((res) => res.json())
		.catch((error) => console.log('There was an error!', error));
}

function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}
