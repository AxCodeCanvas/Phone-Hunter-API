// console.warn("Hello world...!")

const phoneHunter = async (phone='a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`);
    const data = await res.json();
    const phones = data.data;
    hunterFun(phones, isShowAll)
    // console.log(phones)
}
const hunterFun = (phone, isShowAll) => {


    const phoneContainer = document.querySelector('#phone-container')
    phoneContainer.textContent = '';

    const showAllContainer = document.querySelector('#show-all-container');
    if (phone.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    // console.log("is show all", isShowAll)

    // console.log(phone.length)
    if (!isShowAll) {
        phone = phone.slice(0, 12)
    }


    phone.forEach((data) => {

        const createDiv = document.createElement('div');
        createDiv.classList = 'card bg-pink-100 p-4 shadow-xl'
        createDiv.innerHTML = `
            <figure><img src="${data.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${data.brand}</h2>
                <p class="text-2xl">${data.phone_name}</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${data.slug}'); showPhoneDetails() " class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;

        phoneContainer.appendChild(createDiv);

    })
    toggleHandleSpinner(false)

}

const handleShowDetails = async (id) => {
    // console.log("Clicked Show Details", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    showPhoneDetails(phone)


}

const showPhoneDetails = (phone)=>{
    console.log(phone)
    const phoneName = document.querySelector('#show-details-phone-name');
    phoneName.innerText=phone?.name

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
        <img class="px-2 py-2 w-1/2 mx-auto block" src="${phone?.image}" />
       <p><span class="text-xl font-bold">Brand : </span>${phone?.brand}</p>
       <p><span class="text-xl font-bold">Name : </span>${phone?.name}</p>
       <p><span class="text-xl font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
       <p><span class="text-xl font-bold">displaySize : </span>${phone?.mainFeatures?.displaySize}</p>
       <p><span class="text-xl font-bold">memory : </span>${phone?.mainFeatures?.memory}</p>
       <p><span class="text-xl font-bold">USB : </span>${phone?.others?.USB || 'No USB available'}</p>
       <p><span class="text-xl font-bold">GPS : </span>${phone?.others?.GPS || 'No GPS available'}</p>
       <p><span class="text-xl font-bold">Brand : </span>${phone?.brand}</p>
       <p><span class="text-xl font-bold">Slug : </span>${phone?.slug}</p>

    `;


    // Show the model
    show_details_modal.showModal()
}


const toggleHandleSpinner = (isSpinner) => {
    const toggleSpinner = document.querySelector('#handel-spinner')
    if (isSpinner === true) {
        toggleSpinner.classList.remove('hidden')
    } else {
        toggleSpinner.classList.add('hidden')
    }

}


const handelSearch = (isShowAll) => {
    toggleHandleSpinner(true);
    const inputPhone = document.querySelector('#input-text')
    const inputText = inputPhone.value;
    phoneHunter(inputText, isShowAll)
}


// handle show all 
const handleShowAll = () => {
    handelSearch(true)
}








phoneHunter()