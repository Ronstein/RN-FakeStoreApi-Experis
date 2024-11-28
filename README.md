
# **Experis Prueba Técnica | React Native FakeStore App**

Esta aplicación es un ejemplo de uso de **React Native** con integración a la API de **FakeStore**. Permite realizar autenticación, listar productos y ver detalles de cada producto.

## **Configuración Inicial**

Sigue estos pasos para configurar y ejecutar el proyecto:

### 1. **Renombrar archivo `.env.template` a `.env`:**  
   En la raíz del proyecto, renombra el archivo `.env.template` a `.env` y asegúrate de que la variable `API_URL` esté configurada correctamente:

   ```plaintext
   API_URL=https://fakestoreapi.com
   ```

### 2. **Instalar dependencias:**  
   Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias de **Node.js**:

   ```bash
   npm install
   ```

### 3. **Instalar dependencias de iOS (si trabajas en iOS):**  
   Si estás trabajando con **iOS**, navega a la carpeta `ios` y ejecuta el siguiente comando para instalar las dependencias de **CocoaPods**:

   ```bash
   cd ios
   pod install
   cd ..
   ```

### 4. **Ejecutar la aplicación:**  
   Inicia el servidor de desarrollo y los simuladores ejecutando:

   ```bash
   npm start
   ```

---

## **Especificaciones del Proyecto**

### **Pantalla de Login**

La pantalla de login permite que el usuario ingrese su nombre de usuario y contraseña para autenticarse:

- **Requisitos:**
  - **Nombre de usuario:** Obligatorio y con un mínimo de 5 caracteres.
  - **Contraseña:** Obligatoria y con un mínimo de 5 caracteres.
  
- **Proceso de autenticación:**
  - El login se realiza contra la API de autenticación de FakeStore:  
    `https://fakestoreapi.com/auth/login`.
  
- **En caso de éxito:**
  - Guarda el **token** devuelto por la API.
  - Redirige a la pantalla de lista de productos.

- **En caso de error:**
  - Muestra un mensaje de error adecuado.

- **Restricción:**
  - Si el usuario no está autenticado, será redirigido automáticamente a la pantalla de login.

- **Tecnologías utilizadas:**
  - **React Hook Form** para la validación y manejo de formularios de manera eficiente.

  - **Usuario de prueba**:
  - Puedes usar el siguiente usuario para probar el login:
    - **Username**: `mor_2314`
    - **Password**: `83r5^_`
  
  Si este usuario no funciona, por favor revisa el nombre de usuario y la contraseña en la web de la [FakeStore API](https://fakestoreapi.com/auth/login) para obtener credenciales válidas.

### **Pantalla de Lista de Productos**

 **Objetivo**: Mostrar una lista de productos obtenidos desde la API:  
  `https://fakestoreapi.com/products`.

La pantalla de lista de productos muestra los productos obtenidos desde la API de FakeStore:

- **Características de la lista de productos:**
  - Cada producto muestra:
    - **Imagen del producto.**
    - **Nombre del producto.**
    - **Precio del producto.**
  - Los productos se cargan de manera eficiente y gestionan correctamente los estados de:
    - **Carga**: Muestra un loader mientras se obtienen los datos.
    - **Éxito**: Muestra la lista de productos.
    - **Error**: Muestra un mensaje de error en caso de que la carga falle.

- **Navegación:**
  - Al hacer clic en un producto, el usuario será redirigido a la pantalla de detalles del producto.

### **Pantalla de Detalles del Producto**

 **Objetivo**: Mostrar una lista de productos obtenidos desde la API:  
  `https://fakestoreapi.com/products/id`.

Al seleccionar un producto de la lista, se navega a una pantalla con los detalles completos del producto:

- **Detalles que se muestran:**
  - **Imagen del producto.**
  - **Nombre del producto.**
  - **Descripción completa del producto.**
  - **Precio del producto.**

---

## **Tecnologías Utilizadas**

- **React Native:** Framework para la construcción de aplicaciones móviles multiplataforma.
- **Zustand:** Para el manejo del estado global de la aplicación de forma eficiente.
- **React Navigation:** Para la navegación entre pantallas.
- **AsyncStorage**: Para almacenar el token de usuario de manera persistente.
- **UI Kitten:** Biblioteca de componentes UI que ofrece un diseño atractivo y accesible.
- **React Hook Form:** Para la gestión de formularios y validación de entradas de usuario de forma sencilla y eficiente.
- **Axios:** Para realizar las solicitudes HTTP hacia las APIs de FakeStore.

---

## **Notas Adicionales**

- Esta aplicación utiliza una API pública (`https://fakestoreapi.com`), por lo que puede experimentar cambios en los datos proporcionados.
- El manejo de la autenticación y el estado global se realiza mediante **Zustand**, lo que permite una arquitectura sencilla y eficiente sin necesidad de Redux.
- Asegúrate de tener las versiones correctas de las herramientas necesarias para el desarrollo en **React Native**, como Node.js y Xcode (para iOS) o Android Studio (para Android).

---

¡Disfruta desarrollando con **React Native**! 🚀

Creado por: **Rodrigo Pavez Briones**

Email: **ron.pavezb@gmail.com**
