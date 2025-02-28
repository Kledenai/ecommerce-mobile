module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@interfaces': './src/interfaces',
          '@helpers': './src/utils/helpers',
          '@services': './src/services',
          '@screens': './src/screens',
          '@routes': './src/routes',
          '@assets': './src/assets',
          '@stores': './src/stores',
          '@cache': './src/cache',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@src': './src',
        },
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
      },
    ],
  ],
};
