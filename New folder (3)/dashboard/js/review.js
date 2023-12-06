
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
// Function to fetch reviews from API

 // Function to fetch reviews from API
async function fetchReviews() {
    try {
      const response = await fetch('your_api_endpoint_url'); // Replace with your actual API endpoint URL
      if (!response.ok) {
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          text: await response.text(),
        };
        console.error('Error fetching reviews:', errorDetails);
        return [];
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
  
  
  
  // Function to update the table with review data
  async function updateReviewsTable() {
    const reviews = await fetchReviews();
    const tableBody = document.querySelector('.table-data tbody');
  
    // Clear existing table rows
    tableBody.innerHTML = '';
  
    // Loop through reviews and add rows to the table
    reviews.forEach(review => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>
              <p>${review.Username}</p>
          </td>
          <td>${review.ProductName}</td>
          <td>${review.ReviewText}</td>
          <td>${review.Rating}</td>
          <td>
              <a class="delete-review" data-review-id="${review.ReviewID}">
                  <span class="pending status">
                      <i class='bx bxs-trash'></i>Delete
                  </span>
              </a>
          </td>
      `;
  
      // Append the new row to the table body
      tableBody.appendChild(newRow);
    });
  }
  
  // Call the function to update the table when the page loads
  updateReviewsTable();
  