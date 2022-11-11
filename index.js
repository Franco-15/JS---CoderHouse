/*SELECCION DE BEBIDAS PARA CARRITO Y ACUMULACION DEL MONTO TOTAL*/

class Bebida {
  constructor(id, tipo, bebida, precio) {
    this.id = id;
    this.tipo = tipo;
    this.bebida = bebida;
    this.precio = precio;
  }
}

function menu() {
  let opcion = prompt(
    "BIENVENIDO AL MERCADO DE BEBIDAS \n \
      Seleccione una opcion:\n \
      - Vinos \n \
      - Cervezas \n \
      - Aperitivos \n \
      - Energizantes \n \
      - Bebidas Blancas \n \
      - Sin alcohol \n \
      - Salir \n"
  );

  return opcion;
}

function main() {
  let total = 0;

  tipoBebida = {
    vinos: [
      new Bebida(1, "vinos", "colon", 270),
      new Bebida(2, "vinos", "trumpeter", 370),
      new Bebida(3, "vinos", "rutini", 470),
    ],
    cervezas: [
      new Bebida(4, "cervezas", "patagonia", 570),
      new Bebida(5, "cervezas", "quilmes", 470),
      new Bebida(6, "cervezas", "brahma", 370),
    ],
    aperitivos: [
      new Bebida(7, "aperitivos", "branca", 470),
      new Bebida(8, "aperitivos", "1882", 170),
      new Bebida(9, "aperitivos", "Campari", 370),
    ],
    "bebidas blancas": [
      new Bebida(10, "bebidas blancas", "gin gordon", 470),
      new Bebida(11, "bebidas blancas", "vodka sky", 270),
      new Bebida(12, "bebidas blancas", "gin bombay", 370),
    ],
    energizantes: [
      new Bebida(13, "energizantes", "speed", 470),
      new Bebida(14, "energizantes", "monster", 370),
      new Bebida(15, "energizantes", "red bull", 270),
    ],
    "sin alcohol": [
      new Bebida(16, "sin alcohol", "coca-cola", 170),
      new Bebida(17, "sin alcohol", "sprite", 370),
      new Bebida(18, "sin alcohol", "citric", 570),
    ],
  };

  let tipoElegido = menu().toLowerCase();
  let eleccion;
  let bebida;
  let carrito = [];
  let bebidaElegida;
  while (tipoElegido !== "salir") {
    bebida = tipoBebida[tipoElegido]
      .map((e) => {
        return `- ${e.bebida}   $${e.precio}`;
      })
      .join("\n");
    if (bebida) {
      eleccion = prompt(`Seleccione una bebida:\n\n${bebida}`);
      bebidaElegida = tipoBebida[tipoElegido].find(
        (e) => e.bebida === eleccion
      );
      if (bebidaElegida) {
        carrito.push(bebidaElegida);
        alert(`Bebida ${bebidaElegida.bebida} agregada al carrito!`);
      } else alert("La bebida elegida no existe");
    } else alert("El tipo de bebida seleccionada no existe");
    console.log(carrito);
    tipoElegido = menu().toLowerCase();
  }

  carrito.forEach((e) => {
    total += e.precio;
  });
  alert(`Gracias por su compra! \n\n El total a pagar es $${total}`);
}

main();
