const btnCargar = document.getElementById("btnCargar");
const menu = document.getElementById("select");
const datos = document.getElementById("datos");
const comentarios = document.getElementById("comentarios");

btnCargar.addEventListener("click", () => {

    btnCargar.classList.toggle("btn-primary");
    btnCargar.classList.toggle("btn-secondary");

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(usuarios => {

            let texto = "";

            usuarios.forEach(usuario => {
                texto += `<option value="${usuario.id}">${usuario.name}</option>`;
            });

            menu.innerHTML = texto;

        });

});


menu.addEventListener("change", () => {
    comentarios.innerHTML = "";

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${menu.value}`)
        .then(response => response.json())
        .then(informacion => {

            let texto2 = "";

            informacion.forEach(info => {

                    texto2 += `<div class="card">
                        <div class="card-header">
                            <h3>Posts</h3>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote">
                                <p>${info.title}</p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                ${info.body}
                            </figcaption>
                        </div>
                    </div>

                    <button onclick="window.mostrar(${info.id})" class="btn btn-primary">Mostrar</button>
                    <button onclick="window.ocultar(${info.id})" class="btn btn-primary">Ocultar</button>
                    <button onclick="window.post(${info.id})" class="btn btn-primary">Agregar comentario</button>
                    <div id="posts"></div>
                    <div id="comentarios${info.id}"></div>`;

            });

            datos.innerHTML = texto2 + `<div id="comentarios"></div>`;

        });

});


window.mostrar = async function(postId){

    const contenedor = document.getElementById(`comentarios${postId}`);

    let texto3 = "";

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(coments => {

            coments.forEach(coment => {

                texto3 += `<div class="card">
                        <div class="card-body">
                            <h5>${coment.name}</h5>
                            <p>${coment.body}</p>
                        </div>
                    </div>`;

            });

            contenedor.innerHTML = texto3;

        });

}

window.ocultar = async function(postId) {
    const contenedor = document.getElementById(`comentarios${postId}`);
    contenedor.innerHTML = "";
}

window.post = async function (postId) {
    const contenedor = document.getElementById(`posts`);

    contenedor.innerHTML = `

        <label for="name">name:</label>
        <input type="text" id="name" name="name" required>

        <label for="body">body:</label>
        <input type="body" id="body" name="body">

        <label for="email">email:</label>
        <input type="text" id="email" name="nombre" required>

        <button type="button" onclick="window.post2(${postId})" class="btn btn-primary">Agregar</button>`

  };

  window.post2 = async function (postId) {
    const contenedor = document.getElementById(`comentarios${postId}`);
    let texto4 = "";

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
         method: 'POST',
    body: JSON.stringify({
    name: document.getElementById("name").value,
    body: document.getElementById("body").value,
    email: document.getElementById("email").value,
    postId: postId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
    .then((response) => response.json())
    .then(post => {
            texto4 += `<div class="card">
                        <div class="card-body">
                            <h5>${post.name}</h5>
                            <p>${post.body}</p>
                        </div>
                </div>`;
                contenedor.innerHTML += texto4;
    })
  };