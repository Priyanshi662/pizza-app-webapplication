// controller -handles communication between html and network calls 
// HTML -> controller(DOM code -> handles interaction between HTML and services) -> logic(services folder)
// controller is used to create loosely coupled application (so that HTML doesn't directly connect to the logic)
import PizzaOperations from '../services/pizza-operations.js';

async function printPizzas()
{
    const allPizzas=await PizzaOperations.getPizzas();
    console.log('all pizzas' , allPizzas);
    const div=document.getElementById('pizza-output');
    for(var pizza of allPizzas){
        const card=createCard(pizza);
        div.appendChild(card);
    }
}
printPizzas();

const printTotal=(pizzas)=>
     pizzas.reduce((sum , pizza)=>sum+parseFloat(pizza.price), 0);
 
     function printBasket() {
        const basketDiv = document.getElementById('basket');
        basketDiv.innerHTML = "";
    
        const pizzaInCart = PizzaOperations.pizza.filter(pizza => pizza.isAddedInCart);
    
        if (pizzaInCart.length === 0) {
            const emptyBasketMsg = document.createElement("p");
            emptyBasketMsg.innerText = "Your basket is empty.";
            basketDiv.appendChild(emptyBasketMsg);
        } else {
            const ul = document.createElement('ul');
            pizzaInCart.forEach(pizza => {
                const li = printItem(pizza);
                ul.appendChild(li);
            });
    
            const total = printTotal(pizzaInCart);
            const totalDiv = document.createElement("div");
            totalDiv.className = "alert alert-primary";
            totalDiv.innerHTML = `<span>Total Amount: $${total.toFixed(2)}</span>`;
            
            basketDiv.appendChild(ul);
            basketDiv.appendChild(totalDiv);
        }
    }
    
    function printItem(pizza) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${pizza.name}</strong> - $${parseFloat(pizza.price).toFixed(2)}`;
        return li;
    }
    

function addToCart()
{
    console.log('Add to cart Call',this);
    const currentButton=this;
    const pizza_id=currentButton.getAttribute('pizza-id');
    PizzaOperations.searchPizza(pizza_id);
    console.log(pizza_id);
    printBasket();
}

function createCard(pizza){
    const colDiv=document.createElement('div');
    colDiv.className='col-4';

    const cardDiv=document.createElement('div');
    cardDiv.className="card";
    cardDiv.style={width:'18rem'};

    const img=document.createElement('img');
    img.src=pizza.url;
    img.className='card-img-top';
    img.alt='pizza-image';
    cardDiv.appendChild(img);

    const cardBody=document.createElement('div');
    cardBody.className='card-body';

    const h5=document.createElement('h5');
    h5.className='card-title';
    h5.innerText=pizza.name;
    cardBody.appendChild(h5);

    const pTag=document.createElement('p');
    pTag.className='card-text'; 
    pTag.innerText=pizza.desc;
    cardBody.appendChild(pTag);

    const pTag2=document.createElement('p');
    pTag2.className='card-price';
    pTag2.innerText=   `$${pizza.price}`;
    cardBody.appendChild(pTag2);

    const button=document.createElement('button');
    button.className='btn btn-primary';
    button.innerText='Add to Cart';
    // setting custom attribute pizza-id -every add to card has unique id attribute of the particular pizza
    button.setAttribute('pizza-id',pizza.id);
    button.addEventListener('click',addToCart);
    cardBody.appendChild(button);

    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardDiv);
    return colDiv;
}

/*
Adding basket functionality
a. add to card button event click attach
-> where -controller(DOM)
b. every pizza has unique id coming from backend when we click on a button er get pizza unique id
c. we attach an id with every pizza
d. now lookup the id inside the pizza array by using find method in array, 
   now once u get the object then mark a flag add in card in every object 
e/ print in basket those object whose mark flag is true
 */