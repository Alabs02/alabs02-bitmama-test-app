const fs = require('fs');
const path = require('path');
const cracoAlias = require('craco-alias');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const sassResourcesLoader = require('craco-sass-resources-loader');

const {
    addAfterLoader,
    removeLoaders,
    loaderByName,
    getLoaders,
    throwUnexpectedConfigError,
} = require('@craco/craco');

const throwError = (message) =>
    throwUnexpectedConfigError({
        packageName: 'craco',
        githubRepo: 'gsoft-inc/craco',
        message,
        githubIssueQuery: 'webpack',
    });

// APP DIRECTORY
const appDirectory = fs.realpathSync(process.cwd());

// GET ABSOLUTE PATH OF FILE WITHIN APP
const resolveAppPath = (relativePath) =>
    path.resolve(appDirectory, relativePath);

// IS DEV CHECK
// const isDev = process.env.NODE_ENV === 'development';

// PERFORMANCE HINT
// const performanceHint = isDev ? { hints: 'warning' } : {};

module.exports = {
    webpack: {
        alias: {
            '@': resolveAppPath('src'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
        },
        cache: {
            type: 'filesystem',
            allowCollectingMemory: true,
        },
        module: {
            rules: [{
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    include: resolveAppPath('src'),
                    use: [
                        'babel-loader',
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                presets: ['@babel/preset-env', '@babel/preset-react'],
                            },
                        },
                        {
                            loader: 'eslint-loader',
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: ['file-loader'],
                },
            ],
        },
        configure: (webpackConfig, { paths }) => {
            const { hasFoundAny, matches } = getLoaders(
                webpackConfig,
                loaderByName('babel-loader')
            );
            if (!hasFoundAny) throwError('failed to find babel-loader');

            console.log('removing babel-loader');
            const { hasRemovedAny, removedCount } = removeLoaders(
                webpackConfig,
                loaderByName('babel-loader')
            );
            if (!hasRemovedAny) throwError('no babel-loader to remove');
            if (removedCount !== 2)
                throwError('had expected to remove 2 babel loader instances');

            console.log('adding ts-loader');

            const tsLoader = {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: paths.appSrc,
                loader: require.resolve('ts-loader'),
                options: { transpileOnly: true },
            };

            const { isAdded: tsLoaderIsAdded } = addAfterLoader(
                webpackConfig,
                loaderByName('url-loader'),
                tsLoader
            );
            if (!tsLoaderIsAdded) throwError('failed to add ts-loader');
            console.log('added ts-loader');

            console.log('adding non-application JS babel-loader back');
            const { isAdded: babelLoaderIsAdded } = addAfterLoader(
                webpackConfig,
                loaderByName('ts-loader'),
                matches[1].loader // babel-loader
            );
            if (!babelLoaderIsAdded)
                throwError('failed to add back babel-loader for non-application JS');
            console.log('added non-application JS babel-loader back');

            return webpackConfig;
        },
    },
    plugins: [{
            plugin: cracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                    './src/assets/scss/_colors.scss',
                    './src/assets/scss/_utilities.scss',
                    './src/assets/scss/_mixins.scss',
                    './src/assets/scss/_breakpoints.scss'
                ],
            },
        },
    ],
    jest: {
        // configure: {
        //     preset: 'ts-jest',
        //     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        //         prefix: '<rootDir>/src/',
        //     }),
        // },
    },
};