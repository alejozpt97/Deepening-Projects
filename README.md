# Proyecto Remix

Este proyecto fue desarrollado con el framework **Remix**. A continuación te dejo cómo instalar las dependencias y arrancar el proyecto en tu máquina, junto con algunos conceptos clave que se usan en este proyecto.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 20 o superior). Si no lo tienes, descárgalo desde [Node.js](https://nodejs.org/).
- **npm** (viene incluido con Node.js). Para verificar que todo esté bien instalado, puedes correr:
  ```bash
  npm -v  
  node -v
con estos comandos revisas si quedo instalado y en que version

## Pasos para instalar y arrancar el proyecto

Clona el repositorio en tu máquina:
git clone <URL-del-repositorio> 

- Entra al directorio del proyecto:
cd <nombre-del-proyecto>

- Instala las dependencias:
npm install

- Arranca el servidor en modo desarrollo:
npm run dev

- Abre tu navegador y ve a http://localhost:3000 para ver el proyecto corriendo.

## Comandos útiles

*npm run dev: Inicia el servidor en modo desarrollo.*
*npm run build: Compila el proyecto para producción.*
*npm start: Inicia el servidor en modo producción (pero antes tienes que ejecutar npm run build).*

- Conceptos clave de Remix

1. Links
En Remix usamos el componente Link para navegar entre las rutas de la aplicación. Esto es muy parecido a cómo usaríamos un <a> en HTML, pero con algunas mejoras para optimizar la carga de las páginas.

Ejemplo de uso:

import { Link } from 'remix';
<Link to="/contactos">Ir a Contactos</Link>

2. Loaders
Los loaders en Remix son funciones que se ejecutan en el servidor antes de renderizar la página. Se usan para cargar datos que la página necesita antes de ser mostrada.

Un ejemplo de cómo se usa un loader sería:

import { json, LoaderFunction } from 'remix';

export let loader: LoaderFunction = async () => {
  let contactos = await getContactos();
  return json(contactos);
};

3. Rutas dinámicas
Las rutas dinámicas permiten capturar parámetros dentro de la URL. Por ejemplo, si tienes una ruta como /contacto/:id, el valor de :id cambia según la URL visitada. Esto se usa comúnmente para mostrar detalles de un elemento en función de su identificador.

Ejemplo de ruta dinámica:

import { useParams } from 'remix';

export default function Contacto() {
  let { id } = useParams();
  return <div>Contacto con ID: {id}</div>;
}

La URL podría ser algo como /contacto/123 y el parámetro id sería 123.

4. Rutas anidadas
Las rutas anidadas en Remix permiten tener rutas dentro de otras rutas, lo que nos ayuda a estructurar la aplicación de manera más eficiente. Usamos el componente Outlet para renderizar contenido de rutas secundarias dentro de una ruta principal sin recargar toda la página.

Ejemplo de rutas anidadas:

// En routes/index.tsx

import { Outlet } from 'remix';

export default function Index() {
  return (
    <div>
      <h1>Bienvenido a Remix Contacts</h1>
      <Outlet /> {/* Aquí se renderizan las subrutas */}
    </div>
  );
}

// En routes/contactos.tsx
export default function Contactos() {
  return <div>Esta es la lista de contactos.</div>;
}

5. Componente Outlet
El componente Outlet en Remix se utiliza para renderizar rutas hijas dentro de una ruta principal. Esto es muy útil cuando tienes una estructura de rutas anidadas.

Ejemplo de cómo usar Outlet:

import { Outlet } from 'remix';

export default function Layout() {
  return (
    <div>
      <h1>Bienvenido al sitio de Contactos</h1>
      <Outlet /> {/* Este es el lugar donde se renderizan las rutas hijas */}
    </div>
  );
}