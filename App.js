import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';


class App extends React.Component {
constructor() {
        super();
        this.state = {
          products:[],
          loading: true  
        };

        this.db=firebase.firestore();

        // this.increaseQuantity = this.increaseQuantity.bind(this);
      }

      componentDidMount() {
            // firebase
            //   .firestore()
            //   .collection('products')
            //   .get()
            //   .then((snapshot) => {
            //       console.log(snapshot);

            //       snapshot.docs.map((doc)=>{
            //           console.log(doc.data())
            //       });

            //       const products=snapshot.docs.map((doc) => {
            //           const data= doc.data();

            //           data['id']= doc.id;
            //           return data;
            //       })

            //       this.setState({
            //           products,
            //           loading:false
            //       })

            //   })


            this.db
              .collection('products')
            //   .where('price','==',500)
            //   .where('title','==','Bracelet')
              .orderBy('price','desc')
              .onSnapshot((snapshot) => {
                console.log(snapshot);

                snapshot.docs.map((doc)=>{
                    console.log(doc.data())
                });

                const products=snapshot.docs.map((doc) => {
                    const data= doc.data();

                    data['id']= doc.id;
                    return data;
                })

                this.setState({
                    products,
                    loading:false
                })

            })

      }

      handleIncreaseQuantity=(product)=>{
        console.log('increase qty of ',product);
        const {products}=this.state;
        const index= products.indexOf(product);

        // products[index].qty +=1;

        // this.setState({
        //     products: products
        // })

        const docRef= this.db.collection('products').doc(products[index].id);

        docRef
          .update({
              qty: products[index].qty + 1
          })
          .then(() => {
              console.log('Updated successfully')
          })
          .catch((error) => {
              console.log('Error: ',error)
          })

      }

      handleDecreaseQuantity=(product)=>{
        console.log('decrease qty of ',product);
        const {products}=this.state;
        const index= products.indexOf(product);

        if(products[index].qty===0){return;}

        // products[index].qty -=1;

        // this.setState({
        //     products
        // })

        const docRef= this.db.collection('products').doc(products[index].id);

        docRef
          .update({
              qty: products[index].qty - 1
          })
          .then(() => {
              console.log('Updated successfully')
          })
          .catch((error) => {
              console.log('Error: ',error)
          })

      }

      handleDeleteProduct=(id)=>{
        const {products}=this.state;

        // const items=products.filter( (item)=> item.id!==id); //gives a new array

        // this.setState({
        //     products:items
        // })

        const docRef= this.db.collection('products').doc(id);

        docRef
          .delete()
          .then(() => {
            console.log('Deleted successfully')
        })
        .catch((error) => {
            console.log('Error: ',error)
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
            if(product.qty>0){
                cartTotal= cartTotal + product.qty *product.price;    
            }
            return '';
        });

        return cartTotal;
      }

      addProduct = () => {
          this.db
            .collection('products')
            .add({
                img:'',
                price: 9000,
                qty: 3,
                title:'Washing Machine'
            })
            .then((docRef) => {
                console.log('Product has been added',docRef);
            })
            .catch((error) => {
                console.log('Error : ',error);
            })
      }

    render(){
        const {products,loading} =this.state;
        return ( 
            <div className = "App">
                <Navbar count={this.getCartCount()} />
                {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}} >Add a Product</button> */}
                <Cart 
                products={products}
                onIncreaseQuantity={this.handleIncreaseQuantity}
                onDecreaseQuantity={this.handleDecreaseQuantity}
                onDeleteProduct={this.handleDeleteProduct}
                />
                {loading && <h1>Loading Products...</h1>}
                <div style= {{fontSize:20, padding: 10}}>TOTAL: {this.getCartTotal()} </div>
            </div>
        );
    }
}

export default App;