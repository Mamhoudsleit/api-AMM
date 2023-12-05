const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
// Function to fetch data from the API
function fetchData() {
    fetch('http://localhost/api-AMM/api/user/select.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the parsed JSON data
            console.log('Data:', data);
            updateUsersTable(data);
        })
        .catch(error => {
            // Check if response is defined before accessing its properties
            const responseStatus = error.response ? error.response.status : 'N/A';
            console.error(`Error fetching users: ${error.message}`, 'Response status:', responseStatus);

            // If there's no response object, handle the error accordingly
            if (!error.response) {
                console.error('Network error or invalid JSON response.');
            }
        });
}

// Function to update the users table
function updateUsersTable(users) {
    const tableBody = document.querySelector('.table-data tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through users and add rows to the table
    users.forEach(user => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <p>${user.Username}</p>
            </td>
            <td>${user.Email}</td>
            <td><span class=" pending status"><a><i class='bx bxs-trash' ></i></a></span></td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(newRow);
    });
}

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
