import makeNetworkCall from './api-client.js';

import {URL} from '../utils/config.js';
import Pizza from '../models/pizza-model.js';

const PizzaOperations=
{    
    pizza:[],
    searchPizza(pizzaid){
        const pizzaObject=this.pizza.find((pizza)=>pizza.id==pizzaid)
        pizzaObject.isAddedInCart=true;
    },
    async getPizzas()
    {
        const data=await makeNetworkCall(URL);
        const pizzaJSON= data["Vegetarian"];
        // console.log(pizzaJSON);
        const pizzas=pizzaJSON.map(singlePizza=>{
            const pizzaObject=new Pizza(
                singlePizza.id,
                singlePizza.name,
                singlePizza.price,
                singlePizza.assets.
                product_details_page[0].url,
                singlePizza.menu_description
            );
            return pizzaObject;
        });
        this.pizza=pizzas;
        return pizzas;
    }
}
// export async function getPizzas()
// {
//     const data=await makeNetworkCall(URL);
//     const pizzaJSON= data["vegetarian"];
//     console.log(pizzaJSON);
//     const pizzas=pizzaJSON.map(singlePizza=>{
//         const pizzaObject=new Pizza(
//             singlePizza.id,
//             singlePizza.name,
//             singlePizza.price,
//             singlePizza.assets.
//             product_details_page[0].url,
//             singlePizza.menu_description
//         );
//         return pizzaObject;
//     });
//     return pizzas;
// }
export default PizzaOperations;