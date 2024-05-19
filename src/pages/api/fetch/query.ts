import type { APIRoute } from "astro";

interface FoodItem {
  name: string;

  // Add other properties as needed
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const search = formData.get("search")?.toString() || "";

  const foodItems = await fetchFoodItems(search);

  const html = `
    <div class="overflow-hidden">
      ${foodItems.length > 0 ? `
        <ul class="flex flex-col gap-2 px-2 py-2 overflow-hidden">
          ${foodItems.map(item => `
            <li class="cursor-pointer " 
            hx-trigger="click"
            hx-post="/api/fetch/click?selected=${item}"
            hx-target="#tags"
            hx-swap="beforeend"
            >
              ${item}
            </li>
          `).join('')}
        </ul>
      ` : `
        <p class="p-2">No food items found.</p>
      `}
    </div>
  `;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};

async function fetchFoodItems(search: string): Promise<FoodItem[]> {
  const API_KEY = "235652c2433d4ff48133864d0d8b6e4a"
  const url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${encodeURIComponent(search)}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch food items");
    }

    let foods = []
    const data = await response.json();
    Object.entries(data['results']).forEach((item) => {
      foods.push(item[1]['name'])
    }) 

    console.log(foods)



    return foods as FoodItem[];
  } catch (error) {
    console.error("Error fetching food items:", error);
    return [];
  }
}

// Usage example
// fetchFoodItems()
//   .then((foodItems) => {
//     console.log("Food items:", foodItems);
//     // Process the food items as needed
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
