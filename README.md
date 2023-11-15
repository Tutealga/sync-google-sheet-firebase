<h1 align="center">Automatización de datos entre Google Sheets y Firebase Realtime Database</h1>

¿Qué utilidad tiene esto? Por ejemplo, usar a modo de dashboard para ajustar precios en un e-commerce una hoja de cálculo. Interfaz más accesible y recurrente para un cliente.

Al modificar datos en Google Sheets se actualizaran automáticamente en Firebase. ¿Pero como lo logramos?

Google Sheets permite agregar scripts, donde crearemos un programa para la sincronización con la base de datos en tiempo real:

1. Desde la hoja de cálculo a sincronizar con la base de datos vamos a "Apps Script" en "Extensiones". 
2. Hacemos visible el archivo "appsscript.json" desde "Configuración del Proyecto" y seleccionamos la opción "Mostrar el archivo de manifiesto 'appsscript.json' en el editor".
3. Regresamos a "Editor" y pegamos el siguiente código en el archivo "appsscript.json":
```json
{
  "timeZone": "America/Argentina/Buenos_Aires",
  "dependencies": {
     "libraries": [{
      "userSymbol": "FirebaseApp",
      "libraryId": "1hguuh4Zx72XVC1Zldm_vTtcUUKUA6iBUOoGnJUWLfqDWx5WlOJHqYkrt",
      "version": "29",
      "developmentMode": true
    }]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": ["https://www.googleapis.com/auth/firebase.database", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/script.scriptapp", "https://www.googleapis.com/auth/script.external_request"],
  "executionApi": {
    "access": "DOMAIN"
  }
}
```
4. Luego, pegamos el siguiente código en el archivo "Codigo.gs": https://lnkd.in/djMX_GBM. Reemplazando "spreadsheetID" por el ID de la hoja de cálculo y "firebaseURL" por la URL de la base de datos. Seleccionamos el método "initialize" y ejecutamos el código.

Este script importará la información a Firebase desde Google Sheets. Antes de ejecutarse, nos pedirá que aceptemos permisos.

# 5. ¿Cómo acceder a esta información en tu código?
<ul>
  <li>• Instalamos la dependencia de Firebase: npm install firebase.</li>
  <li>• Importamos las funcionalidades del módulo "database".</li>
  <li>• Realizamos la petición, que devolverá un array de objetos que podemos iterar para mostrar en pantalla. Como en el ejemplo del siguiente código: https://lnkd.in/dhtdA_gX.</li>
  <li>• Debemos modificar las reglas en Firebase para permitir la lectura de información.</li>
</ul>




