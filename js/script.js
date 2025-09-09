// console.log("checked ok");

// console.log(lessons);  
// 1. get the container & empty
// 2. get into evey lessons
//        3. create element
//        4. append into container



// spinner show and hide

const showSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
};

const hideSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.add("hidden");
};



// Variables

let cart = [];
let total = 0;


// open and  close modal

const openModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            const plant = data.plants;

            document.getElementById("modal-title").textContent = plant.name || "No Name";
            document.getElementById("modal-image").src = plant.image || "";
            document.getElementById("modal-description").textContent = plant.description || "No description available.";
            document.getElementById("modal-category").textContent = `Category: ${plant.category || "N/A"}`;
            document.getElementById("modal-price").textContent = `৳ ${plant.price || 500}`;

            const modal = document.getElementById("plant-modal");
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        })
        .catch(err => console.error("Modal Error:", err));
};

const closeModal = () => {
    const modal = document.getElementById("plant-modal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
};


// load categories

const loadCategories = () => {
    showSpinner();
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayCategories(json.categories))
        .catch(err => console.log(err))
        .finally(() => hideSpinner());
};

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let category of categories) {
        const btn = document.createElement("button");
        btn.textContent = category.category_name;
        btn.className = "font-semibold px-2 m-2 w-fit rounded-lg hover:bg-[#16a34a]";

        btn.addEventListener("click", () => {
            loadPlantCategory(category.id);
        });

        categoriesContainer.appendChild(btn);
    }
};


// load all plants
const loadCard = () => {
    showSpinner();
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(json => displayCard(json.plants))
        .finally(() => hideSpinner());
};


// display cards

const displayCard = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let card of cards) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <div class="border p-4 rounded">
                <div class="bg-[#ffffff]">
                    <img src="${card.image}" alt="${card.plant_name}" class="w-full h-40 object-cover rounded bg-[#d1d5db]">
                </div>
                <h2 onclick="openModal('${card.id}')" class="text-[#1f2937] text-lg font-bold mt-2 cursor-pointer hover:underline">${card.name}</h2>
                <p class="text-[#1f2937] text-xs">A fast-growing tropical tree.</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-[#15803d] font-semibold">${card.category}</span>
                    <span class="text-[#1f2937] text-xl font-bold">৳ ${card.price || 500}</span>
                </div>
                <button id="btn-${card.id}" type="button"
                    class="mt-3 w-full bg-[#15803d] text-[#ffffff] py-2 rounded-full hover:bg-[#16a34a]">
                    Add to Cart
                </button>
            </div>
        `;
        cardContainer.appendChild(btnDiv);

        
        // add to cart event
        
        document.getElementById(`btn-${card.id}`).addEventListener("click", () => {
            addToCart({name: card.name, price: card.price || 500});
            alert(`${card.name} added to cart!`);
        });
    }
};


// load plants category

const loadPlantCategory = (id) => {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => displayCard(json.plants))
        .finally(() => hideSpinner());
};


// cart 
const addToCart = (plant) => {
    cart.push(plant);
    total += plant.price;
    updateCartUI();
};

const removeFromCart = (index) => {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
};

const updateCartUI = () => {
    const cartDiv = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cartContent = "";

    if (cart.length === 0) {
        cartContent = `<p class="text-sm text-gray-600 text-center py-8">Your cart is empty</p>`;
    } else {
        cartContent = "<ul class='text-sm'>";
        cart.forEach((item, i) => {
            cartContent += `<li class="flex justify-between items-center mb-2">
                        ${item.name} - ৳ ${item.price}
                        <span class="cursor-pointer text-red-500" onclick="removeFromCart(${i})">❌</span>
                    </li>`;
        });
        cartContent += "</ul>";
    }

    cartDiv.innerHTML = cartContent;
    cartTotal.textContent = `৳ ${total}`;
};


loadCard();
loadCategories();


