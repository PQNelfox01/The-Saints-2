// Array de imágenes (modifica con tus rutas)
const images = [
    "/assets/images/gallery/imagen1.png",
    "/assets/images/gallery/imagen2.png",
    "/assets/images/gallery/imagen3.png",
    // Añade más rutas...
];

// Cargar galería
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');

    // Generar imágenes
    images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Imagen de la galería";
        img.loading = "lazy"; // Carga perezosa
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = imgSrc;
        });
        gallery.appendChild(img);
    });

    // Cerrar lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Cerrar al hacer clic fuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});