/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  //--Carrio_inicio sesion

  document.addEventListener('DOMContentLoaded', function() {
  // Lista de usuarios registrados (estática)
  const registeredUsers = [
    { email: "usuario1@ejemplo.com", password: "contraseña1" },
    { email: "usuario2@ejemplo.com", password: "contraseña2" }
  ];
  
  // Variables para controlar la autenticación
  let isAuthenticated = false;
  let currentUser = null;
  
  // Comprobar si hay una sesión guardada
  checkSession();
  
  // Inicializar el carrito desde localStorage o como un array vacío
  let cart = JSON.parse(localStorage.getItem('credieat-cart')) || [];
  
  // Actualizar contador del carrito
  updateCartCount();
  
  // Actualizar estado de los botones según autenticación
  updateButtonsState();
  
  // Adaptar interfaz según el tamaño de pantalla
  adaptInterfaceToScreenSize();
  window.addEventListener('resize', adaptInterfaceToScreenSize);
  
  // Event listener para el formulario de login
  document.getElementById('login-submit').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');
    
    // Validar credenciales
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Login exitoso
      errorMessage.classList.add('d-none');
      isAuthenticated = true;
      currentUser = { email: user.email };
      
      // Guardar sesión en localStorage
      localStorage.setItem('credieat-session', JSON.stringify(currentUser));
      
      // Actualizar UI
      document.getElementById('login-btn').classList.add('d-none');
      document.getElementById('user-info').classList.remove('d-none');
      document.getElementById('user-email').textContent = user.email;
      
      // Cerrar modal
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      loginModal.hide();
      
      // Actualizar estado de botones
      updateButtonsState();
      
      // Mostrar notificación
      showNotification('Sesión iniciada correctamente');
    } else {
      // Login fallido
      errorMessage.classList.remove('d-none');
    }
  });
  
  // Event listener para el botón de login
  document.getElementById('login-btn').addEventListener('click', function() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
  });
  
  // Event listener para cerrar sesión
  document.getElementById('logout-btn').addEventListener('click', function() {
    isAuthenticated = false;
    currentUser = null;
    
    // Eliminar sesión de localStorage
    localStorage.removeItem('credieat-session');
    
    // Actualizar UI
    document.getElementById('login-btn').classList.remove('d-none');
    document.getElementById('user-info').classList.add('d-none');
    
    // Actualizar estado de botones
    updateButtonsState();
    
    // Mostrar notificación
    showNotification('Sesión cerrada correctamente');
  });
  
  // Event listener para agregar producto al carrito
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
      if (!isAuthenticated) {
        // Si no está autenticado, mostrar modal de login
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
      }
      
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);
      
      // Verificar si el producto ya está en el carrito
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: id,
          name: name,
          price: price,
          quantity: 1
        });
      }
      
      // Guardar en localStorage
      saveCart();
      
      // Actualizar contador
      updateCartCount();
      
      // Mostrar notificación
      showNotification(`${name} agregado al carrito`);
    });
  });
  
  // Mostrar los productos en el modal del carrito
  document.getElementById('cartModal').addEventListener('show.bs.modal', function() {
    if (!isAuthenticated) {
      // Si no está autenticado, mostrar modal de login en lugar del carrito
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
      return false; // Prevenir que se abra el modal del carrito
    }
    renderCart();
  });
  
  // Evento para vaciar el carrito
  document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
  });
  
  // Evento para proceder al pago
  document.getElementById('checkout-btn').addEventListener('click', function() {
    alert('Procesando pago...');
    // Aquí se implementaría la redirección a la página de pago o procesamiento
  });
  
  // Funciones auxiliares
  function checkSession() {
    const session = localStorage.getItem('credieat-session');
    if (session) {
      currentUser = JSON.parse(session);
      isAuthenticated = true;
      
      // Actualizar UI
      document.getElementById('login-btn').classList.add('d-none');
      document.getElementById('user-info').classList.remove('d-none');
      document.getElementById('user-email').textContent = currentUser.email;
    }
  }
  
  function adaptInterfaceToScreenSize() {
    const loginBtn = document.getElementById('login-btn');
    const width = window.innerWidth;
    
    // Ajustar el botón de login según el tamaño de pantalla
    if (width <= 375) {
      // En pantallas muy pequeñas, mostrar solo el icono
      loginBtn.innerHTML = '<i class="bi bi-person"></i>';
    } else {
      // En pantallas normales, mostrar texto e icono
      loginBtn.innerHTML = '<i class="bi bi-person"></i> <span>Iniciar Sesión</span>';
    }
  }
  
  function updateButtonsState() {
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    
    if (isAuthenticated) {
      // Habilitar botones si está autenticado
      addCartButtons.forEach(button => {
        button.classList.remove('disabled');
        button.title = '';
      });
    } else {
      // Deshabilitar botones si no está autenticado
      addCartButtons.forEach(button => {
        button.classList.add('disabled');
        button.title = 'Inicia sesión para agregar al carrito';
      });
    }
  }
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }
  
  function saveCart() {
    localStorage.setItem('credieat-cart', JSON.stringify(cart));
  }
  
  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const total = document.getElementById('cart-total');
    
    // Limpiar contenido actual
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      emptyCartMessage.classList.remove('d-none');
      total.textContent = '$0';
    } else {
      emptyCartMessage.classList.add('d-none');
      
      let totalAmount = 0;
      
      cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        totalAmount += subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>$${item.price.toLocaleString('es-CO')}</td>
          <td>
            <div class="cantidad-wrapper">
              <button class="cart-quantity-btn decrease" data-index="${index}">-</button>
              <input type="text" class="cantidad-input" value="${item.quantity}" readonly>
              <button class="cart-quantity-btn increase" data-index="${index}">+</button>
            </div>
          </td>
          <td>$${subtotal.toLocaleString('es-CO')}</td>
          <td>
            <button class="cart-delete-btn" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        
        cartItems.appendChild(row);
      });
      
      total.textContent = `$${totalAmount.toLocaleString('es-CO')}`;
      
      // Event listeners para botones de cantidad
      cartItems.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          if (cart[index].quantity > 1) {
            cart[index].quantity--;
            saveCart();
            renderCart();
            updateCartCount();
          }
        });
      });
      
      cartItems.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          cart[index].quantity++;
          saveCart();
          renderCart();
          updateCartCount();
        });
      });
      
      // Event listeners para eliminar productos
      cartItems.querySelectorAll('.cart-delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          cart.splice(index, 1);
          saveCart();
          renderCart();
          updateCartCount();
        });
      });
    }
  }
  
  function showNotification(message) {
    // Crear contenedor de notificaciones si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Crear notificación
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">Notificación</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
});



})();