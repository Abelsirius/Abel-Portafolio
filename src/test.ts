import 'zone.js';  // Required for Angular
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// Inicializa el entorno de pruebas
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Encuentra y ejecuta todas las pruebas en archivos `.spec.ts`
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
