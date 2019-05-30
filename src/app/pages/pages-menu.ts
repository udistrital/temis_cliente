import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'Gestión de Información',
    icon: 'nb-compose',
    link: '/pages/gestion_informacion',
    key: 'gestion_informacion',
    children: [
      {
        title: 'Pensionados',
        link: '/pages/gestion_informacion/pensionado-list',
        key: 'pensionado'
      }
    ]
  },
  {
    title: 'Gestión de Datos',
    icon: 'nb-compose',
    link: '/pages/gestion_datos',
    key: 'gestion_datos',
    children: [
      {
        title: 'Organizacion',
        link: '/pages/gestion_datos/organizacion-list',
        key: 'organizacion'
      },
      {
        title: 'Indice Precio Consumidor',
        link: '/pages/gestion_datos/indice_precio_consumo-list',
        key: 'indice_precio_consumidor'
      },
      {
        title: 'DTF',
        link: '/pages/gestion_datos/dtf-list',
        key: 'dtf'
      },
      {
        title: 'Salario Minimo Legal',
        link: '/pages/gestion_datos/salario_minimo_legal-list',
        key: 'salario_minimo_legal'
      }
    ]
  }
]

/**
 * 
 * ,
  {
    title: 'Inscripcion',
    icon: 'nb-compose',
    link: '/pages/inscripcion',
    key: 'inscripcion',
    children: [
      {
        title: 'Posgrado',
        link: '/pages/inscripcion/posgrado',
        key: 'inscripcion_posgrado',
      },
    ],
  },
  {
    title: 'Admision',
    icon: 'nb-compose',
    link: '/pages/admision',
    key: 'admision',
    children: [
      {
        title: 'Lista Admision',
        link: '/pages/admision/list-admision',
        key: 'admision',
      },
    ],
  },
  {
    title: 'Gestión de Datos',
    icon: 'nb-compose',
    link: '/pages/gestion_datos',
    key: 'gestion_datos',
    children: [
      {
        title: 'Entidades',
        link: 'pages/entidades',
        key: 'entidades'
      }
    ]
  },
 */