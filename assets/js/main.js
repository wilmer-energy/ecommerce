
let fragmento = ""
let divVacio = document.querySelector(".carroVacio")
let divCarrito = document.querySelector(".articulosAniadidos")
let c3 = 0
let vacio = false
let itemsEnCarro = []
let total = [0, 0]

let bolsita = document.getElementById("articulosEnCarro")
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
let descarga = JSON.parse(window.localStorage.getItem("arreglo"))
let descargaTotal = JSON.parse(window.localStorage.getItem("total"))
if (descarga !== null) {
  itemsEnCarro = descarga

}
if (descargaTotal !== null) {
  bolsita.textContent = descargaTotal[0]

}



//porque tambien me imprime en el grande??

//Crear el array en el HTML, y crearle el estilado en css

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
  if (itemsEnCarro[0] !== undefined && vacio === false) {
    //desaparecer el div
    divVacio.classList.add("carroVacioNone")
    vacio = true
    if (itemsEnCarro !== null) {
      imprimirArray(itemsEnCarro)//??
    }

  }
})

//desactivar el carro
let x = document.querySelector(".carroInactivo>span")
x.addEventListener("click", () => {
  divCarro.classList.remove("carrito")
})

//añadir productos al carro


function carrito(id) {
  
    console.log("paso por aqui")
    console.log(items[id].name)
    //crear el array
    let aux = {
      id: id,
      idp: id,
      name: items[id].name,
      price: items[id].price,
      image: items[id].image,
      category: items[id].category,
      quantity: items[id].quantity,
      cantidad: 1,
    }
    
    itemsEnCarro.push(aux)
    itemsEnCarro[itemsEnCarro.length - 1].id = itemsEnCarro.length - 1

    //condicional para primer caso
     //eliminar la imagen de carrito vacio
          if (vacio === false) {
            divVacio.classList.add("carroVacioNone")
            vacio = true
          }
        
          //imprimir el array
          imprimirArray(itemsEnCarro)
  
  
   
  }
 


function clickMasMenos(id, boo) {
  //modificar en el array la cantidad
    if (boo === true) {
      itemsEnCarro[id].cantidad++
    } else { itemsEnCarro[id].cantidad-- }


    //imprimir el array de nuevo
    imprimirArray(itemsEnCarro)
  



}
function Eliminar(id) {
  //modificar e imprimir
  let posItem = itemsEnCarro[id].idp
  itemsEnCarro.splice(id, 1)
  //si se elimina, todos los id cambian
  for (i = id; i <= itemsEnCarro.length - 1; i++) {
    itemsEnCarro[i].id--
  }
  imprimirArray(itemsEnCarro)
  //si el array esta vacio, imprimir que el carro esta vacio
  if (itemsEnCarro[0] === undefined) {
    divVacio.classList.remove("carroVacioNone")
    vacio = false
  }
}


function imprimirArray(arreglo) {
  //Eliminar los repetidos
  let a = 0
  let pos = []
  for (i = 0; i <= arreglo.length - 1; i++) {
    a = 0
    pos = []
    for (j = 0; j <= arreglo.length - 1; j++) {
      if (arreglo[i].idp === arreglo[j].idp) {//es id es la posicion
        a++
        if (a >= 2) { pos.push(j) }
      }
    }
    //eliminar de atras
    for (k = pos.length - 1; k >= 0; k--) {

      arreglo.splice(pos[k], 1)
      arreglo[i].cantidad++
    }
  }


  fragmento = ""
  arreglo.forEach(elements => {
    fragmento += `
    <div class="tarjetaProducto">
    <img src="${elements.image}" alt="">
    <div>
        <h3>${elements.name}</h3>
        <span class="gris">Stock: ${elements.quantity} |</span><span class="rojo"> $${elements.price}</span><br>
        <span class="rojo texto-medio">Subtotal: $${elements.cantidad * elements.price}</span>
        <div><span class="botonUnidades" onclick="clickMasMenos(${elements.id},false)">-</span><span class="texto-medio">${elements.cantidad} units</span><span class="botonUnidades" onclick="clickMasMenos(${elements.id},true)">+</span><i onclick="Eliminar(${elements.id})">E</i></div>
    </div>
    </div>`
  })
  divCarrito.innerHTML = fragmento
  //almacenar el array
  let subir = JSON.stringify(arreglo)
  window.localStorage.setItem("arreglo", subir)


  //crear el arreglo total
  total[0] = 0
  total[1] = 0
  for (i = 0; i <= arreglo.length - 1; i++) {
    total[0] = total[0] + arreglo[i].cantidad
    total[1] = total[1] + arreglo[i].cantidad * arreglo[i].price
  }

  //imprimir el array
  fragmento = ""
  fragmento = `<span id="items">${total[0]} items</span><span id="precio">$${total[1]}</span>`
  let divTotal = document.querySelector(".total")
  divTotal.innerHTML = fragmento

  //almacenar el array
  window.localStorage.setItem("total", JSON.stringify(total))

  bolsita.textContent = total[0]



}