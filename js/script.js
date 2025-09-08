// console.log("checked ok");

// console.log(lessons);  // 13 data ok
    // 1. get the container & empty
    // 2. get into evey lessons
         // 3. create element
         // 4. append into container

const loadCategories = () =>{
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

    for(let category of categories){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML= `
                   <button class="font-semibold px-2 m-2 w-fit rounded-lg hover:bg-[#16a34a]">${category.category_name}</button>

        `;
        categoriesContainer.append(btnDiv);
    }

};

loadCategories();