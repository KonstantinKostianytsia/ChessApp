module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          components: './src/components',
          screens: './src/screens',
          navigation: './src/navigation',
          models: './src/models',
          styles: './src/styles',
          helpers: './src/helpers',
        },
      },
    ],
  ],
};
