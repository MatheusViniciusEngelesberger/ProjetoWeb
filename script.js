// Função para cadastrar usuário
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let dataCadastro = new Date().toLocaleString();

    let usuario = { nome, email, dataCadastro };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirUsuarios();
    limparCampos();
});

// Função para exibir usuários cadastrados
function exibirUsuarios() {
    let lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.forEach((usuario, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${usuario.dataCadastro} - Nome: ${usuario.nome} - Email: ${usuario.email}
            <button onclick="excluirUsuario(${index})">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

// Função para excluir um usuário
function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    exibirUsuarios();
}

// Função para excluir todos os usuários
function excluirTodos() {
    if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
        localStorage.removeItem("usuarios");
        exibirUsuarios();
    }
}

// Função para pesquisar usuários
function pesquisarUsuario() {
    let termo = document.getElementById("pesquisa").value.toLowerCase();
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo)
    ).forEach((usuario, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${usuario.dataCadastro} - Nome: ${usuario.nome} - Email: ${usuario.email}
            <button onclick="excluirUsuario(${index})">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

// Função para limpar campos do formulário
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

// Exibir usuários ao carregar a página
document.addEventListener("DOMContentLoaded", exibirUsuarios);
