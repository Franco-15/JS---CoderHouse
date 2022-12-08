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
      <img src=${img.src} class="imgCard img-fluid rounded-start" alt=${img.alt
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
          <button id=${id} name= '' type="button" class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
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

function setFooter() {
    return `
  <!-- FOOTER -->
    <div class="filaUno">
      <div class="logoDireccion">
        <a href="index.html">
          <p class="logoFooter"><img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930265/ImgAppReact/img/MDQ_Bebidas_tqx495.png" alt="logo"></p>
        </a>
        <p>Guemes 2856 - Mar del Plata</p>
      </div>

      <div class="seguinos">
        <p>Seguinos!</p>
        <div class="logosRedes">
          <a href="https://www.facebook.com/" target="_blank"><img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930263/ImgAppReact/img/footer/facebook_bqj8r1.png"
              alt="icono facebook" /></a>
          <a href="https://www.instagram.com/" target="_blank"><img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930261/ImgAppReact/img/footer/Instagram_bwp3nx.png"
              alt="icono instagram" /></a>
          <a href="https://twitter.com/" target="_blank"><img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930264/ImgAppReact/img/footer/twitter_krdklt.png" alt="icono twitter" /></a>
        </div>
      </div>
    </div>

    <div class="filaDos">
      <p>
        Desarrollada por Franco Gonzalez - Todos los derechos reservados 2022
      </p>

      <div class="logosTarjetas">
        <img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930264/ImgAppReact/img/footer/visa_n1a8d3.png" alt="icono visa" />
        <img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930262/ImgAppReact/img/footer/master_fj5rxu.png" alt="icono master" />
        <img src="https://res.cloudinary.com/dgk9fa4rw/image/upload/v1669930263/ImgAppReact/img/footer/icono-paypal_autbpk.png" alt="icono paypal" />
      </div>
    </div>`;
}

async function ingresar() {
    let data = null;

    const { value: usuario } = await Swal.fire({
        title: "Ingrese su usuario",
        input: "text",
        inputPlaceholder: "Usuario",
        showCloseButton: true,
    });

    if (usuario) {
        let dataUsuario = JSON.parse(localStorage.getItem(usuario));
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

                    data = dataUsuario;
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

    return data;
}

function crearUsuario(nombreUsuario, contraseña, id) {
    const usuario = new Usuario(nombreUsuario, contraseña, [], id);
    localStorage.setItem(usuario.nombre, JSON.stringify(usuario));
}

function htmlCarrito(carrito) {
    let html = "";
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio;
        console.log(producto);
        html += `<div id=c-${producto.id}  class=productoCarrito>
      <div class='imgCarrito'>
        <img style='height=50px; width=50px;' src=${producto.img.src} alt=${producto.img.alt}>
      </div>
      <div class="descripcionCarrito">
        <p>${producto.nombre}</p>
        <p>${producto.cantidad}</p>
        <p>$${producto.precio}</p>
      </div>
      <button id='b-${producto.id}'type="button" class="btn btn-danger">Quitar bebida</button>
    </div>`;
    });

    html += `<div class='subtotal'>
    <p>SubTotal:</p>
    <p id=monto >$${subtotal}</p>
  </div>`;
    return html;
}

async function getBebidas() {
    let bebidasFetch = await fetch("./productos.json");
    let tipoBebida = await bebidasFetch.json();

    return tipoBebida;
}

async function edadValida() {
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

    console.log(range);
    return range >= 18;
}

function habilitaCompra(dataUsuario) {
    const buttonsAgregarCarrito = [
        document.getElementById("1-v"),
        document.getElementById("2-v"),
        document.getElementById("3-v"),
        document.getElementById("4-v"),
        document.getElementById("1-c"),
        document.getElementById("2-c"),
        document.getElementById("3-c"),
        document.getElementById("4-c"),
        document.getElementById("1-e"),
        document.getElementById("2-e"),
        document.getElementById("3-e"),
        document.getElementById("4-e"),
        document.getElementById("1-a"),
        document.getElementById("2-a"),
        document.getElementById("3-a"),
        document.getElementById("4-a"),
        document.getElementById("5-a"),
        document.getElementById("1-bb"),
        document.getElementById("2-bb"),
        document.getElementById("3-bb"),
        document.getElementById("4-bb"),
        document.getElementById("1-sa"),
        document.getElementById("2-sa"),
        document.getElementById("3-sa"),
        document.getElementById("4-sa"),
    ];

    /*================= CLICK AGREGAR AL CARRITO ==================*/
    buttonsAgregarCarrito.forEach(boton => {
        console.log(boton);
        if (boton)
            boton.onclick = async () => {
                if (dataUsuario) {
                    const bebidaElegida = tipoBebida.find(
                        bebida => bebida.id === boton.id
                    );
                    if (
                        dataUsuario.carrito.some(bebida => bebida.id === bebidaElegida.id)
                    ) {
                        const indexBebida = dataUsuario.carrito.findIndex(
                            bebida => bebida.id === bebidaElegida.id
                        );
                        dataUsuario.carrito[indexBebida].cantidad += 1;
                        dataUsuario.carrito[indexBebida].precio += bebidaElegida.precio;
                    } else {
                        bebidaElegida.cantidad = 1;
                        dataUsuario.carrito.push(bebidaElegida);
                    }
                    console.log(dataUsuario.carrito);
                    Toastify({
                        text: "Producto agregado al carrito!",
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        onClick: function () { }, // Callback after click
                    }).showToast();
                } else {
                    Toastify({
                        text: "Ingrese su usuario",
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #F73106, #CB9F96)",
                        },
                        onClick: function () { }, // Callback after click
                    }).showToast();
                }
            };
    });
}

