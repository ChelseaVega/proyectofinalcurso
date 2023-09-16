const url = 'https://chicharroneraweb.onrender.com/menu';

export const obtenerProductos = async()=>{
    //consultar el db.json y obtener el listado de productos que se encuentran alli
    try{
        const resultado = await fetch(url);
        const productos = await resultado.json();
        return productos;
    }catch(error){
        console.log(error);
    }
}

export const obtenerProducto = async id =>{
    //aqui vamos a consultar un solo producto
    try{
        const resultado = await fetch(`${url}/${id}`);
        const producto = await resultado.json();
        return producto;
    }catch(error){
        console.log(error);
    }
}

export const nuevoProducto = async producto=>{
    //este metodo es para agregar nuevo producto db.json
    console.log(producto);
    try{
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(producto),
            headers:{
                'Content-Type':'application/json'
            }
        });
    }catch(error){
        console.log(error);
    }
}

export const editarProducto = async producto  =>{
    //este metodo seria para editar un producto por el id que estamos resiviendo
    try{
        await fetch(`${url}/${producto.id}`,{
            method:'PUT',
            body:JSON.stringify(producto),
            headers:{
                'Content-Type':'application/json'
            }
        });
    }catch(error){
        console.log(error)
    }
} 

export const eliminarProducto = async id=>{
    try{
        await fetch(`${url}/${id}`,{
            method:'DELETE'
        });
    }catch(error){
        console.log(error);
    }
}

