let itemsEnCarro = []
let divVacio = document.querySelector(".carroVacio")
let divCarrito = document.querySelector(".articulosAniadidos")
let c3 = 0
let vacio=false
const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: 14.00,
    image: './assets/images/featured1.png',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.00,
    image: './assets/images/featured2.png',
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.00,
    image: './assets/images/featured3.png',
    category: 'sweatshirts',
    quantity: 20
  },
  {
    id: 4,
    name: 'Sweatshirts',
    price: 30.00,
    image: './assets/images/featured3.png',
    category: 'sweatshirts',
    quantity: 10
  }
]
let categoria = [
  {
    name: "Show all",
    cantidad: 4,
  },
  {
    name: "Hoodies",
    cantidad: 1,
  }, {
    name: "Shirts",
    cantidad: 1,
  }, {
    name: "Sweatshirts",
    cantidad: 2,
  }
]
//Crear el array en el HTML, y crearle el estilado en css
let fragmento = ""
let c = 0
let categoriaLi = document.querySelector(".categoria")
categoria.forEach(elemento => {
  fragmento += `<li>
<h3 class="liCategoria" data-n=${c} onclick="clickFilter(${c})">${elemento.name}</h3>
<span>${elemento.cantidad} products</span></li>`
  c++
})
categoriaLi.innerHTML = fragmento

//Añadir tarjetas
fragmento = ""
let divAniadir = document.querySelector(".productos")
let c2 = 0
items.forEach(element => {
  fragmento += `<div>
    <div class="imagen"><img src="${element.image}" alt=""></div>
    <button data.n="${c2}" onclick="carrito(${c2})" class"aniadir">+</button><br><span class="texto-medio">$${element.price} </span><span class="texto-bajo">| Stock: ${element.quantity}</span><br><span class="texto-medio">${element.name}</span>
</div>`
  c2++
})
divAniadir.innerHTML = fragmento

//Funcion filtrar que recibe el id para luego pedir el nombre y filtrar en base a eso
function clickFilter(id) {
  filtro = document.getElementsByClassName("liCategoria")
  filtrar = filtro[id].textContent
  let aux = items.filter(articulo => {
    let conn = true
    if (id === 0) {
      conn = true
    } else { conn = articulo.name === filtrar }
    return conn
  })

  //Crear las tarjetas
  fragmento = ""
  aux.forEach(element => {
    fragmento += `<div>
      <div class="imagen"><img src="${element.image}" alt=""></div>
      <button>+</button><br><span class="texto-medio">$${element.price} </span><span class="texto-bajo">| Stock: ${element.quantity}</span><br><span class="texto-medio">${element.name}</span>
  </div>`
  })
  divAniadir.innerHTML = fragmento

}
//activar el carro
let carro = document.getElementById("carro")
let divCarro = document.querySelector(".carroInactivo")

carro.addEventListener("click", () => {
  divCarro.classList.add("carrito")
  if (itemsEnCarro[0] !== undefined && vacio===false) {
    //desaparecer el div
    divVacio.classList.add("carroVacioNone")
    vacio=true
  }
})

//desactivar el carro
let x = document.querySelector(".carroInactivo>span")
x.addEventListener("click", () => {
  divCarro.classList.remove("carrito")
})

//añadir productos al carro


function carrito(id) {  
   console.log(items[id].name)
   //crear el array
   let aux={
    id: id,
    name: items[id].name,
    price: items[id].price,
    image: items[id].image,
    category: items[id].category,
    quantity: items[id].quantity,
    cantidad: 1
   }
   itemsEnCarro.push(aux)


   //eliminar la imagen de carrito vacio
   if(vacio===false){
    divVacio.classList.add("carroVacioNone")
    vacio=true
   }
   


   //imprimir el array
   fragmento=""
   itemsEnCarro.forEach(elements=>{
    fragmento += `
    <div class="tarjetaProducto">
    <img src="${elements.image}" alt="">
    <div>
        <h3>${elements.name}</h3>
        <span class="gris">Stock: ${elements.quantity} |</span><span class="rojo"> $${elements.price}</span><br>
        <span class="rojo texto-medio subtotal${id}">Subtotal: $${elements.cantidad * elements.price}</span>
        <div><span class="botonUnidades">-</span><span class="texto-medio unidades${id}">${elements.cantidad} units</span><span class="botonUnidades">+</span><i>E</i></div>
    </div>
    </div>`
   })
    divCarrito.innerHTML=fragmento

}
