export default class CartClass {

    constructor(oldCart) {

        if (typeof oldCart === 'undefined')
        {
            this.state = {} // id: {quantity: , link: , price: } 
            this.data = {} // id: { }    
        }else{
            this.state = {...oldCart.state}
            this.data = {...oldCart.data}  
        }
        
    }
    // THIS IS A TEMPORARY FIX SO THAT WE CAN DO STYLING APPROPRIATELY, NEEDS TO BE FIXED IN BACKEND ---------------------------------------------------------------------
    roundOff(number){
        return Math.round(number * 100) / 100
    }

    //-------------------------------------------------------------------------------------------------------------------------
    editCart(id, data){

        let quantity = data.quantity
        let price = this.roundOff(data.price)
        
        if(id in this.state){ // If item exists in cart already
          
            if (quantity <= 0){ 
                delete this.state[id]
            } else {
                this.state[id] = {...this.state[id], quantity: quantity}
            }
          } else { // i.e. if item does not exist in cart
  
            if (quantity > 0){ 
                this.state = { ...this.state, [id]: {quantity: quantity, id: id, price: price}}
            }
          };
    }


    //-------------------------------------------------------------------------------------------------------------------------
    resetCart(id, quantity){
        this.state = {}
        this.data = {}    
    }

    //-------------------------------------------------------------------------------------------------------------------------
    getCartDetails(){
        
        let totalItem = 0
        let totalPrice = 0

        for (let key of Object.keys(this.state)) {
            totalItem += this.state[key].quantity
            totalPrice += this.state[key].quantity*this.state[key].price
        }

        return [totalItem, this.roundOff(totalPrice)]

    }
}
