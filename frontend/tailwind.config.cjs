/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: {50:'#f1e9ff',100:'#e3d3ff',200:'#c7a8ff',300:'#ac7cff',400:'#9051ff',500:'#7a5af8',600:'#6a47e0',700:'#5a39c3',800:'#4a2fa3',900:'#3b2683'} },
      boxShadow: { premium: '0 10px 30px rgba(122,90,248,0.35)' },
      backgroundImage: { 'hero-gradient': 'radial-gradient(1200px 600px at 50% -10%, rgba(122,90,248,.45), rgba(214,110,253,.35) 35%, transparent 70%), radial-gradient(900px 400px at 20% 120%, rgba(214,110,253,.25), transparent 60%), radial-gradient(900px 400px at 80% 120%, rgba(122,90,248,.25), transparent 60%)' }
    },
  },
  plugins: [],
}
