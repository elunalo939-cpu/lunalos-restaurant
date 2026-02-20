function openMenu(){
document.getElementById("sideMenu").style.width="250px";
}

function closeMenu(){
document.getElementById("sideMenu").style.width="0";
}

const foods=[
{name:"Ugali & Sukuma Wiki",price:250,category:"Vegetarian",img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Nyama Choma",price:800,category:"Meat",img:"https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Pilau Beef",price:450,category:"Meat",img:"https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Chicken Biryani",price:650,category:"Meat",img:"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Tilapia Fry",price:700,category:"Meat",img:"https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Chapati & Beans",price:300,category:"Vegetarian",img:"https://images.pexels.com/photos/69374/pexels-photo-69374.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Matoke Stew",price:400,category:"Vegetarian",img:"https://images.pexels.com/photos/5938/food-salad-restaurant-person.jpg?auto=compress&cs=tinysrgb&w=600"},
{name:"Githeri Special",price:350,category:"Vegetarian",img:"https://images.pexels.com/photos/7610/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"},
{name:"Mukimo & Beef",price:550,category:"Meat",img:"https://images.pexels.com/photos/2293579/pexels-photo-2293579.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Fish Curry",price:600,category:"Meat",img:"https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Chicken Stew",price:500,category:"Meat",img:"https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Fried Rice & Chicken",price:700,category:"Meat",img:"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Vegetable Stir Fry",price:300,category:"Vegetarian",img:"https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Mandazi & Tea Combo",price:250,category:"Drinks",img:"https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Samosa (3pcs)",price:250,category:"Vegetarian",img:"https://images.pexels.com/photos/357737/pexels-photo-357737.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Pork Wet Fry",price:650,category:"Meat",img:"https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Omena Fry",price:400,category:"Meat",img:"https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Beef Burger",price:500,category:"Meat",img:"https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Chips Masala",price:350,category:"Vegetarian",img:"https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600"},
{name:"Kuku Kienyeji",price:900,category:"Meat",img:"https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=600"}
];

const deliveryAreas={
Nairobi:["Westlands","Kilimani","Karen","Langata","Embakasi","Kibera"],
Nakuru:["Nakuru Town","Naivasha","Molo","Gilgil"],
Machakos:["Machakos Town","Mavoko","Kangundo","Yatta"]
};

let cart=[], total=0;

function renderFood(items){
const foodList=document.getElementById("foodList");
foodList.innerHTML="";
items.forEach((food,index)=>{
foodList.innerHTML+=`
<div class="food-card">
<img src="${food.img}">
<div class="food-card-content">
<h3>${food.name}</h3>
<p>KSh ${food.price}</p>
<button onclick="addToCart(${index})">Add to Cart</button>
</div>
</div>`;
});
}

renderFood(foods);

function addToCart(index){
cart.push(foods[index]);
total+=foods[index].price;
updateCart();
}

function updateCart(){
document.getElementById("cartItems").innerHTML=
cart.map(item=>`<li>${item.name} - KSh ${item.price}</li>`).join("");
document.getElementById("total").innerText=total;
}

function updateTowns(){
const county=document.getElementById("county").value;
const town=document.getElementById("town");
town.innerHTML='<option value="">Select Town</option>';
if(deliveryAreas[county]){
deliveryAreas[county].forEach(t=>{
town.innerHTML+=`<option>${t}</option>`;
});
}
}

function filterFood(){
const search=document.getElementById("search").value.toLowerCase();
const category=document.getElementById("category").value;
const filtered=foods.filter(f=>
f.name.toLowerCase().includes(search) &&
(category==="" || f.category===category)
);
renderFood(filtered);
}

function placeOrder(){
const name=document.getElementById("customerName").value;
const county=document.getElementById("county").value;
const town=document.getElementById("town").value;

if(cart.length===0 || !name || !county || !town){
alert("Please fill all details and add items.");
return;
}

let order=cart.map(i=>`${i.name} - KSh ${i.price}`).join("%0A");

let message=`Hello Lunalo's Restaurant,%0AName: ${name}%0ALocation: ${town}, ${county}%0AOrder:%0A${order}%0ATotal: KSh ${total}%0AI will pay via M-Pesa 0710545977`;

window.open(`https://wa.me/254710545977?text=${message}`);
}