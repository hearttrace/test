// npm install babel-loader @babel/core @babel/runtime -D
// npm install @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D 

module.exports = {
  presets: ['env', 'react'],
  plugins: ['transform-runtime', 'proposal-class-properties']
}
