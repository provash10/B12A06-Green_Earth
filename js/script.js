// console.log("checked ok");

// console.log(lessons);  // 13 data ok
// 1. get the container & empty
// 2. get into evey lessons
// 3. create element
// 4. append into container

// open modal 4
const openModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            const plant = data.plants; // object ধরতে হবে

            // modal data inject
            document.getElementById("modal-title").textContent = plant.name || "No Name";
            document.getElementById("modal-image").src = plant.image || "";
            document.getElementById("modal-description").textContent = plant.description || "No description available.";
            document.getElementById("modal-category").textContent = `Category: ${plant.category || "N/A"}`;
            document.getElementById("modal-price").textContent = `৳ ${plant.price || "N/A"}`;

            // modal show
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
// ============



const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        // .then(json => console.log(json))
        // .then(json => console.log(json.categories))
        .then(json => displayCategories(json.categories))
         .catch(err => console.log(err));
};

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let category of categories) {
        const btn = document.createElement("button");
        btn.textContent = category.category_name; 
        btn.className = "font-semibold px-2 m-2 w-fit rounded-lg hover:bg-[#16a34a]";

        // click event listener
        btn.addEventListener("click", () => {
            loadPlantCategory(category.id);
        });

        categoriesContainer.appendChild(btn);
    }
};


// load categories all Card 2Q
const loadCard = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then(json => displayCard(json.plants))
};

const displayCard = (cards) => {
    // console.log(Card); // checked
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    for (let card of cards) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `

                    <div class="border p-4 rounded">
                        <div class="bg-[#ededed]">
                            <img src="${card.image}" alt="${card.plant_name}" class="w-full h-40 object-cover rounded bg-[#d1d5db]" alt="">
                        </div>
        <h2 onclick="openModal('${card.id}')"
    class="text-[#1f2937] text-lg font-bold mt-2 cursor-pointer hover:underline">
    ${card.name}
</h2>




                        <p class="text-[#1f2937] text-xs">A fast-growing tropical tree that produces delicious mangoes
                            in summer.</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-[#15803d] font-semibold">${card.category}</span>
                            <span class="text-[#1f2937] text-xl font-bold">৳ 500</span>
                        </div>
                        <button type="button"
                            class="mt-3 w-full bg-[#15803d] text-[#ffffff] py-2 rounded-full hover:bg-[#16a34a]">
                            Add to Cart
                        </button>
                    </div>
        

        `;

        cardContainer.append(btnDiv);
    }

};

//load category plant

const loadPlantCategory = (id) => {
    console.log(id);
    const url =(`https://openapi.programming-hero.com/api/category/${id}`)
    fetch (url)
    .then((res)=>res.json())
    .then(json =>displayCard(json.plants))
};

const displayPlantCategory = (plants) =>{
    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML = "";

    for(let plant of plants){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <div class="border p-4 rounded">
                        <div class="bg-[#ededed]">
                            <img src="${plant.image}" alt="${plant.plant_name}" class="w-full h-40 object-cover rounded bg-[#d1d5db]" alt="">
                        </div>
                        <h2 class="text-[#1f2937] text-lg font-bold mt-2">${plant.plant_name}</h2>
                        <p class="text-[#1f2937] text-xs">${plant.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-[#15803d] font-semibold">${plant.category}</span>
                            <span class="text-[#1f2937] text-xl font-bold">৳ ${plant.price}</span>
                        </div>
                        <button type="button"
                            class="mt-3 w-full bg-[#15803d] text-[#ffffff] py-2 rounded-full hover:bg-[#16a34a]">
                            Add to Cart
                        </button>
                    </div>
        
        `;
        plantsContainer.append(btnDiv);
    }
}

// loadPlantCategory();
loadCard();
loadCategories();

