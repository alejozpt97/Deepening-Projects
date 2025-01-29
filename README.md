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

- Abre tu navegador y ve a http://localhost:5173 para ver el proyecto corriendo.

## Comandos útiles

*npm run dev: Inicia el servidor en modo desarrollo.*
*npm run build: Compila el proyecto para producción.*
*npm start: Inicia el servidor en modo producción (pero antes tienes que ejecutar npm run build).*

- Conceptos clave de Remix

1. Links
En Remix usamos el componente Link para navegar entre las rutas de la aplicación. Esto es muy parecido a cómo usaríamos un <a> en HTML, pero con algunas mejoras para optimizar la carga de las páginas.


3. Loaders
Los loaders en Remix son funciones que se ejecutan en el servidor antes de renderizar la página. Se usan para cargar datos que la página necesita antes de ser mostrada.


4. Rutas dinámicas
Las rutas dinámicas permiten capturar parámetros dentro de la URL. Por ejemplo, si tienes una ruta como /contacto/:id, el valor de :id cambia según la URL visitada. Esto se usa comúnmente para mostrar detalles de un elemento en función de su identificador.


5. Rutas anidadas
Las rutas anidadas en Remix permiten tener rutas dentro de otras rutas, lo que nos ayuda a estructurar la aplicación de manera más eficiente. Usamos el componente Outlet para renderizar contenido de rutas secundarias dentro de una ruta principal sin recargar toda la página.


6. Componente Outlet
El componente Outlet en Remix se utiliza para renderizar rutas hijas dentro de una ruta principal. Esto es muy útil cuando tienes una estructura de rutas anidadas.


# Uso de action, loader, useLoaderData, useActionData e invariant en Remix

En este documento explico qué son action, loader, useLoaderData, useActionData e invariant en Remix, cómo se usan y cómo hacer validaciones.

*¿Qué es loader?*

El loader es una función en Remix que se ejecuta en el servidor y sirve para obtener datos antes de que se renderice la página. Se usa con useLoaderData para acceder a esos datos en el componente.

Ejemplo de loader:

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const data = { mensaje: "Hola desde el loader" };
  return json(data);
};

export default function MiPagina() {
  const data = useLoaderData<typeof loader>();
  return <h1>{data.mensaje}</h1>;
}

*¿Qué es action?*

El action en Remix se usa para manejar solicitudes POST, PUT, DELETE, etc. Se ejecuta en el servidor y se usa cuando un usuario envía un formulario.

Ejemplo de action:

import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const nombre = formData.get("nombre");

  if (!nombre) {
    return json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  return redirect("/gracias");
};

export default function MiFormulario() {
  const actionData = useActionData<typeof action>();
  return (
    <form method="post">
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      <input type="text" name="nombre" placeholder="Tu nombre" />
      <button type="submit">Enviar</button>
    </form>
  );
}

*useLoaderData y useActionData*

useLoaderData(): Obtiene los datos del loader.

useActionData(): Obtiene los datos de respuesta del action.

Ambos se usan dentro de los componentes para acceder a la información que viene del servidor.

invariant en Remix

invariant es una función que se usa para asegurarse de que una condición se cumpla. Si no se cumple, lanza un error.

Ejemplo de invariant:

import invariant from "tiny-invariant";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  invariant(email, "El email es obligatorio");

  return json({ mensaje: "Formulario enviado correctamente" });
};

Si email es null o undefined, invariant lanza un error y detiene la ejecución.

# Validaciones en Remix

Para hacer validaciones, se pueden usar varias estrategias:

1. Validaciones en el servidor (seguras y recomendadas):

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }

  return redirect("/dashboard");
};

2. Validaciones en el cliente (para mejor UX):

export default function Formulario() {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      event.preventDefault();
      setError("Todos los campos son obligatorios");
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Contraseña" />
      <button type="submit">Enviar</button>
    </form>
  );
}

# Conclusión

loader sirve para obtener datos antes de renderizar.

action maneja formularios y solicitudes de modificación de datos.

useLoaderData y useActionData permiten acceder a los datos en el componente.

invariant ayuda a asegurar que ciertos valores existen.

Las validaciones se deben hacer en el servidor, pero se pueden complementar en el cliente para mejorar la experiencia.
