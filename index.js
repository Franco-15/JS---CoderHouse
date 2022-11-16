// /*SELECCION DE BEBIDAS PARA CARRITO Y ACUMULACION DEL MONTO TOTAL*/

// class Bebida {
//   constructor(id, tipo, bebida, precio) {
//     this.id = id;
//     this.tipo = tipo;
//     this.bebida = bebida;
//     this.precio = precio;
//   }
// }

// function menu() {
//   let opcion = prompt(
//     "BIENVENIDO AL MERCADO DE BEBIDAS \n \
//       Seleccione una opcion:\n \
//       - Vinos \n \
//       - Cervezas \n \
//       - Aperitivos \n \
//       - Energizantes \n \
//       - BebidasBlancas \n \
//       - Sin alcohol \n \
//       - Salir \n"
//   );

//   return opcion;
// }

// function main() {
//   let total = 0;



//   let tipoElegido = menu().toLowerCase();
//   let eleccion;
//   let bebida;
//   let carrito = [];
//   let bebidaElegida;
//   while (tipoElegido !== "salir") {
//     bebida = tipoBebida[tipoElegido]
//       .map((e) => {
//         return `- ${e.bebida}   $${e.precio}`;
//       })
//       .join("\n");
//     if (bebida) {
//       eleccion = prompt(`Seleccione una bebida:\n\n${bebida}`);
//       bebidaElegida = tipoBebida[tipoElegido].find(
//         (e) => e.bebida === eleccion
//       );
//       if (bebidaElegida) {
//         carrito.push(bebidaElegida);
//         alert(`Bebida ${bebidaElegida.bebida} agregada al carrito!`);
//       } else alert("La bebida elegida no existe");
//     } else alert("El tipo de bebida seleccionada no existe");
//     console.log(carrito);
//     tipoElegido = menu().toLowerCase();
//   }

//   carrito.forEach((e) => {
//     total += e.precio;
//   });
//   alert(`Gracias por su compra! \n\n El total a pagar es $${total}`);
// }

// main();
function setCard(id, bebida, precio, img, descripcion) {
  return `<div class="card mb-3" style="max-width: 450px;">
  <div class="row g-0">
    <div class="divImg col-md-4">
      <img src=${img.src} class="imgCard img-fluid rounded-start" alt=${img.alt}>
    </div>
    <div class="cardText col-md-8">
      <div class="card-body">
        <div class="cardBody-descripcion">  
          <h4 class="card-title">$${precio}</h4>
          <p class="card-text">${bebida.toUpperCase()}</p>
          <p class="card-text">${descripcion}</p>
        </div>
        <div class="cardBody-comprar">
          <button id=${id} type="button" class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>
</div>`
}

class Bebida {
  constructor(id, tipo, nombre, precio, descripcion, img) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
  }
}

function main() {
  tipoBebida = {
    vinos: [
      new Bebida(1, "vinos", "colon", 270, "Vino Colon Malbec", { src: 'img/vinos/colon-malbec.jpg', alt: 'Vino Colon Malbec' }),
      new Bebida(2, "vinos", "don valentin", 370, "Vino Don Valentin Malbec", { src: 'img/vinos/donValentinMalbec.png', alt: 'Vino Don Valentin Malbec' }),
      new Bebida(3, "vinos", "rutini", 470, "Vino Rutini", { src: 'img/vinos/tintoRutini.jpeg', alt: 'Vino Rutini' }),
    ],
    cervezas: [
      new Bebida(4, "cervezas", "patagonia", 570, "Cerveza Patagonia Amber Lage", { src: 'img/cervezas/PatagoniaAmberLage730.png', alt: 'Cerveza Patagonia Amber Lage' }),
      new Bebida(5, "cervezas", "quilmes", 470, "Cerveza Quilmes", { src: 'img/cervezas/quilmesLitro.jpg', alt: 'Cerveza Quilmes' }),
      new Bebida(6, "cervezas", "imperial", 370, "Cerveza Imperial Stout", { src: 'img/cervezas/imperialStoutLitro.png', alt: 'Cerveza Imperial Stout' }),
    ],
    aperitivos: [
      new Bebida(7, "aperitivos", "branca", 470, "Fernet Branca", { src: 'img/aperitivos/fernet-branca-1lt.jpg', alt: 'Fernet Branca' }),
      new Bebida(8, "aperitivos", "gancia", 170, "Gancia", { src: 'img/aperitivos/gancia.jpg', alt: 'Gancia' }),
      new Bebida(9, "aperitivos", "campari", 370, "Campari", { src: 'img/aperitivos/campari.jpg', alt: 'Campari' }),
    ],
    bebidasBlancas: [
      new Bebida(10, "bebidasBlancas", "gin bombay", 470, "Gin Bombay", { src: 'img/bebidaBlanca/ginBombay.jpg', alt: 'Gin Bombay' }),
      new Bebida(11, "bebidasBlancas", "absolut", 270, "Vodka Absolut", { src: 'img/bebidaBlanca/absolut.jpeg', alt: 'Vodka Absolut' }),
      new Bebida(12, "bebidasBlancas", "jackDaniels", 370, "Jack Daniels", { src: 'img/bebidaBlanca/jackDaniels.png', alt: 'Jack Daniels' }),
    ],
    energizantes: [
      new Bebida(13, "energizantes", "speed", 470, "Speed", { src: 'img/energizantes/speed.png', alt: 'Speed' }),
      new Bebida(14, "energizantes", "monster", 370, "Monster", { src: 'img/energizantes/monster.webp', alt: 'Monster' }),
      new Bebida(15, "energizantes", "blue demon", 270, "Blue Demon", { src: 'img/energizantes/blueDemon.jpg', alt: 'Blue Demon' }),
    ],
    sinAlcohol: [
      new Bebida(16, "sinAlcohol", "coca-cola", 170, "Coca-Cola", { src: 'img/sin-alcohol/cocaCola.webp', alt: 'Coca-Cola' }),
      new Bebida(17, "sinAlcohol", "sprite", 370, "Sprite", { src: 'img/sin-alcohol/sprite.webp', alt: 'Sprite' }),
      new Bebida(18, "sinAlcohol", "citric", 570, "Jugo CITRIC", { src: 'img/sin-alcohol/Jugo-Naranja-Citric-1-5l-1-879152.png', alt: 'Jugo CITRIC' }),
    ],
  };

  const linkTiposBebidas = [
    document.getElementById("aperitivos"),
    document.getElementById("vinos"),
    document.getElementById("cervezas"),
    document.getElementById("energizantes"),
    document.getElementById("bebidasBlancas"),
    document.getElementById("sinAlcohol")
  ]


  linkTiposBebidas.forEach((link) => {
    link.onclick = () => {
      console.log(link.l)
      document.getElementById("divMain").remove()
      const main = document.getElementById('main');
      main.innerHTML = `<div id='divMain' class="mainInicio row"> </div>`
      const divMain = document.getElementById('divMain')
      tipoBebida[link.id].forEach(bebida => {
        divMain.innerHTML += setCard(bebida.id, bebida.nombre, bebida.precio, bebida.img, bebida.descripcion)
      })

    }
  })
}

main();