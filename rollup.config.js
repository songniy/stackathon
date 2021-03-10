import replace from '@rollup/plugin-replace'

export default {
  mode: 'development',
  input: 'client/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }
    })
  ]
}
