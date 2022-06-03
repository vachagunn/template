import APIController from "./controllers/APIController.mjs";
import UIController from "./controllers/UIController.mjs";
import AppController from "./controllers/AppController.mjs";

new AppController(new UIController(), new APIController());