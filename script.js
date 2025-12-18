const productos = [
    { id: 1, nombre: "Aceite de Boldo Nativo", categoria: "salud", precio: 12500, img: "🍃" },
    { id: 2, nombre: "Crema Cicatrizante Matico", categoria: "estetica", precio: 8900, img: "🌸" },
    { id: 3, nombre: "Extracto de Quillay (5L)", categoria: "insumos", precio: 45000, img: "📦" },
    { id: 4, nombre: "Serum Facial Alerce", categoria: "estetica", precio: 15600, img: "💧" }
];

let carrito = [];

function renderProducts(filter = 'todos') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    const filtrados = filter === 'todos' ? productos : productos.filter(p => p.categoria === filter);
    
    filtrados.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div style="font-size: 3rem">${p.img}</div>
                <h3>${p.nombre}</h3>
                <p class="price">$${p.precio}</p>
                <div class="controls">
                    <input type="number" id="qty-${p.id}" value="1" min="1">
                    <button onclick="addToCart(${p.id})">Agregar</button>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const producto = productos.find(p => p.id === id);
    
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad += qty;
    } else {
        carrito.push({ ...producto, cantidad: qty });
    }
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cartItems.innerHTML += `<p>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</p>`;
    });
    
    totalSpan.innerText = total;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function filterProducts(cat) { renderProducts(cat); }

// Inicializar
renderProducts();