/*SELECCION DE BEBIDAS PARA CARRITO Y ACUMULACION DEL MONTO TOTAL*/

function menu() {
  let opcion = parseInt(
    prompt(
      "BIENVENIDO AL MERCADO DE BEBIDAS \n \
    Seleccione una opcion:\n \
    1. Coca-Cola \n \
    2. Fernet \n \
    3. Campari \n \
    4. Cerveza \n \
    5. Jugo de naranja CITRIC \n \
    6. Sprite \n \
    7. Vodka \n \
    8. Salir \n"
    )
  );

  return opcion;
}

function main() {
  let total = 0;
  let precio;
  let bebida = menu();

  while (bebida !== 8) {
    if (bebida === 1) {
      precio = 250;
    } else if (bebida === 2) {
      precio = 120;
    } else if (bebida === 3) {
      precio = 300;
    } else if (bebida === 4) {
      precio = 450;
    } else if (bebida === 5) {
      precio = 500;
    } else if (bebida === 6) {
      precio = 640;
    } else if (bebida === 7) {
      precio = 400;
    }

    total += precio;
    alert(`Bebida agregada al carrito!\n \
        Precio bebida = $${precio} \n \
        Total = $${total}\n `);
    bebida = menu();
  }

  if (total) {
    alert(`Muchas gracias por su compra! \n \
    TOTAL = $${total}`);
  }
}

main();
