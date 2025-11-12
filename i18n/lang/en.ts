export default {
  application: "Stack Front",
  loading: "Cargando, por favor espere...",
  rol: {
    admin: "Administrador",
    ops: "Operador",
  },
  title: {
    welcome: "Bienvenido",
    login: "Iniciar sesión",
    forgotPassword: "Recuperar contraseña",
    validateCode: "Recuperar contraseña",
    changePassword: "Restablecer contraseña",
    logout: "¿Estás seguro de querer cerrar la sesión?",
  },


  rule: {
    form: "Por favor revisa la información",
    image: "Debe seleccionar una imagen",
    validation: {
      require: "El dato es requerido para continuar",
      requireEmail: "El correo es requerido para continuar",
      value: {
        min: "Debe ser mayor o igual a {data}",
        max: "Debe ser inferior o igual a {data}",
      },
      length: {
        min: "Debe contener al menos {data} carácteres",
        max: "No puede contener más de {data} carácteres",
      },
      email: "Debe ser una dirección de correo válida",
      password: {
        valid: "Mín. 8 caracteres alfanuméricos: 1 mayúscula, 1 minúscula",
        confirm: "Las contraseñas deben coincidir",
      },
      number: "El dato es solo numérico",
    },
  },
  store: {
    apiServices: {
      sessionExpired:
        "Su sesión ha expirado, por favor inicie sesión nuevamente",
      loginRequired: "Debe ingresar sus credenciales para continuar",
      timeOut:
        "Ha tardado demasiado en responder. Intente nuevamente más tarde",
      notFound:
        "No se encontró la url solicitada. Intente nuevamente más tarde",
      generalError:
        "Ocurrió un error en el servidor. Intente nuevamente más tarde",
    },
  },
  text: {
    login: "Por favor digita tu correo electrónico",
  },
  table: {
    empty: {
      title: "Lo sentimos",
      message: "Lamentablemente no tenemos datos que mostrar.",
    },
    loading: "Cargando... Por favor aguarde un momento",
    state: {
      title: "Estado",
      active: "Activo",
      inactive: "Inactivo",
    },
    admin: {
      name: "Nombre y correo",
      role: "Rol",
    },
    enums: {
      role: {
        administrative: "Administrativo",
        superadmin: "Super Administrador",
        operative: "Operativo",
      },
      status: {
        active: "Activo",
        inactive: "Inactivo",
      },
    },
    filters: {
      all: "Todos",
      search: "Buscar",
    },
  },
  paginator: {
    display: "Mostrar",
    entries: "Registros",
    page: "Página",
    from: "de",
    previousPage: "Anterior",
    nextPage: "Siguiente",
  },
  menu: {
    logout: "Cerrar sesión",
    home: 'Home',
    contactUs: 'Contact Us',
    notFound: "404 - Página no encontrada",
  },
  breadcrumb: {
    vehicleList: "Buscar vehículos",
  },
    button: {
    login: "Iniciar sesión",
    requestDemo: "Request Demo",
    howWorks: "How it Works",
  },
  home: {
    main: {
      title: 'Smarter Health. Better Futures.',
      text: 'Continuous health monitoring that empowers individuals, strengthens organizations, and improves population health.',
    },
    welcome: {
      title: "Welcome to Vitapp",
      text: 'Most health issues are discovered too late, leading to preventable illness, absenteeism, and high costs. Vitapp prevents this by catching risks early and guiding people (and organizations) toward timely action.'
    },
    works: {
      title: 'How It Works',
      text: 'We provide proactive, continuous, and scalable health management.',
      steps: {
        1:{
          name: 'step 1',
          title: 'Comprehensive Health Assessmen',
          text: 'Quick individual surveys enriched with health data, lab results and medical records provide a complete view of each individual’s health.',

        },
        2: {
          name: 'step 2',
          title: 'Advanced Risk Detection',
          text: ''
        }
      }
    }
  }
};
