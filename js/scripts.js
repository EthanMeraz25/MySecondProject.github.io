/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});
// 3) Add the OpenStreetMap tiles
// Note: respect OSM tile usage policy for production/high traffic.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 4) Add a marker + popup
L.marker(center).addTo(map).bindPopup(v1.textContent).openPopup();

// 5) Click handler (drops a marker where you click)
let clickMarker = null;



map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  inputlatitude.value = lat;
  inputlongitude.value = lng;

  dialog.showModal();
  //if (clickMarker) map.removeLayer(clickMarker); para borraar el anterior

  clickMarker = L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);

  clickMarker.openPopup();
});
window.addEventListener('DOMContentLoaded', event => {

    // 1. FUNCIONES EXISTENTES DE LA PLANTILLA (Navbar, Scrollspy, etc.)
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        window.scrollY === 0 ? navbarCollapsible.classList.remove('navbar-shrink') : navbarCollapsible.classList.add('navbar-shrink');
    };
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (document.querySelector('#portfolio a.portfolio-box')) {
        new SimpleLightbox({ elements: '#portfolio a.portfolio-box' });
    }

    // --- 2. INTEGRACIÓN DEL MAPA (LEAFLET) ---

    // Inicializar el mapa en el div con id="map" que tienes en tu index.html
    // Lo centramos en una vista global inicial [lat, lng], zoom
    const map = L.map('map').setView([20, -20], 2);


    // 3. AGREGAR MARCADORES BASADOS EN TU CONTENIDO (History)
    // Coordenadas aproximadas de los eventos mencionados en tu HTML
    const eventos = [
        { 
            nombre: "Aurora Ticket (WTC México)", 
            coords: [19.3934, -99.1746], 
            desc: "Distribuido en el EGS 2004." 
        },
        { 
            nombre: "Old Sea Map (PokéPark)", 
            coords: [35.1815, 136.9066], 
            desc: "Evento exclusivo de Japón/Taiwán." 
        },
        { 
            nombre: "Mystic Ticket (Nintendo World)", 
            coords: [40.7589, -73.9790], 
            desc: "Distribuido en NY y México." 
        }
    ];

    eventos.forEach(ev => {
        L.marker(ev.coords)
            .addTo(map)
            .bindPopup(`<b>${ev.nombre}</b><br>${ev.desc}`);
    });

    // 4. MANEJADOR DE CLICS (Captura coordenadas al hacer clic)
    let clickMarker = null;

    map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        // Si tienes los elementos 'inputlatitude' e 'inputlongitude' en un formulario:
        const inputLat = document.getElementById('inputlatitude');
        const inputLng = document.getElementById('inputlongitude');
        if (inputLat) inputLat.value = lat.toFixed(6);
        if (inputLng) inputLng.value = lng.toFixed(6);

        // Actualizar marcador de selección
        if (clickMarker) map.removeLayer(clickMarker);

        clickMarker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`)
            .openPopup();
    });

});