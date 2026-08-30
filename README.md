# Próximos destinos

Sitio web estático para consultar los 16 posibles destinos del viaje sorpresa de tres personas desde Barcelona, del 11 al 14 de septiembre de 2026. Cada guía propone tres rutas completas y reúne horarios, precios, transporte, distancias a pie, entradas, presupuesto, comida, tiempo, incidencias y requisitos para personas españolas.

## Destinos incluidos

Ámsterdam, Basilea, Berlín, Bolonia, Bristol, Budapest, Estocolmo, Ginebra, Londres, Lyon, Mánchester, Milán, París, Praga, Roma y Venecia.

## Funciones principales

- Portada compacta con búsqueda y filtros para abrir rápidamente la guía revelada.
- Tres itinerarios seleccionables por destino, con la ruta activa reflejada en la URL.
- Mapas en diálogo, enlaces oficiales y resúmenes diarios de desplazamientos.
- Conversión EUR/moneda local mediante Frankfurter, con un tipo de cambio fechado como alternativa.
- Previsión para las fechas del viaje mediante Open-Meteo, además del contexto histórico ya investigado.
- Modo viaje para completar destino, ruta, vuelos, hotel y comprobaciones cuando Waynabox revele la reserva el 9 de septiembre.
- Imágenes WebP locales, optimizadas y acreditadas.

El modo viaje guarda la información únicamente en `localStorage`, dentro del navegador usado. No existe servidor ni sincronización entre dispositivos; no deben guardarse datos de tarjetas ni documentación sensible.

## Estructura

```text
.
├── .github/workflows/
│   ├── static.yml           # Validación y publicación en GitHub Pages
│   └── links.yml            # Revisión semanal de enlaces externos
├── assets/images/           # Fotografías WebP y créditos
├── css/
│   ├── trips.css            # Base visual, portada y modo viaje
│   └── destination.css      # Componentes de las guías
├── destinations/            # Una página HTML por destino
├── js/
│   ├── destination.js       # Rutas, cambio, tiempo y mapas
│   ├── destinations-data.js # Catálogo resumido de los 16 destinos
│   ├── index.js             # Búsqueda y filtros de la portada
│   └── trip-mode.js         # Datos y lista del modo viaje
├── scripts/
│   └── validate-site.mjs    # Comprobaciones estructurales sin dependencias
├── DESTINATION_PAGE_PLAYBOOK.md
├── index.html
└── viaje.html
```

## Ver y validar en local

Se puede abrir `index.html` directamente. Para reproducir mejor el comportamiento publicado, inicia un servidor desde la raíz:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

La validación no instala dependencias y requiere una versión moderna de Node.js:

```bash
node scripts/validate-site.mjs
```

Comprueba, entre otras cosas, los 16 destinos, enlaces y recursos locales, estructura de rutas, resúmenes de movilidad, atributos de accesibilidad, dimensiones de imagen, catálogo compartido y uso del endpoint vigente de Frankfurter.

## Datos y mantenimiento

La metodología editorial completa está en `DESTINATION_PAGE_PLAYBOOK.md`. Los horarios, precios, inventario de entradas, huelgas, obras, eventos, restauración, tipos de cambio y previsiones son datos volátiles. Deben volver a comprobarse el 9 de septiembre, cuando se revele el destino, y otra vez en la víspera o el propio día cuando la guía así lo indique.

Las cantidades de la portada son resúmenes de consulta, no nuevas tarifas: proceden de los presupuestos y las distancias ya documentados en cada guía. El transporte entre aeropuerto y hotel sigue excluido porque todavía se desconocen ambos puntos.

## Publicación

Los cambios enviados a `main` se validan y, si todo es correcto, se publican mediante GitHub Pages en:

<https://mpadilvi.github.io/trips.github.io/>

Las propuestas de cambio también ejecutan la validación estructural. Un flujo semanal separado revisa los enlaces externos para detectar fuentes que hayan cambiado o desaparecido.
