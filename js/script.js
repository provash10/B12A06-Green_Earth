// console.log("checked ok");

// console.log(lessons);  // 13 data ok
// 1. get the container & empty
// 2. get into evey lessons
// 3. create element
// 4. append into container

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        // .then(json => console.log(json))
        // .then(json => console.log(json.categories))
        .then(json => displayCategories(json.categories))
};

const displayCategories = (categories) => {
    // console.log(categories); //checked
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                   <button class="font-semibold px-2 m-2 w-fit rounded-lg hover:bg-[#16a34a]">${category.category_name}</button>

        `;
        categoriesContainer.append(btnDiv);
    }

};

// load categories all products 2Q
const loadProducts = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then(json => displayProducts(json.plants))
};

const displayProducts = (products) => {
    console.log(products); // checked
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    for (let product of products) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `

                    <div class="border p-4 rounded">
                        <div class="bg-[#ededed]">
                            <img class="w-full h-40 object-cover rounded bg-[#d1d5db]" alt="">
                        </div>
                        <h2 class="text-[#1f2937] text-lg font-bold mt-2">Mango Tree</h2>
                        <p class="text-[#1f2937] text-xs">A fast-growing tropical tree that produces delicious mangoes
                            in summer.</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-[#15803d] font-semibold">Fruit Tree</span>
                            <span class="text-[#1f2937] text-xl font-bold">৳ 500</span>
                        </div>
                        <button type="button"
                            class="mt-3 w-full bg-[#15803d] text-[#ffffff] py-2 rounded-full hover:bg-[#16a34a]">
                            Add to Cart
                        </button>
                    </div>
        

        `;

        productsContainer.append(btnDiv);
    }

};

loadProducts();
loadCategories();