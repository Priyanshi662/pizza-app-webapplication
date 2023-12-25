// how pizza will be structured
class Pizza{
    constructor(id,name,price,url,desc)
    {
        // this keyword holds the 
        this.id=id;
        this.name=name;
        this.price=price;
        this.url=url;
        this.desc=desc;
        this.isAddedInCart=false;
    }
}
export default Pizza;