import "hammerjs";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { AppConfig } from "./environments/environment";
const log = require("electron-log");
log.transports.console.level = true;
// const { ipcMain } = require("electron");

// log.info("Hello, log");
// log.warn("Some problem appears");

// let loglist = ["error", "warn", "info", "verbose", "debug", "silly"];

export const isDev = require("electron-is-dev");
// require("update-electron-app")({
//   repo: "zombodotcom/Zombpoe",
//   updateInterval: "5 minutes",
//   logger: require("electron-log")
// });

// app.on("ready", () => {
//   const request = net.request(
//     "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil"
//   );
//   request.on("response", response => {
//     console.log("STATUS:", response.statusCode);
//     console.log("HEADERS", JSON.stringify(response.headers));
//     response.on("data", chunk => {
//       console.log("BODY:", chunk);
//     });
//     response.on("end", () => {
//       console.log("No more data in response.");
//     });
//   });
//   request.end();
// });

if (isDev) {
  console.log(
    "%c Running In Dev \n Welcome to ZombPoes Dev Branches",
    "background: #222; color: magenta"
  );

  log.info("%cMagenta text. %cGreen text", "color: magenta", "color: green");
  log.error("%cMagenta text. %cGreen text", "color: magenta", "color: green");
  log.verbose("%cMagenta text. %cGreen text", "color: magenta", "color: green");
  log.debug("%cRed text. %cGreen text", "color: red", "color: green");
  log.silly(
    "%cUnset %cBlack %cRed %cGreen %cYellow %cBlue %cMagenta %cCyan %cWhite",
    "color: unset",
    "color: black",
    "color: red",
    "color: green",
    "color: yellow",
    "color: blue",
    "color: magenta",
    "color: cyan",
    "color: white"
  );
} else {
  console.log("Running in production");
  console.log("running update check");
}

if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));

// const { net } = require("electron");
// const request = net.request("https://github.com");

// request.on("response", response => {
//   log.info(response);
//   console.log("STATUS: ${response.statusCode}");
//   console.log("HEADERS: ${JSON.stringify(response.headers)}");
//   response.on("data", chunk => {
//     log.info(chunk);
//   });
//   response.on("end", () => {
//     log.info("end");
//     console.log("No more data in response.");
//   });
// });
// request.end();
