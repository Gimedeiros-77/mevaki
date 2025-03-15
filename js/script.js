// Variáveis globais
let cart = []; // Array para armazenar os produtos no carrinho
let cartModal = document.getElementById("cartModal");
let cartItemsContainer = document.getElementById("cartItems");
let cartSubtotal = document.getElementById("cartSubtotal");
let closeModal = document.querySelector(".close");
let confirmPurchaseBtn = document.getElementById("confirmPurchase");
let addressForm = document.getElementById("addressForm");
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
    // Força o navegador a aplicar a animação
    setTimeout(() => {
        cartModal.querySelector(".modal-content").style.opacity = "1";
        cartModal.querySelector(".modal-content").style.transform = "translateY(0)";
    }, 10);
}

// Função para fechar o modal do carrinho
function closeCartModal() {
    const modalContent = cartModal.querySelector(".modal-content");
    modalContent.style.opacity = "0";
    modalContent.style.transform = "translateY(20px)";
    setTimeout(() => {
        cartModal.style.display = "none";
        addressForm.style.display = "none"; // Esconde o formulário de endereço ao fechar o modal
    }, 300); // Tempo da animação (0.3s)
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

// Função para exibir o formulário de endereço
function showAddressForm() {
    addressForm.style.display = "block"; // Exibe o formulário de endereço
}

// Evento para o botão "Confirmar Compra"
confirmPurchaseBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Evita o comportamento padrão do botão
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        showAddressForm(); // Exibe o formulário de endereço
    }
});

// Função para buscar o endereço pelo CEP
function buscarEndereco() {
    const cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("CEP inválido. Digite um CEP com 8 dígitos.");
        return;
    }

    // Faz a requisição à API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            // Preenche os campos do formulário
            document.getElementById("rua").value = data.logradouro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP. Tente novamente.");
        });
}

// Evento para buscar o CEP ao clicar no botão
document.getElementById("searchCep").addEventListener("click", buscarEndereco);

// Evento para buscar o CEP ao pressionar Enter no campo de CEP
document.getElementById("cep").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        buscarEndereco();
    }
});

// Evento para enviar o formulário de endereço
document.getElementById("deliveryForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const numero = document.getElementById("numero").value;
    if (!numero) {
        alert("Por favor, insira o número.");
        return;
    }

    // Captura os dados do formulário
    const endereco = {
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: numero,
        complemento: document.getElementById("complemento").value,
        apartamento: document.getElementById("apartamento").value,
    };

    // Exibe os dados no console (ou envia para o backend)
    console.log("Endereço de entrega:", endereco);
    alert("Endereço confirmado com sucesso!");

    // Limpa o carrinho e fecha o modal
    cart = [];
    updateCartDisplay();
    closeCartModal();
});

// Evento para fechar o modal ao clicar no "X"
closeModal.addEventListener("click", closeCartModal);

// Evento para fechar o modal ao clicar fora dele
window.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

// Evento para abrir o modal do carrinho ao clicar no ícone do carrinho
document.querySelector(".cart-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    openCartModal();
});

// Variáveis globais para o modal de produto
let productModal = document.getElementById("productModal");
let productModalImage = document.getElementById("productModalImage");
let productModalTitle = document.getElementById("productModalTitle");
let productModalDescription = document.getElementById("productModalDescription");
let productModalPrice = document.getElementById("productModalPrice");
let colorOptionsContainer = document.getElementById("colorOptions");
let sizeOptionsContainer = document.getElementById("sizeOptions");
let addToCartFromModalBtn = document.getElementById("addToCartFromModal");

let selectedProduct = null; // Armazena o produto selecionado
let selectedColor = null; // Armazena a cor selecionada
let selectedSize = null; // Armazena o tamanho selecionado

// Função para abrir o modal do produto
function openProductModal(product) {
    selectedProduct = product;
    selectedColor = product.colors[0]; // Seleciona a primeira cor por padrão
    selectedSize = product.sizes[0]; // Seleciona o primeiro tamanho por padrão

    // Atualiza o conteúdo do modal
    productModalTitle.textContent = product.name;
    productModalImage.src = product.images[selectedColor];
    productModalDescription.textContent = product.description;
    productModalPrice.textContent = product.price.toFixed(2);

    // Limpa as opções de cor e tamanho anteriores
    colorOptionsContainer.innerHTML = "";
    sizeOptionsContainer.innerHTML = "";

    // Adiciona as opções de cor
    product.colors.forEach(color => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("color-option");
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener("click", () => selectColor(color));
        colorOptionsContainer.appendChild(colorOption);
    });

    // Adiciona as opções de tamanho
    product.sizes.forEach(size => {
        const sizeOption = document.createElement("div");
        sizeOption.classList.add("size-option");
        sizeOption.textContent = size;
        sizeOption.addEventListener("click", () => selectSize(size));
        sizeOptionsContainer.appendChild(sizeOption);
    });

    // Abre o modal
    productModal.style.display = "block";
    // Força o navegador a aplicar a animação
    setTimeout(() => {
        productModal.querySelector(".modal-content").style.opacity = "1";
        productModal.querySelector(".modal-content").style.transform = "translateY(0)";
    }, 10);
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

// Função para selecionar um tamanho
function selectSize(size) {
    selectedSize = size;

    // Destaca o tamanho selecionado
    document.querySelectorAll(".size-option").forEach(option => {
        option.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

// Função para adicionar o produto ao carrinho a partir do modal
addToCartFromModalBtn.addEventListener("click", () => {
    if (selectedProduct && selectedColor && selectedSize) {
        const productName = `${selectedProduct.name} (${selectedColor}, Tamanho: ${selectedSize})`;
        addToCart(productName, selectedProduct.price);
        alert(`${productName} foi adicionado ao carrinho!`);
        closeProductModal();
    } else {
        alert("Por favor, selecione uma cor e um tamanho.");
    }
});

// Função para fechar o modal do produto
function closeProductModal() {
    const modalContent = productModal.querySelector(".modal-content");
    modalContent.style.opacity = "0";
    modalContent.style.transform = "translateY(20px)";
    setTimeout(() => {
        productModal.style.display = "none";
    }, 300); // Tempo da animação (0.3s)
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
        description: "Aprenda a gerenciar cobranças recorrentes de forma eficiente.",
        colors: ["#FF0000", "#00FF00", "#0000FF"],
        sizes: ["P", "M", "G", "GG"],
        images: {
            "#FF0000": "img/image1-red.jpg",
            "#00FF00": "img/image1-green.jpg",
            "#0000FF": "img/image1-blue.jpg",
        },
    },
    {
        name: "Curso de Marketing Digital",
        price: 120.00,
        description: "Domine as estratégias de marketing digital para alavancar seus negócios.",
        colors: ["#FFA500", "#800080"],
        sizes: ["Único"],
        images: {
            "#FFA500": "img/image2-orange.jpg",
            "#800080": "img/image2-purple.jpg",
        },
    },
    {
        name: "Curso de Fotografia",
        price: 150.00,
        description: "Aprenda técnicas avançadas de fotografia.",
        colors: ["#000000", "#FFFFFF"],
        sizes: ["P", "M", "G"],
        images: {
            "#000000": "img/image3-black.jpg",
            "#FFFFFF": "img/image3-white.jpg",
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

//Função para abrir links do footer
