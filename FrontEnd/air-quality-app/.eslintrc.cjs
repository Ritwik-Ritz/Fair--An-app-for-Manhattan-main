module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react"],
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