/*================= PROG PRINCIPAL ==================*/
async function main() {
    /*Objeto de arrays de bebidas*/
    tipoBebida = await getBebidas();

    const linkTiposBebidas = [
        document.getElementById("aperitivos"),
        document.getElementById("vinos"),
        document.getElementById("cervezas"),
        document.getElementById("energizantes"),
        document.getElementById("bebidasBlancas"),
        document.getElementById("sinAlcohol"),
    ];

    let enPaginaDeProductos = false;

    /*Hardcodeo un usuario de prueba, ya que no hay un registro de usuarios*/
    let contUsers = 0;
    crearUsuario("admin", "admin", ++contUsers);

    if (await edadValida()) {
        const linkIngresar = document.getElementById("ingresar");
        let dataUsuario = null;

        /* === CLICK BOTON INGRESAR ===*/
        linkIngresar.onclick = async () => {
            if (dataUsuario) {
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

                        localStorage.setItem(
                            dataUsuario.nombre,
                            JSON.stringify(dataUsuario)
                        );
                        linkIngresar.innerText = "Ingresar";
                        dataUsuario = null;
                        enPaginaDeProductos && habilitaCompra(dataUsuario);
                    }
                });
            } else {
                dataUsuario = await ingresar();
                /*Se ejecuta si se encuentra dentro de una seccion de bebidas para agregar al carrito*/
                enPaginaDeProductos && habilitaCompra(dataUsuario);
            }
        };

        //========== CLICK BOTON CARRITO ==========
        const linkCarrito = document.getElementById("carrito");

        linkCarrito.onclick = async () => {
            if (dataUsuario) {
                Swal.fire({
                    title: "Carrito",
                    width: "70%",
                    heightAuto: true,
                    position: "top",
                    html: htmlCarrito(dataUsuario.carrito),
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: "green",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Finalizar Compra",
                    cancelButtonText: "Seguir Comprando",
                });

                /* Obtengo botones de quitar bebida del carrito*/
                const idEliminarBebidas = tipoBebida.map(bebida => {
                    return document.getElementById(`b-${bebida.id}`);
                });

                idEliminarBebidas.forEach(botonElim => {
                    if (botonElim) {
                        botonElim.onclick = () => {
                            const indexBebida = dataUsuario.carrito.findIndex(
                                bebida => bebida.id === botonElim.id.substring(2)
                            );
                            let subtotal = document.getElementById(`monto`);
                            montoTotal = parseInt(subtotal.textContent.substring(1));
                            montoTotal -= dataUsuario.carrito[indexBebida].precio;
                            subtotal.innerText = `$${montoTotal}`;
                            const producto = document.getElementById(
                                `c-${dataUsuario.carrito[indexBebida].id}`
                            );
                            dataUsuario.carrito.splice(indexBebida, 1);
                            producto.remove();
                        };
                    }
                });

                /*========= CLICK CONFIRMAR COMPRA ======== */
                Swal.getConfirmButton().onclick = () => {
                    if (dataUsuario.carrito.length) {
                        Swal.fire({
                            title: "Desea confirmar la compra?",
                            showCancelButton: true,
                            confirmButtonText: "Confirmar",
                        }).then(result => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                Swal.fire("Muchas gracias por su compra!", "", "success");
                                dataUsuario.carrito = [];
                            }
                        });
                    } else
                        Toastify({
                            text: "No hay producto en el carrito",
                            duration: 3000,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "linear-gradient(to right, #F4E207 , #918927 )",
                            },
                            onClick: function () { }, // Callback after click
                        }).showToast();
                };
            } else {
                dataUsuario = await ingresar();
                /*Se ejecuta si se encuentra dentro de una seccion de bebidas para agregar al carrito*/
                enPaginaDeProductos && habilitaCompra(dataUsuario);
            }
        };

        /*========= CLICK BEBIDAS DEL NAVBAR ==========*/
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
                } else document.getElementById("divMain").remove();

                const bebidasFilter = tipoBebida.filter(
                    bebida => bebida.tipo === link.id
                );
                generateCards(bebidasFilter, main);
                enPaginaDeProductos = true;
                habilitaCompra(dataUsuario);
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
