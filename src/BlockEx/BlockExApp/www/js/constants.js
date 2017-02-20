angular.module('app.constants', ['ionic'])

  // .constant( 'AUTH_EVENTS', {
  // 	notAuthenticated: "auth-not-authenticated",
  // 	notAuthorized: "auth-not-authorized"
  // } )

  .constant('svcURI', {

    restAppTrades: "/app/trades",
    restAppUsers: "/app/users",

    restChainAccount: "/chain/account",
    restChainAccounts: "/chain/accounts",
    restChainAssets: "/chain/assets",
    restChainKeys: "/chain/keys",
    restChainSign: "/chain/sign",
    restChainTransactions: "/chain/transactions",
    restChainBalances: "/chain/balances"
  })

  // .constant('APP_SETTINGS', {
  //   // API Url
  //   BaseURI: "http://localhost:8080/BlockEx/0.0.1"

  // })

  .constant('NODE_SETTINGS',
  {
    // API URL
    BaseURL: "http://41.76.226.170:3000/BlockEx/0.0.1",
    // Internal server
    // nodeURL: "http://172.16.101.93:1999",
    // clientToken: "UbuntuDev:e72629518809db4f5176d084f80f2261a3f4c70e044c6339251977c79f73c4bb"

    // Workin Group Temp Node
    // nodeURL: "http://41.76.226.170:1999",
    // clientToken: "AppDev:18bbc4a6fab7a3f27ce4ea636ec5cd6470b3a1b84449590125f1191d069ab0a2"
    nodeURL: "http://yourhost:1999",
    clientToken: "client:18bbc4a6fab7a3f27ce4ea636ec5cd6470b3a1b84449590125f1191d069ab0a2"
  })
  ;