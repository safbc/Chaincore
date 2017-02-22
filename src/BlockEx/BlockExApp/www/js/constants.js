angular.module('app.constants', ['ionic'])


  .constant('svcURI', {
    // API URL
    BaseURL: "http://41.76.226.170:3000/BlockEx/0.0.1",

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

  .constant('NODE_SETTINGS',
  {
    // Specify the URL to access your own Chain Node
    nodeURL: "http://localhost:1999",
    // Your client access creditials to access this node
    clientToken: ""
  })
  ;