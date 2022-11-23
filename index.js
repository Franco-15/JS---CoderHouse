/*============== CLASES ===============*/
class Usuario {
  constructor(nombre, contraseña, carrito, id) {
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.carrito = carrito;
    this.id = id;
  }
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
/*=======================================*/

/*============== FUNCIONES =========================*/

//Funcion para generar las card
function setCard(id, bebida, precio, img, descripcion) {
  return `<div class="card mb-3">
  <div class="row g-0">
    <div class="divImg col-md-4">
      <img src=${img.src} class="imgCard img-fluid rounded-start" alt=${
    img.alt
  }>
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
</div>`;
}

function setFooter() {
  return `
  <!-- FOOTER -->
    <div class="filaUno">
      <div class="logoDireccion">
        <a href="index.html">
          <p class="logoFooter"><img src="img/MDQ Bebidas.png" alt="logo"></p>
        </a>
        <p>Guemes 2856 - Mar del Plata</p>
      </div>

      <div class="seguinos">
        <p>Seguinos!</p>
        <div class="logosRedes">
          <a href="https://www.facebook.com/" target="_blank"><img src="img/footer/facebook.png"
              alt="icono facebook" /></a>
          <a href="https://www.instagram.com/" target="_blank"><img src="img/footer/Instagram.png"
              alt="icono instagram" /></a>
          <a href="https://twitter.com/" target="_blank"><img src="img/footer/twitter.png" alt="icono twitter" /></a>
        </div>
      </div>
    </div>

    <div class="filaDos">
      <p>
        Desarrollada por Franco Gonzalez - Todos los derechos reservados 2022
      </p>

      <div class="logosTarjetas">
        <img src="img/footer/visa.png" alt="icono visa" />
        <img src="img/footer/master.png" alt="icono master" />
        <img src="img/footer/icono-paypal.png" alt="icono paypal" />
      </div>
    </div>`;
}

function generateCards(arrayBebidas, main) {
  /*Genero el div de las cards*/
  let cardsBebidas = document.createElement("div");
  cardsBebidas.id = "divMain";
  cardsBebidas.className = "cardsBebidas row";
  main.append(cardsBebidas);

  /*Genero las cards*/
  const divMain = document.getElementById("divMain");
  arrayBebidas.forEach(bebida => {
    divMain.innerHTML += setCard(
      bebida.id,
      bebida.nombre,
      bebida.precio,
      bebida.img,
      bebida.descripcion
    );
  });
}

async function ingresar() {
  let dataUsuario;
  const { value: usuario } = await Swal.fire({
    title: "Ingrese su usuario",
    input: "text",
    inputPlaceholder: "Usuario",
    showCloseButton: true,
  });
  if (usuario) {
    dataUsuario = JSON.parse(localStorage.getItem(usuario));
    if (!dataUsuario)
      Swal.fire({
        icon: "error",
        title: "Error de usuario",
        text: "El usuario ingresado no existe",
        showCloseButton: true,
      });
    else {
      const { value: password } = await Swal.fire({
        title: usuario,
        text: "Ingrese su contraseña",
        input: "password",
        inputPlaceholder: "Contraseña",
        showCloseButton: true,
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (password) {
        if (password === dataUsuario.contraseña) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            didOpen: toast => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: `Bienvendido/a ${usuario}!`,
          });

          const linkIngresar = document.getElementById("ingresar");
          linkIngresar.innerText = `${usuario}`;

          return dataUsuario;
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de contraseña",
            text: "La contraseña ingresada no es correcta",
            showCloseButton: true,
          });
        }
      }
    }
  }
}

function crearUsuario(nombreUsuario, contraseña, carrito, id) {
  const usuario = new Usuario(nombreUsuario, contraseña, carrito, id);
  localStorage.setItem(usuario.nombre, JSON.stringify(usuario));
}

function htmlCarrito(carrito) {
  let html;
  carrito.forEach(producto => {
    console.log(producto);
    html += `<div class=productoCarrito >
        <img style='height=50px; width=50px;' src=${producto.img.src} alt=${producto.img.alt}>
      <div class="descripcionCarrito">
        <p>${producto.nombre}</p>
        <p>${producto.precio}</p>
      </div>
    </div>`;
  });
  return html;
}

/*=========================================================================*/

