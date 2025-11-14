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
    home: "Home",
    contactUs: "Contact Us",
    notFound: "404 - Página no encontrada",
  },
  breadcrumb: {
    vehicleList: "Buscar vehículos",
  },
  button: {
    login: "Iniciar sesión",
    requestDemo: "Request Demo",
    howWorks: "How it Works",
    getStarted: "Get started",
    submit: "Submit form",
  },
  home: {
    main: {
      title: "Smarter Health. Better Futures.",
      text: "Continuous health monitoring that empowers individuals, strengthens organizations, and improves population health.",
    },
    welcome: {
      title: "Welcome to Vitapp",
      text: "Most health issues are discovered too late, leading to preventable illness, absenteeism, and high costs. Vitapp prevents this by catching risks early and guiding people (and organizations) toward timely action.",
    },
    works: {
      title: "How It Works",
      text: "We provide proactive, continuous, and scalable health management.",
      steps: {
        1: {
          name: "step 1",
          title: "Comprehensive Health Assessmen",
          text: "Quick individual surveys enriched with health data, lab results and medical records provide a complete view of each individual’s health.",
        },
        2: {
          name: "step 2",
          title: "Advanced Risk Detection",
          text: "Vitapp’s proprietary algorithm powered by AI analyzes more than 500 health risk segments, continuously tracking changes and improvements.",
        },
        3: {
          name: "step 3",
          title: "Continuous Guidance & Reporting",
          text: "Individuals receive personalized alerts and recommendations, while doctors access detailed digital reports for better clinical decisions.",
        },
        4: {
          name: "step 4",
          title: "Organizational & Population Insights",
          text: "At scale, Vitapp provides dashboards for organizations, hospitals, and governments — helping track population health trends and outcomes.",
        },
      },
    },
    why: {
      title: "Why Vitapp is Different",
      text: "We offer a comprehensive range of advanced features designed to streamline your processes and boost efficiency. From intuitive user interface to seamless integration, our software provides everything you need to optimize your workflow and achieve exceptional results.",
      checks: {
        1: "500+ health risk segments analyzed.",
        2: "500,000+ individuals with personalized risk profiles.",
        3: "Real-time dashboards for medical staff.",
        4: "Risk & intervention reports for organizations.",
      },
    },
    traditional: {
      title: "Traditional Health vs. Vitapp",
      table: {
        timing: "Timing",
        monitoring: "Monitoring",
        scope: "Scope",
        personalization: "Personalization",
        accessibility: "Accessibility",
        stakeholders: "Stakeholders",
        impact: "Impact",
        vitapp: {
          title: "Vitapp",
          1: "Early detection",
          2: "Continuous Tracking",
          3: "Integrated data & lifestyle",
          4: "AI-driven adaptive",
          5: "Multi-channel access",
          6: "Scalable acroos organizations",
          7: "Population level",
        },
        traditional: {
          title: "Traditional Health",
          1: "Late detection",
          2: "One-time checkups",
          3: "Limited to clinic visits",
          4: "Generic",
          5: "Local only",
          6: "Individual only",
          7: "Isolated",
        },
      },
      note: "Not reactive. Not fragmented. Vitapp is continuous, proactive, and scalable.",
    },
    innerSection:
      "We move beyond one-time checkups and fragmented care. Vitapp provides proactive, continuous, and scalable health management.",
    map: {
      title: "Early. Continuous. Actionable.",
      text: "Vitapp helps people take control of their health by identifying risks early and guiding timely interventions.",
      1: "Not a one-time check: Continuous monitoring of key health indicators.",
      2: "Personalized insights that empower individuals to act.",
      3: "Small steps at the personal level scale into healthier families, organizations, and populations.",
    },
    benefits: {
      title: "Benefits At Every Level",
      text: "Explore our comprehensive selection of services that cater to a variety of needs, ensuring complete customer satisfaction.",
      1: {
        title: "Individuals",
        text: "Take control of your health journey with personalized, continuous insights.",
      },
      2: {
        title: "Organizations",
        text: "Reduce absenteeism, improve productivity, and lower healthcare costs.",
      },
      3: {
        title: "Healthcare Providers",
        text: "Support preventative care, improve outcomes, and reduce readmissions.",
      },
      4: {
        title: "Governments & Systems",
        text: "Strengthen public health strategies and ease pressure on healthcare systems.",
      },
    },
    custom: {
      title: "Customized Tools for Every Stakeholder",
      text: "Vitapp adapts to meet the unique needs of individuals, organizations, healthcare providers, and governments.",
      1: {
        title: "Individuals",
        text: "Personalized risk insights, continuous alerts, and lifestyle recommendations to stay on track.",
      },
      2: {
        title: "Companies & Organizations",
        text: "Analytics dashboards, team-wide health insights, and risk reduction strategies.",
      },
      3: {
        title: "Healthcare Providers",
        text: "Detailed digital reports to support early diagnosis, treatment plans, and preventative care.",
      },
      4: {
        title: "Governments & Systems",
        text: "Population-level dashboards to monitor health trends, interventions, and policy impact.",
      },
    },
    smart: {
      title: "Smarter Health. Better Futures.",
      text: "Vitapp turns early action into lasting health — for people, organizations, and entire communities.",
    },
  },
  contact: {
    main: {
      title: "Request A Demo",
      text: "Use the form below, Whatsapp or email. We’re here to assist you and answer your queries.",
    },
    form: {
      title: "Contact Us",
      colombia: "Colombia",
      fields: {
        title: "Form",
        text: "Use the form below to request a demo. We’ll get back to you as soon as possible.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        message: "Message",
      },
    },
  },
};
