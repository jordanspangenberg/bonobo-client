export default {
  palette: {
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ff1744',
      light: '#ff616f',
      dark: '#000051',
      contrastText: '#000000'
    }
  },
  styles: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '0px auto 0px auto',
      height: '120px'
    },
    pageTitle: {
      margin: '0px auto 0px auto'
    },
    textField: {
      margin: '0px auto 0px auto'
    },
    button: {
      marginTop: 20,
      marginBottom: 5,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    },
    invisibleBreak: {
      border: "none",
      margin: 4,
    },
    visibleBreak: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0,1)",
      marginBottom: "20px"
    },
  }
};
