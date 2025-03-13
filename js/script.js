// Variáveis globais
let cart = []; // Array para armazenar os produtos no carrinho
let cartModal = document.getElementById("cartModal");
let cartItemsContainer = document.getElementById("cartItems");
let cartSubtotal = document.getElementById("cartSubtotal");
let closeModal = document.querySelector(".close");
var MenuItens = document.getElementById("MenuItens");

MenuItens.style.maxHeight = "0px";

function menucelular() {
    if (MenuItens.style.maxHeight == "0px") {
        MenuItens.style.maxHeight = "200px";
    } else {
        MenuItens.style.maxHeight = "0px";
    }
}

// Função para abrir o modal do carrinho
function openCartModal() {
    cartModal.style.display = "block";
    updateCartDisplay();
}

// Função para fechar o modal do carrinho
function closeCartModal() {
    cartModal.style.display = "none";
}

// Função para adicionar produto ao carrinho
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    // Limpa o conteúdo atual do carrinho
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;

    // Adiciona cada item do carrinho ao modal
    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemElement);

        subtotal += item.price;
    });

    // Atualiza o subtotal
    cartSubtotal.textContent = subtotal.toFixed(2);
}

// Função para confirmar a compra
function confirmPurchase() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        // Monta a mensagem com os itens e o subtotal
        let message = "Olá, gostaria de confirmar a seguinte compra:\n\n";
        cart.forEach((item, index) => {
            message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
        });
        message += `\nSubtotal: R$ ${cartSubtotal.textContent}\n\n`;
        message += "Por favor, confirme a disponibilidade e os detalhes para pagamento.";

        // Codifica a mensagem para uso na URL
        const encodedMessage = encodeURIComponent(message);

        // Número de telefone da dona da loja (substitua pelo número correto)
        const phoneNumber = "5517981397488"; // Exemplo: 55 (Brasil) + DDD + Número

        // Gera o link do WhatsApp
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Redireciona o usuário para o WhatsApp
        window.open(whatsappLink, "_blank");

        // Limpa o carrinho
        cart = [];
        updateCartDisplay();
        closeCartModal();
    }
}

// Eventos
document.querySelector(".cart-btn").addEventListener("click", function (event) {
    event.preventDefault();
    openCartModal();
});

closeModal.addEventListener("click", closeCartModal);

window.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

document.getElementById("confirmPurchase").addEventListener("click", confirmPurchase);

// Variáveis globais para o modal de produto
let productModal = document.getElementById("productModal");
let productModalImage = document.getElementById("productModalImage");
let productModalTitle = document.getElementById("productModalTitle");
let productModalPrice = document.getElementById("productModalPrice");
let colorOptionsContainer = document.getElementById("colorOptions");
let addToCartFromModalBtn = document.getElementById("addToCartFromModal");

let selectedProduct = null; // Armazena o produto selecionado
let selectedColor = null; // Armazena a cor selecionada

// Função para abrir o modal do produto
function openProductModal(product) {
    selectedProduct = product;
    selectedColor = product.colors[0]; // Seleciona a primeira cor por padrão

    // Atualiza o conteúdo do modal
    productModalTitle.textContent = product.name;
    productModalImage.src = product.images[selectedColor];
    productModalPrice.textContent = product.price.toFixed(2);

    // Limpa as opções de cor anteriores
    colorOptionsContainer.innerHTML = "";

    // Adiciona as opções de cor
    product.colors.forEach(color => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("color-option");
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener("click", () => selectColor(color));
        colorOptionsContainer.appendChild(colorOption);
    });

    // Abre o modal
    productModal.style.display = "block";
}

// Função para selecionar uma cor
function selectColor(color) {
    selectedColor = color;
    productModalImage.src = selectedProduct.images[color];

    // Destaca a cor selecionada
    document.querySelectorAll(".color-option").forEach(option => {
        option.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

// Função para adicionar o produto ao carrinho a partir do modal
addToCartFromModalBtn.addEventListener("click", () => {
    if (selectedProduct && selectedColor) {
        const productName = `${selectedProduct.name} (${selectedColor})`;
        addToCart(productName, selectedProduct.price);
        alert(`${productName} foi adicionado ao carrinho!`);
        closeProductModal();
    }
});

// Função para fechar o modal do produto
function closeProductModal() {
    productModal.style.display = "none";
}

// Evento para fechar o modal ao clicar no "X"
document.querySelector("#productModal .close").addEventListener("click", closeProductModal);

// Evento para fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
    if (event.target === productModal) {
        closeProductModal();
    }
});

// Exemplo de dados dos produtos
const products = [
    {
        name: "Curso cobranças recorrentes",
        price: 99.00,
        colors: ["#FF0000", "#00FF00", "#0000FF"], // Cores disponíveis
        images: {
            "#FF0000": "img/image3.jpg", // Imagem para a cor vermelha
            "#00FF00": "img/image1-green.jpg", // Imagem para a cor verde
            "#0000FF": "img/image1-blue.jpg", // Imagem para a cor azul
        },
    },
    // Adicione mais produtos aqui
];

// Adiciona eventos de clique aos produtos
document.querySelectorAll(".col-4").forEach((productElement, index) => {
    productElement.addEventListener("click", (event) => {
        event.preventDefault(); // Evita comportamentos padrão (como redirecionamento)
        openProductModal(products[index]);
    });
});