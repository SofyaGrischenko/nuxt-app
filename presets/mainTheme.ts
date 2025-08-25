import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const mainTheme = definePreset(Aura, {
  semantic: {
    // surface: {
    //   0: '#363636',
    //   50: '#e9e9e9',
    //   100: '#d3d3d3',
    //   200: '#bdbdbd',
    //   300: '#a8a8a8',
    //   400: '#949494',
    //   500: '#808080',
    //   600: '#6d6d6d',
    //   700: '#5a5a5a',
    //   800: '#474747',
    //   900: '#ffffff',
    // },
    primary: {
      0: '#ffffff',
      50: '#ff6565',
      100: '#e62929',
      200: '#d72728',
      300: '#c92626',
      400: '#bb2525',
      500: '{indigo.500}',
      600: '#8f1f1f',
      700: '#7f1d1d',
      800: '#651d1d',
      900: '#550606',
    },
    secondary: {
      // 0: '#363636',
      // 50: '#e9e9e9',
      // 100: '#d3d3d3',
      // 200: '#bdbdbd',
      // 300: '#a8a8a8',
      // 400: '#949494',
      // 500: '#808080',
      // 600: '#6d6d6d',
      // 700: '#5a5a5a',
      // 800: '#474747',
      // 900: '#ffffff',
      // 950: '#000000',
    },

    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#e9e9e9',
          100: '#d3d3d3',
          200: '#bdbdbd',
          300: '#a8a8a8',
          400: '#949494',
          500: '#808080',
          600: '#6d6d6d',
          700: '#5a5a5a',
          800: '#474747',
          900: '#ffffff',
          950: '#000000',
        },
      },
    },
  },

  components: {
    button: {
      root: {
        borderRadius: '50px',
        primary: {
          background: '{primary.400}',
          hoverBackground: '{primary.300}',
          activeBackground: '{primary.200}',
          borderColor: '{primary.400}',
          hoverBorderColor: '{primary.300}',
          activeBorderColor: '{primary.200}',

          color: '{secondary.900}',
          hoverColor: '{secondary.900}',
          activeColor: '{secondary.900}',

          focusRing: {
            color: '#ff6565',
            shadow: '0 0 0 0.2rem rgba(255,101,101,0.5)',
          },
        },
      },

      text: {
        primary: {
          color: '{primary.500}',
          hoverBackground: 'transparent',
          activeBackground: 'transparent',
        },
      },
    },

    menu: {
      root: {
        background: '#363636',
      },

      item: {
        focusBackground: '{primary.400}',
      },
    },

    inputtext: {
      root: {
        background: 'transparent',
        focusBorderColor: '{primary.400}',
      },
    },

    password: {},

    datatable: {
      headerCell: {
        hoverBackground: 'transparent',
        background: 'transparent',
        borderColor: '#5b5b5b',
        color: '#d0d0d0',
      },
      row: {
        background: 'transparent',
        color: '#d0d0d0',
      },
      bodyCell: {
        borderColor: '#5b5b5b',
        padding: '1.5rem',
      },
    },

    dialog: {
      root: {
        background: '#363636',
      },
      header: {
        padding: '0.75rem',
      },
      content: {
        padding: '0.75rem',
      },
    },

    select: {
      root: {
        background: 'transparent',
        focusBorderColor: '{surface.700}',
      },
      overlay: {
        background: '#353535',
      },
      option: {
        selectedFocusBackground: '#ba2525',
        selectedBackground: '#ba2525',
        focusBackground: '#626262',
      },

      optionGroup: {
        background: 'transparent',
      },
    },

    floatlabel: {
      root: {
        color: '{surface.400}',
        focusColor: '{primary.400}',
      },

      on: {
        borderRadius: '4px',
        active: {
          background: '#353535',
        },
      },
    },
  },
});

export default mainTheme;