/*================= PROG PRINCIPAL ==================*/
async function main() {
  /*Objeto de arrays de bebidas*/
  tipoBebida = {
    vinos: [
      new Bebida(1, "Vinos", "colon", 270, "Vino Colon Malbec", {
        src: "img/vinos/colon-malbec.jpg",
        alt: "Vino Colon Malbec",
      }),
      new Bebida(2, "Vinos", "don valentin", 370, "Vino Don Valentin Malbec", {
        src: "img/vinos/donValentinMalbec.png",
        alt: "Vino Don Valentin Malbec",
      }),
      new Bebida(3, "Vinos", "rutini", 470, "Vino Rutini", {
        src: "img/vinos/tintoRutini.jpeg",
        alt: "Vino Rutini",
      }),
    ],
    cervezas: [
      new Bebida(
        1,
        "Cervezas",
        "patagonia",
        570,
        "Cerveza Patagonia Amber Lage",
        {
          src: "img/cervezas/PatagoniaAmberLage730.png",
          alt: "Cerveza Patagonia Amber Lage",
        }
      ),
      new Bebida(2, "Cervezas", "quilmes", 470, "Cerveza Quilmes", {
        src: "img/cervezas/quilmesLitro.jpg",
        alt: "Cerveza Quilmes",
      }),
      new Bebida(3, "Cervezas", "imperial", 370, "Cerveza Imperial Stout", {
        src: "img/cervezas/imperialStoutLitro.png",
        alt: "Cerveza Imperial Stout",
      }),
    ],
    aperitivos: [
      new Bebida(1, "Aperitivos", "branca", 470, "Fernet Branca", {
        src: "img/aperitivos/fernet-branca-1lt.jpg",
        alt: "Fernet Branca",
      }),
      new Bebida(2, "Aperitivos", "gancia", 170, "Gancia", {
        src: "img/aperitivos/gancia.jpg",
        alt: "Gancia",
      }),
      new Bebida(3, "Aperitivos", "campari", 370, "Campari", {
        src: "img/aperitivos/campari.jpg",
        alt: "Campari",
      }),
      new Bebida(4, "Aperitivos", "1882", 400, "Fernet 1882", {
        src: "img/aperitivos/1882.jpg",
        alt: "1882",
      }),
    ],
    bebidasBlancas: [
      new Bebida(1, "Bebidas Blancas", "gin bombay", 470, "Gin Bombay", {
        src: "img/bebidaBlanca/ginBombay.jpg",
        alt: "Gin Bombay",
      }),
      new Bebida(2, "Bebidas Blancas", "absolut", 270, "Vodka Absolut", {
        src: "img/bebidaBlanca/absolut.jpeg",
        alt: "Vodka Absolut",
      }),
      new Bebida(3, "Bebidas Blancas", "jackDaniels", 370, "Jack Daniels", {
        src: "img/bebidaBlanca/jackDaniels.png",
        alt: "Jack Daniels",
      }),
    ],
    energizantes: [
      new Bebida(1, "Energizantes", "speed", 470, "Speed", {
        src: "img/energizantes/speed.png",
        alt: "Speed",
      }),
      new Bebida(2, "Energizantes", "monster", 370, "Monster", {
        src: "img/energizantes/monster.webp",
        alt: "Monster",
      }),
      new Bebida(3, "Energizantes", "blue demon", 270, "Blue Demon", {
        src: "img/energizantes/blueDemon-r.png",
        alt: "Blue Demon",
      }),
    ],
    sinAlcohol: [
      new Bebida(1, "Sin Alcohol", "coca-cola", 170, "Coca-Cola", {
        src: "img/sin-alcohol/cocaCola.webp",
        alt: "Coca-Cola",
      }),
      new Bebida(2, "Sin Alcohol", "sprite", 370, "Sprite", {
        src: "img/sin-alcohol/sprite.webp",
        alt: "Sprite",
      }),
      new Bebida(3, "Sin Alcohol", "citric", 570, "Jugo CITRIC", {
        src: "img/sin-alcohol/Jugo-Naranja-Citric-1-5l-1-879152.png",
        alt: "Jugo CITRIC",
      }),
    ],
  };

  const linkTiposBebidas = [
    document.getElementById("aperitivos"),
    document.getElementById("vinos"),
    document.getElementById("cervezas"),
    document.getElementById("energizantes"),
    document.getElementById("bebidasBlancas"),
    document.getElementById("sinAlcohol"),
  ];

  /* ==================== EVENTOS ============================*/

  /*Hardcodeo un usuario de prueba, ya que no hay un registro de usuarios*/
  let contUsers = 0;
  crearUsuario("admin", "admin", [], ++contUsers);

  const { value: range } = await Swal.fire({
    title: "Ingrese su edad",
    icon: "question",
    input: "range",
    inputLabel: "Edad",
    inputAttributes: {
      min: 10,
      max: 99,
      step: 1,
    },
    inputValue: 25,
  });

  if (range >= 18) {
    const linkIngresar = document.getElementById("ingresar");
    let dataUsuario;

    /*Se presiona sobre el link de ingresar*/
    linkIngresar.onclick = () => {
      if (linkIngresar.textContent.toLowerCase() !== "ingresar") {
        Swal.fire({
          title: "Cierre de sesion",
          text: "Esta seguro que desea cerrar sesion?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar Sesion!",
        }).then(result => {
          if (result.isConfirmed) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "info",
              title: "Cerrando Sesion...",
            });

            linkIngresar.innerText = "Ingresar";
          }
        });
      } else dataUsuario = ingresar();
    };
    
    const linkCarrito = document.getElementById("carrito");
    linkCarrito.onclick = () => {
      if (linkIngresar.textContent.toLowerCase() !== "ingresar") {
        Swal.fire({
          title: 'Carrito',
          width: '70%',
          heightAuto: true,
          position: 'top',
          html: htmlCarrito(dataUsuario.carrito),
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33',
          focusConfirm: false,
          confirmButtonText: 'Finalizar Compra',
          cancelButtonText: 'Seguir Comprando'
        })
      } else {
        ingresar().then(data => {
           dataUsuario = data;
           dataUsuario.carrito.push(tipoBebida.vinos[0]);
           dataUsuario.carrito.push(tipoBebida.cervezas[0]);

        }).catch(err => console.log(err));

      }
    };

    /*Click sobre link de bebidas del navbar*/
    linkTiposBebidas.forEach(link => {
      link.onclick = () => {
        const span = document.getElementById("span");
        let main = document.getElementById("main");

        if (!main) {
          document.getElementById("carousel").remove();

          main = document.createElement("main");
          main.id = "main";

          let footer = document.createElement("footer");
          footer.id = "footer";
          footer.innerHTML = setFooter();

          span.append(main);
          span.append(footer);
        } else {
          document.getElementById("divMain").remove();
        }
        generateCards(tipoBebida[link.id], main);
      };
    });
  } else {
    document.getElementById("contenido").remove();
    Swal.fire({
      icon: "error",
      title: "Error al ingresar",
      text: "Lo sentimos, no cumples la edad minima requerida para ingresar a este sitio",
    });
  }
}

main();
