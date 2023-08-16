# Commands

```
stepzen init
```

```
stepzen import curl https://ups-clone-fl-default-rtdb.firebaseio.com/orders.json --query-type Order --query-name getOrders --name order
```

```
stepzen start --dashboard=local
```

## To use Apollo Client
Create a `metro.config.js` and put:
```
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push(
  'cjs'
);

module.exports = config;
```