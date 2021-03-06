let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name,email,picture,dob,phone,location&noinfo&nat=US';
const directory = document.querySelector('#directory');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const searchBar = document.querySelector('#search-employees');
//modal arrows
const rightArrow = document.querySelector('.right');
const leftArrow = document.querySelector('.left');
let modalIndex;

//fetch data from api
//prettier-ignore
fetch(urlAPI)
    .then((res) => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
	employees = employeeData;
	let employeeHTML = '';
	employees.forEach((employee, index) => {
		const name = employee.name;
		const email = employee.email;
		const city = employee.location.city;
		let picture = employee.picture.large;
		employeeHTML += `
        <div class="card" data-index="${index}">
                <img src="${picture}" alt="${name}" class="avatar">
                <div class="text">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `;
	});
	directory.innerHTML = employeeHTML;
}

//when called with click listener, assign data from index in employees to variables and generate HTML
function displayModal(index) {
	let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
	let date = new Date(dob.date);
	const modalHTML = `
    <img class="avatar avatar-modal" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="city">${city}</p>
        <hr />
        <p class="phone">${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state}, ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
	//show modal
	overlay.classList.remove('hidden');
	//assign generated html
	modalContainer.innerHTML = modalHTML;
}

directory.addEventListener('click', (e) => {
	//make sure container is not clicked
	if (e.target !== directory) {
		//select closest card and get index
		const card = e.target.closest('.card');
		const index = card.getAttribute('data-index');
		modalIndex = index;
		displayModal(index);
	}
});

//modal close
modalClose.addEventListener('click', () => {
	overlay.classList.add('hidden');
});

overlay.addEventListener('click', (e) => {
	if (
		!overlay.classList.contains('hidden') &&
		e.target !== modalContainer &&
		e.target !== rightArrow &&
		e.target !== leftArrow
	) {
		overlay.classList.add('hidden');
	}
});

//employee search
searchBar.addEventListener('keyup', () => {
	let searchValue = searchBar.value.toLowerCase();
	const cardItems = document.querySelectorAll('.card');
	for (let i = 0; i < cardItems.length; i++) {
		const getName = document.querySelectorAll('.name');
		const fullName = getName[i].textContent.toLowerCase();
		if (fullName.includes(searchValue)) {
			cardItems[i].style.display = 'flex';
		} else {
			cardItems[i].style.display = 'none';
		}
	}
});

//modal arrows
rightArrow.addEventListener('click', () => {
	if (modalIndex < 11) {
		modalIndex++;
		displayModal(modalIndex);
	} else if (modalIndex === 11) {
		modalIndex = 0;
		displayModal(modalIndex);
	}
});

leftArrow.addEventListener('click', () => {
	if (modalIndex > 0) {
		modalIndex--;
		displayModal(modalIndex);
	} else if (modalIndex === 0) {
		modalIndex = 11;
		displayModal(modalIndex);
	}
});
