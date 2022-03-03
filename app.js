// empty input error handling
const emptyField = document.getElementById('error-message');
//search result section
const searchResult = document.getElementById('search-result');
// single item information
const phoneDetails = document.getElementById('single-phone-details');


// load phone api --------------------------***********************************************************

const searchPhone = () => {
    const searchInput = document.getElementById('search-field');
    const searchField = searchInput.value;
    // upper & lower case solution
    const searchText = searchField.toLowerCase();
    //clear search field------------------
    searchInput.value = '';


    // console.log(searchText)

    // const emptyField = document.getElementById('error-message');
    if (searchField == '') {
        const emptyFieldGet = emptyField;

        emptyFieldGet.textContent = '';

        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="mt-4 pt-3"> Please write  something To display </h1>
        `;
        emptyField.appendChild(div);

        // clear old data--------------------
        searchResult.textContent = '';
        phoneDetails.textContent = '';

    }
    else {
        emptyField.textContent = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}

// display Search Result--------------------******************************************************

// searchPhone()

const displaySearchResult = phones => {
    // const searchResult = document.getElementById('search-result');

    // console.log(phones.slice(0, 20));

    // clear search result ----------------
    searchResult.textContent = '';
    //clear old single item data--------------
    phoneDetails.textContent = '';

    if (phones.length == 0) {
        const div = document.createElement('div');
        div.classList.add('text-center')
        div.innerHTML = `
          <h1 class="text-center mt-4 pt-3">No result Found</h1>
          `;
        emptyField.appendChild(div);
    }
    else {
        phones.slice(0, 20).forEach(phone => {

            // console.log(phone);

            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100 p-2">
                    <img id="image-tumble" src="${phone.image}" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-center">${phone.phone_name}</h3>
                    <h5 class="card-text mt-2"> <span id="item-name">Brand Name : </span> ${phone.brand}</h5>
                </div>
                <div class="card-footer bg-white d-grid">
                <a href="#single-phone-details"><button onclick="loadSinglePhone('${phone.slug}')" type="button"
                class="btn btn-primary text-white btn-outline-success mx-auto px-3"> More
                    Details</button></a>
                </div>
            </div>
        `;
            searchResult.appendChild(div)
        });

        //load more information---------------------------
        const div = document.createElement('div');
        div.innerHTML = ` 
         <div class="card h-100 p-2">
         <div  class="card-footer bg-white d-grid position-absolute bottom-0 start-50">
                 <button type="button"  class="btn btn-primary text-white btn-outline-success mx-auto px-3"> Load More Details</button>
                 </div>
                 </div>
         `;
        searchResult.appendChild(div);

    }

}




// single item data show section ----------------------*****************************************************

const loadSinglePhone = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadMoreDetails(data.data));
}

const loadMoreDetails = phone => {

    // console.log(phone.mainFeatures);

    // const phoneDetails = document.getElementById('single-phone-details');

    // clear old document
    phoneDetails.textContent = '';


    const div = document.createElement('div');
    div.classList.add('outline');
    div.innerHTML = `
    
            <div class="p-3 mx-auto center">
                <img id="phone-details" src=" ${phone.image}" class="mb-3 mx-auto" alt="">
            </div>

            <div class="text-center mb-2">
                <h3> <span id="item-name"> Phone Name :</span> ${phone.name} </h3>
                <h5> <span id="item-name"> Brand Name :</span> ${phone.brand}</h5>
                <h5> <span id="item-name"> Release Date :</span> ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </h5>
            </div>

            <div class=" pb-4 mb-2">
                <h3 class="text-center my-4" id="item-name"> Main Features : </h3>

                <table class="table w-75 mx-auto table-striped">
                    <tbody>
                        <tr>
                            <td>Chip Set</td>
                            <td>${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : ''}</td>
                        </tr>
                        <tr>
                            <td>Display Size</td>
                            <td>${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : ''}</td>
                        </tr>
                        <tr>
                            <td>Memory Variant</td>
                            <td>${phone.mainFeatures.memory ? phone.mainFeatures.memory : ''}</td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>${phone.mainFeatures.storage ? phone.mainFeatures.storage : ''}</td>
                        </tr>
                        <tr>
                            <td>Sensors</td>
                            <td>
                                <ul id="sensor">   
                                    ${sensorsDataIs(phone.mainFeatures.sensors)}                                           
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Others</td>
                            <td>${phone.mainFeatures.others ? phone.mainFeatures.others : ''}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    phoneDetails.appendChild(div);
}

const sensorsDataIs = (sensors) => {
    let sensorData = "";
    sensors.forEach((sensor) => {
        sensorData += `<li>${sensor}</li>`;
    });
    return sensorData;
};

