# Curriculum Hostelería — Francisco Cobo

Currículum vitae web estático, responsive y exportable a PDF en formato A4. Diseñado para hostelería (sala y gestión), con despliegue en GitHub Pages.

**URL pública:** [https://paco16889.github.io/CurriculumHosteleriaFCS/](https://paco16889.github.io/CurriculumHosteleriaFCS/)

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica (`aside`, `main`, `details`/`summary`, listas) |
| **CSS3** | Layout Grid/Flexbox, variables CSS, media queries, estilos de impresión |
| **JavaScript (vanilla)** | Sincronización de secciones plegables según viewport |
| **SVG inline** | Iconografía de contacto (símbolos reutilizables con `<use>`) |
| **Google Fonts** | Playfair Display + Lato |
| **GitHub Pages** | Hosting estático desde rama `main` |
| **Node.js + puppeteer-core** | Generación automatizada de PDF (solo entorno local) |
| **PowerShell** | Script de conveniencia para regenerar el PDF en Windows |

No hay frameworks (React, Vue, etc.), bundlers ni backend. El sitio es 100 % estático.

---

## Arquitectura del proyecto

```
CurriculumHosteleriaFCS/
├── index.html          # Contenido y estructura del CV
├── styles.css          # Estilos pantalla (PC + móvil)
├── pdf.css             # Estilos solo impresión (@media print)
├── script.js           # Lógica responsive de <details>
├── foto.png            # Imagen de perfil
├── generar-pdf.mjs     # Exportador PDF (Puppeteer + Chrome/Edge)
├── generar-pdf.ps1     # Wrapper PowerShell
├── package.json        # Dependencia puppeteer-core (generación PDF)
├── CV-Francisco-Cobo.pdf  # PDF generado (opcional en repo)
└── .gitignore          # Excluye node_modules/
```

### Separación de responsabilidades

- **`styles.css`** — Vista en navegador. Breakpoint móvil en `@media screen and (max-width: 768px)`.
- **`pdf.css`** — Vinculado con `media="print"`. No altera la web; aplica al imprimir desde el navegador (Ctrl+P).
- **`script.js`** — En viewport ≥769px fuerza `open` en las secciones de la columna derecha; en móvil las deja plegables.
- **`generar-pdf.mjs`** — Renderiza la vista PC (794×1123 px) con `emulateMediaType('screen')`, inyecta recorte A4 y exporta una sola página.

---

## Diseño y layout

### Vista PC / A4 (794 × 1123 px)

- **Grid de 2 columnas:** barra lateral oscura (220 px) + contenido principal.
- Altura fija tipo hoja A4 con `overflow: hidden` para mantener el formato de una página.
- Secciones siempre visibles (sin comportamiento acordeón).

### Vista móvil (≤768 px)

- Layout en columna única.
- Cabecera móvil con foto y nombre.
- Columna izquierda de escritorio oculta; datos replicados en acordeones (`<details>`).
- Secciones principales (Sobre mí, Experiencia, Formación, Competencias) también plegables.
- Enlaces `tel:` y `mailto:` en datos de contacto.

### Impresión y PDF

- Colores de fondo preservados (`print-color-adjust: exact`).
- Ocultación de elementos solo-móvil (`mobile-header`, `mobile-menu`).
- PDF generado por script: recorte exacto a 1 hoja, sin segunda página residual.

---

## Elementos implementados

- Extracción de CSS y JS a ficheros externos.
- Sistema de diseño con variables CSS (`--col-left`, `--col-left-accent`, etc.).
- Iconos SVG en lugar de emojis en menú móvil.
- Competencias en lista (no etiquetas) para mejor legibilidad en todos los dispositivos.
- Destacado tipográfico de experiencia (`highlight-exp`).
- Enlaces de contacto clicables.
- Pipeline local de exportación a PDF sin modificar el HTML de producción.

---

## Desarrollo local

### Ver el CV en el navegador

Abrir `index.html` directamente o servir la carpeta con cualquier servidor estático:

```bash
npx serve .
```

### Regenerar el PDF

Tras modificar `index.html`, `styles.css` o `foto.png`:

```powershell
.\generar-pdf.ps1
```

Equivalente con npm:

```bash
npm run pdf
```

**Requisitos:** Node.js, npm y Google Chrome o Microsoft Edge instalados.

**Flujo del script:**

1. `generar-pdf.ps1` comprueba si existe `puppeteer-core`; si no, ejecuta `npm install`.
2. `generar-pdf.mjs` lanza Chrome en modo headless.
3. Carga `index.html` a 794×1123 px (vista PC).
4. Abre todas las secciones colapsables.
5. Exporta `CV-Francisco-Cobo.pdf` (1 página A4).

> **Nota:** Los cambios en HTML/CSS se reflejan en el PDF al volver a ejecutar el script. No hace falta intervención manual adicional.

---

## Despliegue (GitHub Pages)

1. Commit y push a la rama `main`.
2. En el repositorio: **Settings → Pages → Source:** `Deploy from a branch` → `main` / `/ (root)`.
3. La web se actualiza en 1–2 minutos tras cada push.

Archivos necesarios en la raíz del repo: `index.html`, `styles.css`, `script.js`, `pdf.css`, `foto.png`.

Los scripts de PDF (`generar-pdf.*`, `package.json`) son opcionales en el remoto; sirven para desarrollo local.

---

## Licencia y autor

Proyecto personal de **Francisco Cobo** — CV orientado a hostelería (Costa del Sol).
