<h1>Automatización de datos entre Google Sheets y Firebase Realtime Database</h1>

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
4. Luego, pegamos el siguiente código en el archivo "Codigo.gs". Reemplazando "spreadsheetID" por el ID de la hoja de cálculo y "firebaseURL" por la URL de la base de datos. Seleccionamos el método "initialize" y ejecutamos el código.
``` gs
function getEnvironment() {
  var environment = {
    spreadsheetID: "your_spread_sheet_id",
    firebaseUrl: "your_realtime_database_url",
  };
  return environment;
}

// Creates a Google Sheets on change trigger for the specific sheet
function createSpreadsheetEditTrigger(sheetID) {
  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getTriggerSourceId() == sheetID) {
      triggerExists = true;
      break;
    }
  }

  if (!triggerExists) {
    var spreadsheet = SpreadsheetApp.openById(sheetID);
    ScriptApp.newTrigger("importSheet")
      .forSpreadsheet(spreadsheet)
      .onChange()
      .create();
  }
}

// Delete all the existing triggers for the project
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

// Initialize
function initialize(e) {
  writeDataToFirebase(getEnvironment().spreadsheetID);
}

// Write the data to the Firebase URL
function writeDataToFirebase(sheetID) {
  var ss = SpreadsheetApp.openById(sheetID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  createSpreadsheetEditTrigger(sheetID);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    importSheet(sheets[i]);
    SpreadsheetApp.setActiveSheet(sheets[i]);
  }
}

// A utility function to generate nested object when
// given a keys in array format
function assign(obj, keyPath, value) {
  lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    key = keyPath[i];
    if (!(key in obj)) obj[key] = {};
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

// Import each sheet when there is a change
function importSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var name = sheet.getName();
  var data = sheet.getDataRange().getValues();

  var dataToImport = {};

  for (var i = 1; i < data.length; i++) {
    dataToImport[data[i][0]] = {};
    for (var j = 0; j < data[0].length; j++) {
      assign(dataToImport[data[i][0]], data[0][j].split("__"), data[i][j]);
    }
  }

  var token = ScriptApp.getOAuthToken();

  var firebaseUrl =
    getEnvironment().firebaseUrl + sheet.getParent().getId() + "/" + name;
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, token);
  base.setData("", dataToImport);
}
```

Este script importará la información a Firebase desde Google Sheets. Antes de ejecutarse, nos pedirá que aceptemos permisos.

# 5. ¿Cómo acceder a esta información en tu código?
<ul>
  <li>Instalamos la dependencia de Firebase: npm install firebase.</li>
  <li>Importamos las funcionalidades del módulo "database".</li>
  <li>Debemos modificar las reglas en Firebase para permitir la lectura de información.</li>
  <li>Realizamos la petición, que devolverá un array de objetos que podemos iterar para mostrar en pantalla. Como en el ejemplo del siguiente código:</li> 
</ul>
  ``` js
    import {rdb} from "../firebase/firebase"
import {get, ref, child} from "firebase/database"

const getData = async () => {
 const db = ref(rdb)

 const response = await get(child(db, 'your_spread_sheet_id/spread_sheet_name'))
 const data = await response.val()
 return data
}

const Data = async () => {
    const res = await getData();

  return (
    <section>
  <article>
  {
      res.map(data => <Card key={data.id} data={data} />)
  }
  </article>
    </section>
    )

}

export default Data
```




