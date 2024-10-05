import {create} from "zustand";

export const useProductStore = create( (set)=>({
    products:[],

    setProduct: (products)=> set({ products }),
    createProduct: async (newProduct) =>{
        if( !newProduct.name || !newProduct.price || !newProduct.image ){
            return { success:false , message: "Please fill in all fields" }
        }
        const res = await fetch( "/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct)
        } )
        const data = await res.json();
        set((state)=>({products:[...state.products,data]}));
        return{success:true , message:"Product Created Successfully"}
    },

    fetchProducts: async ()=>{
        const res = await fetch("api/products");
        const data = await res.json();
        set({products: data.data});
    },

    deleteProducts: async(pid)=>{
        const res = await fetch( `api/products/${pid}` , {
            method: "DELETE"
        } );
        const data = await res.json();
        if( !data.success )
            return{ success: false , message: data.message };
        
        // updates UI immediately without needing to refresh
        set( state=>({
            products: state.products.filter( (product)=> product._id !== pid )
        }) );

        return{ success: true , message: data.message };
    },

    updateProducts: async (pid , updatedProduct)=>{
        const res = await fetch( `api/products/${pid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct) // Send updated product data here
        } );
        const data = await res.json();
        if( !data.success ){
            return{ success: false , message: data.message };
        }

        set(state=>({
            products: state.products.map( product => (product._id === pid ? data.data : product) )
        }))

        return{ success: true , message: data.message };
    }
}))