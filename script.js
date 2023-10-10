const endpoints = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const ciudades = [];

fetch(endpoints)
  .then(blob => blob.json())
  .then(data => ciudades.push(...data));

function encontrarSimilitudes(palabraSimilar, ciudades) {
  return ciudades.filter(place => {
    const regex = new RegExp(palabraSimilar, 'gi'); // Usar 'gi' para una búsqueda insensible a mayúsculas y minúsculas
    return place.city.match(regex) || place.state.match(regex);
  });
}

function formatearNumeroPoblacion(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mostrarSimiludes() {
  const valorInput = this.value.trim(); // Obtener el valor del input sin espacios en blanco al principio y al final
  if (valorInput === "") {
    sugerencia.innerHTML = ""; // Si el input está vacío, limpiar la lista de sugerencias
    return; 
  }

  const mostrarArray = encontrarSimilitudes(valorInput, ciudades);
  const html = mostrarArray.map(place => {
    const regex = new RegExp(valorInput, 'gi'); // Usar 'gi' para una búsqueda insensible a mayúsculas y minúsculas
    const nombrePais = place.city.replace(regex, match => `<span class="h1">${match}</span>`);
    const nombreCiudad = place.state.replace(regex, match => `<span class="h1">${match}</span>`);
    const poblacionFormateada = formatearNumeroPoblacion(place.population); 
    return `
    <li> 
      <span class="name">${nombrePais}, ${nombreCiudad}</span>
      <span class="poblacion">${poblacionFormateada}</span>
    </li>
    `;
  }).join('');
  sugerencia.innerHTML = html;
}


const buscar = document.querySelector('.buscar');
const sugerencia = document.querySelector('.sugerencia');

buscar.addEventListener('input', mostrarSimiludes);
buscar.addEventListener('keyup', mostrarSimiludes);
