export const palette = {
  LightGrey: "#e7ecf7",
  Grey: "#b1b1b1",
  CoolGray: "#758796",
  Purple: "#7127e9",
  ElectricBlue: "#00AEE9",
  ElectricBlueLight: "#e8f3ff",
  MintGreen: "#69FABD",
  MidnightBlue: "#1B295E",
};

export const theme = {
  global: {
    focus: {
      border: {
        color: "transparent",
      },
    },
    colors: {
      brand: palette.Purple,
      background: 'white',
      backgroundBack: '#f3f3f3',
      border: palette.LightGrey,
      majorText: palette.MidnightBlue,
      minorText: palette.CoolGray,
      iconMain: palette.ElectricBlue,
      tableRow: palette.ElectricBlueLight,
      mintGreen: palette.MintGreen,

    },
    palette,
    select: {
      clear: {
        color: 'brand',
      },
    },
    font: {
      // family: 'Nunito',
      family: "Fira Sans",
      size: "14px",
      height: "20px",
    },
  },
  anchor: {
    textDecoration: "none",
    hover: {
      textDecoration: "none",
    },
  },
  button: {
    // backgroundColor: "transparent",
    color: "brand",
    borderColor: 'brand'
  },
  dataTable: {
    body: {
      extend: (props: any) => `
        tr:first-child {
          th, td {
            border: none;
          }
        }
        
        tr {
          th, td {
            padding: 16px 12px;
          }
          td:last-child {
            text-align: right;
          }
        }
        
        tr:nth-child(even) {
          th, td {
             background-color: ${props.theme.global.colors.tableRow};
          }
        }
      `,
    },
  },
};

export const darkTheme = {
  ...theme,
  global: {
    focus: {
      border: {
        color: "transparent",
      },
    },
    colors: {
      brand: palette.MintGreen,
      background: palette.MidnightBlue,
      backgroundBack: '#030921',
      border: '#375873',
      majorText: palette.MidnightBlue,
      minorText: '#5f98c7',
      iconMain: palette.ElectricBlue,
      tableRow: '#122852',
      mintGreen: palette.MintGreen,
    },
    palette,
    font: {
      // family: 'Nunito',
      family: "Fira Sans",
      size: "14px",
      height: "20px",
    },
  },
};
