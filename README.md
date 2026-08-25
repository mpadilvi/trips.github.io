# Trips

Sitio web estático para reunir posibles destinos de viaje. Cada destino tendrá su
propia página con la información necesaria para comparar opciones y preparar el
viaje.

## Estructura inicial

```text
.
├── assets/
│   └── images/         # Fotografías locales y documento de créditos
├── css/
│   ├── trips.css       # Variables, estilos base y componentes reutilizables
│   └── destination.css # Componentes de las guías de destino
├── destinations/
│   └── budapest.html   # Página piloto de Budapest
├── js/
│   └── destination.js  # Cambio, previsión meteorológica y mapas
├── index.html     # Portada del sitio
├── README.md      # Documentación del proyecto
└── .gitignore     # Archivos que Git no debe versionar
```

## Biblioteca CSS

`css/trips.css` contiene la paleta cromática, variables semánticas, estilos base y
componentes compartidos. Para utilizarla en una página:

```html
<link rel="stylesheet" href="css/trips.css">
```

La paleta inicial está disponible mediante estas variables:

```css
var(--ink-black)
var(--deep-space-blue)
var(--blue-slate)
var(--dusty-denim)
var(--eggshell)
```

## Ver el sitio en local

Puedes abrir `index.html` directamente en un navegador. Si prefieres usar un
servidor local y tienes Python instalado, ejecuta desde esta carpeta:

```bash
python -m http.server 8000
```

Después, visita `http://localhost:8000`.

## Publicación

El repositorio está pensado para publicarse mediante GitHub Pages en:

<https://mpadilvi.github.io/trips.github.io/>

Los destinos y la estructura definitiva se añadirán a medida que se definan.

## Datos dinámicos

La guía de Budapest consulta dos servicios sin clave de API desde el navegador:

- Frankfurter, basado en los tipos de referencia del BCE, para actualizar HUF/EUR.
- Open-Meteo para mostrar la previsión del 11 al 14 de septiembre de 2026 cuando
  esas fechas entren en su horizonte disponible.

Si cualquiera de los servicios no responde, la página conserva una referencia de
cambio fechada y los valores climáticos oficiales de septiembre como alternativa.
