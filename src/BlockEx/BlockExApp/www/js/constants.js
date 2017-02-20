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

    nodeURL: "http://yourhost:1999",
    clientToken: ""
  })
  ;