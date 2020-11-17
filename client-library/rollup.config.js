import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";


const bannerMsg = `/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */`;

const terserConfig = {
    compress:
    {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
    }
}

const config = {
    cjs:
    {
        input: "src/Client.ts",
        output:
        {
            file: "lib/client-library.js",
            format: "cjs",
            indent: false,
            banner: bannerMsg
        },
        plugins:
        [
            nodeResolve(),
            typescript( { useTsconfigDeclarationDir: true } ),
            babel( { babelHelpers: "bundled" } )
        ]
    },
    es:
    {
        input: "src/Client.ts",
        output:
        {
            file: "es/client-library.js",
            format: "es",
            indent: false,
            sourcemap: true,
            banner: bannerMsg
        },
        plugins:
        [
            nodeResolve(),
            typescript( { tsconfigOverride: { compilerOptions: { declaration: false, sourceMap: true } } } ),
            babel( { babelHelpers: "bundled" } )
        ]
    },
    esModule:
    {
        input: "src/Client.ts",
        output:
        {
            file: "es/client-library.mjs",
            format: "es",
            indent: false,
            banner: bannerMsg
        },
        plugins:
        [
            nodeResolve(),
            typescript( { tsconfigOverride: { compilerOptions: { declaration: false } } } ),
            babel( { babelHelpers: "bundled" } ),
            terser( terserConfig )
        ]
    },
    umdDev:
    {
        input: "src/Client.ts",
        output:
        {
            file: "dist/client-library.js",
            format: "umd",
            name: "Client",
            indent: false,
            sourcemap: true,
            banner: bannerMsg
        },
        plugins:
        [
            nodeResolve(),
            typescript( { tsconfigOverride: { compilerOptions: { declaration: false, sourceMap: true } } } ),
            babel( { babelHelpers: "bundled" } )
        ]
    },
    umdProd:
    {
        input: "src/Client.ts",
        output:
        {
            file: "dist/client-library.min.js",
            format: "umd",
            name: "Client",
            indent: false,
            banner: bannerMsg
        },
        plugins:
        [
            nodeResolve(),
            typescript( { tsconfigOverride: { compilerOptions: { declaration: false } } } ),
            babel( { babelHelpers: "bundled" } ),
            terser( terserConfig )
        ]
    }
}

const tasks = [
    config.cjs,
    config.es,
    config.esModule,
    config.umdDev,
    config.umdProd
]


export default tasks;
