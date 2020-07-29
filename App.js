import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
constructor() {
        super();
        this.state = {
          products:[
              {
                price: 12000,
                title: "Watch",
                qty: 1,
                img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
                id:1
              },
              {
                price: 12000,
                title: "Phone",
                qty: 10,
                img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
                id: 2
              },
              {
                price: 12000,
                title: "Laptop",
                qty: 4,
                img: "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                id: 3
              }
          ]
        };
        // this.increaseQuantity = this.increaseQuantity.bind(this);
      }

      handleIncreaseQuantity=(product)=>{
        console.log('increase qty of ',product);
        const {products}=this.state;
        const index= products.indexOf(product);

        products[index].qty +=1;

        this.setState({
            products: products
        })
      }

      handleDecreaseQuantity=(product)=>{
        console.log('decrease qty of ',product);
        const {products}=this.state;
        const index= products.indexOf(product);

        if(products[index].qty===0){return;}

        products[index].qty -=1;

        this.setState({
            products
        })
      }

      handleDeleteProduct=(id)=>{
        const {products}=this.state;

        const items=products.filter( (item)=> item.id!==id); //gives a new array

        this.setState({
            products:items
        })
      }

      getCartCount = () => {
            const {products}= this.state;

            let count=0;

            products.forEach( (product) => {
                count += product.qty;
            })
            return count;
      }

      getCartTotal =() => {
        const {products}= this.state;

        let cartTotal=0;

        products.map((product) =>{
                cartTotal= cartTotal + product.qty *product.price;    
        })

        return cartTotal;
      }

    render(){
        const {products} =this.state;
        return ( 
            <div className = "App">
                <Navbar count={this.getCartCount()} />
                <Cart 
                products={products}
                onIncreaseQuantity={this.handleIncreaseQuantity}
                onDecreaseQuantity={this.handleDecreaseQuantity}
                onDeleteProduct={this.handleDeleteProduct}
                />
                <div style= {{fontSize:20, padding: 10}}>TOTAL: {this.getCartTotal()} </div>
            </div >
        );
    }
}

export default App;