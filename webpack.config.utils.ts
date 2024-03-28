import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin, ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin';
import ZipPlugin from 'zip-webpack-plugin';

import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ExtReloader = require('webpack-ext-reloader-mv3');

const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

interface EnvironmentConfig {
  NODE_ENV: 'development' | 'profile' | 'production' | 'upload';
  OUTPUT_DIR: 'dev' | 'release' | 'prod' | 'src';
  TARGET: 'chrome' | 'firefox' | 'opera' | 'edge';
}

export const Directories: Record<string, EnvironmentConfig['OUTPUT_DIR']> = {
  DEV_DIR: 'dev',
  RELEASE_DIR: 'release',
  PROD_DIR: 'prod',
  SRC_DIR: 'src',
};

const EnvConfig: EnvironmentConfig = {
  OUTPUT_DIR:
    process.env.NODE_ENV === 'production'
      ? Directories.PROD_DIR
      : process.env.NODE_ENV === 'upload'
        ? Directories.RELEASE_DIR
        : Directories.DEV_DIR,
  ...(process.env.NODE_ENV
    ? { NODE_ENV: process.env.NODE_ENV as EnvironmentConfig['NODE_ENV'] }
    : { NODE_ENV: 'development' }),
  ...(process.env.TARGET
    ? { TARGET: process.env.TARGET as EnvironmentConfig['TARGET'] }
    : { TARGET: 'chrome' }),
};

export const getHTMLPlugins = (
  browserDir: string,
  outputDir = Directories.DEV_DIR,
  sourceDir = Directories.SRC_DIR,
) => [
  new HtmlWebpackPlugin({
    title: 'Popup',
    filename: path.resolve(__dirname, `${outputDir}/${browserDir}/popup/index.html`),
    template: path.resolve(__dirname, `${sourceDir}/app/popup/index.html`),
    chunks: ['popup'],
  }),
  new HtmlWebpackPlugin({
    title: 'Options',
    filename: path.resolve(__dirname, `${outputDir}/${browserDir}/options/index.html`),
    template: path.resolve(__dirname, `${sourceDir}/app/options/index.html`),
    chunks: ['options'],
  }),
];

export const getDefinePlugins = (config = {}) => [
  new DefinePlugin({
    'process.env': JSON.stringify({ ...config, ...(dotenv.parsed ?? {}) }),
  }),
];

export const getOutput = (browserDir: string, outputDir = Directories.DEV_DIR) => {
  return {
    path: path.resolve(process.cwd(), `${outputDir}/${browserDir}`),
    filename: '[name]/[name].js',
  };
};

export const getEntry = (sourceDir = Directories.SRC_DIR) => {
  return {
    popup: [path.resolve(__dirname, `${sourceDir}/app/popup/index.tsx`)],
    options: [path.resolve(__dirname, `${sourceDir}/app/options/options.tsx`)],
    content: [path.resolve(__dirname, `${sourceDir}/app/content/index.tsx`)],
    background: [path.resolve(__dirname, `${sourceDir}/app/background/index.ts`)],
  };
};

export const getCopyPlugins = (
  browserDir: string,
  outputDir = Directories.DEV_DIR,
  sourceDir = Directories.SRC_DIR,
) => {
  return [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${sourceDir}/shared/assets`),
          to: path.resolve(__dirname, `${outputDir}/${browserDir}/assets`),
        },
        {
          from: path.resolve(__dirname, `${sourceDir}/shared/_locales`),
          to: path.resolve(__dirname, `${outputDir}/${browserDir}/_locales`),
        },
      ],
    }),
  ];
};

export const getZipPlugins = (browserDir: string, outputDir = Directories.RELEASE_DIR) => {
  return [
    new ZipPlugin({
      path: path.resolve(process.cwd(), `${outputDir}/${browserDir}`),
      filename: browserDir,
      extension: 'zip',
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
      zipOptions: {
        forceZip64Format: false,
      },
    }),
  ];
};

export const getAnalyzerPlugins = () => {
  return [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  ];
};

export const getCleanWebpackPlugins = (...dirs: string[]) => {
  return [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        ...dirs?.map((dir) => path.join(process.cwd(), `${dir}`) ?? []),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
  ];
};

export const getResolves = () => {
  return {
    alias: {
      pages: path.resolve(__dirname, './src/pages/'),
      widgets: path.resolve(__dirname, './src/widgets/'),
      features: path.resolve(__dirname, './src/features/'),
      entities: path.resolve(__dirname, './src/entities/'),
      shared: path.resolve(__dirname, './src/shared/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  };
};

export const getExtensionManifestPlugins = () => {
  spawnSync('esno', ['./src/manifest.ts'], { stdio: 'inherit' });
  const manifest = require('./src/manifest.json');

  return [
    new WebpackExtensionManifestPlugin({
      config: {
        base: manifest as unknown as {
          [k: string]: unknown;
        },
      },
    }),
  ];
};

export const eslintOptions = {
  fix: true,
};

export const getEslintPlugins = (options = eslintOptions) => {
  return [new ESLintPlugin(options)];
};

export const getProgressPlugins = () => {
  return [new ProgressPlugin()];
};

export const config = EnvConfig;

export const getExtensionReloaderPlugins = () => {
  return [
    new ExtReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: ['content'],
        background: 'background',
        extensionPage: ['popup', 'options'],
      },
    }),
  ];
};
