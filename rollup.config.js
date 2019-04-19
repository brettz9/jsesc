/* eslint-env node */

// NOTE:
// See rollup-config.config.js instead for building the main (configurable)
//   user entrance file

import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';

function getRollupObject ({minifying, format = 'umd'} = {}) {
  const nonMinified = {
    input: 'editor/svg-editor.js',
    output: {
      format,
      sourcemap: minifying,
      file: `dist/index-${format}${minifying ? '.min' : ''}.js`,
      name: 'svgEditor'
    },
    plugins: [
      babel({
        plugins: ['transform-object-rest-spread']
      })
    ]
  };
  if (minifying) {
    nonMinified.plugins.push(uglify(null, minify));
  }
  return nonMinified;
}

export default [
  getRollupObject(),
  getRollupObject({minifying: true}),
  getRollupObject({minifying: true, format: 'es'}),
  getRollupObject({minifying: false, format: 'es'}),
];
