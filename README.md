<h1 align="center">Automatización de datos entre Google Sheets y Firebase Realtime Database</h1>

¿Qué utilidad tiene esto? Por ejemplo, usar a modo de dashboard para ajustar precios en un e-commerce una hoja de cálculo. Interfaz más accesible y recurrente para un cliente.

Al modificar datos en Google Sheets se actualizaran automáticamente en Firebase. ¿Pero como lo logramos?

Google Sheets permite agregar scripts, donde crearemos un programa para la sincronización con la base de datos en tiempo real:

1. Desde la hoja de cálculo a sincronizar con la base de datos vamos a "Apps Script" en "Extensiones". 
2. Hacemos visible el archivo "appsscript.json" desde "Configuración del Proyecto" y seleccionamos la opción "Mostrar el archivo de manifiesto 'appsscript.json' en el editor".
3. Regresamos a "Editor" y pegamos el siguiente código en el archivo "appsscript.json": https://lnkd.in/dACUHARj.
4. Luego, pegamos el siguiente código en el archivo "Codigo.gs": https://lnkd.in/djMX_GBM. Reemplazando "spreadsheetID" por el ID de la hoja de cálculo y "firebaseURL" por la URL de la base de datos. Seleccionamos el método "initialize" y ejecutamos el código.

Este script importará la información a Firebase desde Google Sheets. Antes de ejecutarse, nos pedirá que aceptemos permisos.

# 5. ¿Cómo acceder a esta información en tu código?
<p align="center"></p>
- [Instalamos la dependencia de Firebase: npm install firebase.]
- [Importamos las funcionalidades del módulo "database".]
- [Realizamos la petición, que devolverá un array de objetos que podemos iterar para mostrar en pantalla. Como en el ejemplo del siguiente código: https://lnkd.in/dhtdA_gX.]
- [Debemos modificar las reglas en Firebase para permitir la lectura de información.]

• Instalamos la dependencia de Firebase: npm install firebase.
• Importamos las funcionalidades del módulo "database".
• Realizamos la petición, que devolverá un array de objetos que podemos iterar para mostrar en pantalla. Como en el ejemplo del siguiente código: https://lnkd.in/dhtdA_gX.
• Debemos modificar las reglas en Firebase para permitir la lectura de información.
