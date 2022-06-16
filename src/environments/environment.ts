// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  transporteUrl: 'http://localhost:8080/transporte',
  porteUrl: 'http://localhost:8080/porte',
  provinciaUrl: 'http://localhost:8080/provincia',
  paisUrl: 'http://localhost:8080/pais',
  authURL : 'http://localhost:8080/auth/',
  conductorUrl : 'http://localhost:8080/conductor',
  expediorUrl : 'http://localhost:8080/expedidor',
  emailUrl:'http://localhost:8080/email',
  registroExternos:'http://localhost:4200/singup-externos',
  confirmacion:'http://localhost:4200/confirmacion',
  usuarioUrl:'http://localhost:8080/usuario',
  cuentaBancariaUrl:'http://localhost:8080/cuentaBancaria',
  tipoCamionUrl:'http://localhost:8080/tipoCamion',
  tipoRemolqueUrl:'http://localhost:8080/tipoRemolque',
  camionUrl:'http://localhost:8080/camion',
  remolqueUrl:'http://localhost:8080/remolque',
  estadoUrl:'http://localhost:8080/estado',
  viajeUrl:'http://localhost:8080/viaje',
  pagoUrl:'http://localhost:8080/pago',
  estadoPagoUrl:'http://localhost:8080/estadoPago',
  notificacionUrl:'http://localhost:8080/notificacion',
  gravedadUrl:'http://localhost:8080/gravedad',
  recaptcha: {
    siteKey: '6LcozHIgAAAAAJd4iyKyVrKu6w3drShtMQsXq2p2',
  },
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
