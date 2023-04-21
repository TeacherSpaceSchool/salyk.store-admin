const withPWA = require('next-pwa')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { createSecureHeaders } = require('next-secure-headers');
module.exports =
    withPWA({
        pwa: {
            disable: !!process.env.dev,
            dest: 'public',
            publicExcludes: ['!sw-push-listener.js'],
            importScripts: ['/sw-push-listener.js'],
            runtimeCaching: [
                {
                    urlPattern: /^http?.*\/images\/.*/,
                    handler: 'NetworkOnly',
                },
                /*{
                    urlPattern: /^https?.*\.!(png|gif|jpg|jpeg|svg)/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'cache',
                        expiration: {
                            maxAgeSeconds: 5*24*60*60
                        }
                    },
                },*/
                {
                    urlPattern: /^https?.*/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'cache',
                        expiration: {
                            maxAgeSeconds: 5*24*60*60
                        }
                    },
                }
            ]
        },
        ...(process.env.URL!=='localhost'?{
            onDemandEntries : {
                maxInactiveAge :  1000*60*60*24*10,
                pagesBufferLength: 2,
            }
        }:{})
        ,
        env: {
            URL: process.env.URL
        },
        webpack: (config) => {
            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();
                if (entries['main.js']) {
                    entries['main.js'].unshift('./src/polyfills.js');
                }
                return entries;
            };
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack']
            });
            config.module.rules.push({
                test: /\.wasm(.bin)?$/,
                use: ['wasm-loader']
            })
            config.module.rules.push({
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                },
            })
            config.plugins.push(new CopyWebpackPlugin(['./public/sw-push-listener.js']));
            return config
        },
        exportPathMap: function() {
            return {
                '/': { page: '/' },
            };
        },
        async headers() {
            return [{ source: '/(.*)', headers: createSecureHeaders() }];
        },
    })
