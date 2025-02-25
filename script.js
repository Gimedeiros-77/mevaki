// Produtos que você deseja exibir
// const produtos = [
//     { nome: "CROPPED", preco: "R$ 99,90", parcelamento: "12x R$ 8,32", imagem: "url_da_imagem_cropped.jpg" },
//     { nome: "T-SHIRT", preco: "R$ 49,90", parcelamento: "12x R$ 4,16", imagem: "url_da_imagem_tshirt.jpg" },
//     { nome: "VESTIDO", preco: "R$ 199,90", parcelamento: "12x R$ 16,65", imagem: "url_da_imagem_vestido.jpg" },
//     {nome: "LOGO", imagem: "images/logo.png"}
//     // Adicione mais produtos conforme necessário
// ];

// Variáveis do carrossel
let indexCarousel = 0;
const itensPorTela = 1; // Quantidade de produtos a mostrar no carrossel

// Função para criar e mostrar produtos no carrossel
function mostrarProdutos() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ""; // Limpa o conteúdo atual

    const produtosParaMostrar = produtos.slice(indexCarousel, indexCarousel + itensPorTela);
    
    produtosParaMostrar.forEach(produto => {
        const produtoCard = document.createElement("div");
        produtoCard.classList.add("product-card");
        
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
            <h2>${produto.nome}</h2>
            <p>${produto.preco}</p>
            <p>${produto.parcelamento}</p>
            <button>COMPRAR</button>
        `;

        carousel.appendChild(produtoCard);
    });
}

// Função para mover o carrossel
function moveCarousel(direcao) {
    indexCarousel += direcao;

    // Impede que o índice fique fora dos limites
    if (indexCarousel < 0) {
        indexCarousel = 0;
    } else if (indexCarousel >= produtos.length) {
        indexCarousel = produtos.length - itensPorTela; // Ajuste para permitir a visualização correta
    }

    mostrarProdutos();
}

// Função para adicionar produtos
function adicionarProduto() {
    const nome = prompt("Digite o nome do produto:");
    const preco = prompt("Digite o preço do produto:");
    const parcelamento = prompt("Digite o parcelamento do produto:");
    const imagem = document.getElementById('imagem-url').value;

    if (nome && preco && parcelamento && imagem) {
        produtos.push({ nome, preco, parcelamento, imagem });
        mostrarProdutos(); // Atualiza o carrossel
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("qr-modal");
    const whatsappLink = document.getElementById("whatsapp-link");
    const closeModal = document.querySelector(".close");

    if (whatsappLink && modal) {
        whatsappLink.addEventListener("click", function (event) {
            event.preventDefault();
            modal.style.display = "block"; // Apenas exibe o modal quando o botão é clicado
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

