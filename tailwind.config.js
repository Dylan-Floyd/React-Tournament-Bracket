module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '5px': '5px',
        '6px': '6px'
      },
      gridTemplateColumns: {
        'gap-2': '1fr 16fr 2fr 16fr 1fr',
        'gap-3': '1fr 16fr 2fr 16fr 2fr 16fr 1fr',
        'gap-4': '1fr 16fr 2fr 16fr 2fr 16fr 2fr 16fr 1fr',
        'gap-5': '1fr 16fr 2fr 16fr 2fr 16fr 2fr 16fr 2fr 16fr 1fr',
      },
      gridTemplateRows: {
        none: 'none',
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        21: 'repeat(21, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))',
        25: 'repeat(25, minmax(0, 1fr))',
        26: 'repeat(26, minmax(0, 1fr))',
        27: 'repeat(27, minmax(0, 1fr))',
        28: 'repeat(28, minmax(0, 1fr))',
        29: 'repeat(29, minmax(0, 1fr))',
      },
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
      }
    },
  },
  plugins: [],
}