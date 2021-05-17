//@ts-check
const buildApps = (port, prefix, models) => (mode = 'dev') => {
  const apps = [];
  for (const key in models) {
    apps.push({
      ...models[key],
      MODEL: key
    });
  }
  if (mode === 'dev') {
    return [
      {
        name: `@regulus${prefix}`,
        script: './node_modules/.bin/tsnd',
        args: '--respawn --files src/server.ts',
        cwd: 'api',
        namespace: 'api',
        env: {
          NODE_ENV: 'development',
          PORT: port,
          ROUTE_PREFIX: prefix,
          MODELS: apps
        }
      }
    ];
  }

  return [
    {
      name: `@regulus${prefix}`,
      script: 'dist/server.js',
      cwd: './api/',
      namespace: 'api',
      env: {
        NODE_ENV: 'development',
        PORT: port,
        ROUTE_PREFIX: prefix,
        MODELS: apps
      },
      env_proudction: {
        NODE_ENV: 'production',
        PORT: port,
        ROUTE_PREFIX: prefix,
        MODELS: apps
      }
    }
  ];
};
//
const banks = {
  codes: {
    BkBanks: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    BkCostCenters: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    BkMovementTypes: {
      PORT: 3,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    BkMovementDocuments: {
      PORT: 4,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    BkOrigins: {
      PORT: 5,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    BkPayMethods: {
      PORT: 6,
      PK: 'code',
      PK_TYPE: 'String'
    }
  },
  models: {
    BkAccounts: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    BankMovements: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    CashMovements: {
      PORT: 3,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  },
  views: {
    BkAccountBalances: {
      PORT: 0,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  }
};
const warehouses = {
  models: {
    Articles: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ArticleGroups: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ArticlePrices: {
      PORT: 3,
      PK: 'code',
      PK_TYPE: 'String'
    },
    ArticleSubgroups: {
      PORT: 3,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    Warehouses: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    WhAdditionalCosts: {
      PORT: 5,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    WhLots: {
      PORT: 6,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    WhPhysicalTakes: {
      PORT: 7,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    WhMovements: {
      PORT: 8,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  },
  codes: {
    WhMeasurementUnits: {
      PORT: 1,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    WhOrigins: {
      PORT: 2,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    WhMovementTypes: {
      PORT: 3,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    WhTaxes: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    WhTypeTaxes: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  }
};
const apps = {
  AppPermissions: {
    PORT: 1,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  AppAccountingCodes: {
    PORT: 2,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  AppExtraFields: {
    PORT: 3,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  AppSequences: {
    PORT: 4,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  AppSettings: {
    PORT: 5,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  SChanges: {
    PORT: 6,
    PK: 'id',
    PK_TYPE: 'BigInt'
  },
  IChanges: {
    PORT: 7,
    PK: 'id',
    PK_TYPE: 'BigInt'
  }
};
const _public = {
  Tables: {
    PORT: 1,
    PK: 'id',
    PK_TYPE: 'String'
  }
};
//
const sales = {
  codes: {
    SlSellers: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlTypeCredits: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlTypeCreditDocs: {
      PORT: 3,
      PK: 'code',
      PK_TYPE: 'String',
      NAMESPACE: 'code-name'
    },
    SlServices: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlZones: {
      PORT: 5,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    SlCreditCards: {
      PORT: 6,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    SlTransportations: {
      PORT: 7,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    SlPlates: {
      PORT: 8,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    }
  },
  models: {
    Customers: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    CustomerGroups: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    Invoices: {
      PORT: 3,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlOrders: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlPreOrders: {
      PORT: 5,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    SlExpenses: {
      PORT: 6,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  }
};
//
const shoppings = {
  codes: {
    ShRentRetentions: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    ShTaxtRetentions: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ShTransactionTypes: {
      PORT: 3,
      PK: 'code',
      PK_TYPE: 'String'
    },
    ShTributaryCreditTypes: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ShVoucherTypes: {
      PORT: 5,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    ShPaymentVoucherTypes: {
      PORT: 6,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    }
  },
  models: {
    Providers: {
      PORT: 1,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ProviderGroups: {
      PORT: 2,
      PK: 'id',
      PK_TYPE: 'BigInt',
      NAMESPACE: 'id-code-name'
    },
    Shoppings: {
      PORT: 3,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ShBuyOrders: {
      PORT: 4,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ShIncomes: {
      PORT: 5,
      PK: 'id',
      PK_TYPE: 'BigInt'
    },
    ShTransferences: {
      PORT: 6,
      PK: 'id',
      PK_TYPE: 'BigInt'
    }
  }
};

const accounting = {
  codes: {},
  models: {
    AccountPlanCodes: {
      PORT: 5,
      PK: 'path',
      PK_TYPE: 'String'
    }
  }
};
//
const publicModels = buildApps(11010, '/api/public', _public);
const appsModels = buildApps(11050, '/api/apps', apps);
// const codesModels = buildApps(11080, '/api/codes', {
//   ...sales.codes,
//   ...shoppings.codes,
// });

const accountingModels = buildApps(11100, '/api/accounting', accounting.models);
const banksModels = buildApps(11200, '/api/banks', {
  ...banks.models,
  ...banks.codes,
  ...banks.views
});
const warehouseModels = buildApps(11300, '/api/warehouses', {
  ...warehouses.models,
  ...warehouses.codes
});
const salesModels = buildApps(11400, '/api/sales', {
  ...sales.models,
  ...sales.codes
});
const shoppingsModels = buildApps(11500, '/api/shoppings', {
  ...shoppings.models,
  ...shoppings.codes
});
//
const APPS = (mode = 'dev') => {
  const items = [
    // ...codesModels,
    accountingModels,
    publicModels,
    appsModels,
    banksModels,
    warehouseModels,
    salesModels,
    shoppingsModels
  ];
  const list = items.map((v) => v(mode)).flat();
  return list;
  // return Array.prototype.flat
};

module.exports = { apps: APPS };
