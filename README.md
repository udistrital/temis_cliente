
# :ledger: Admin - TEMIS
Este repositorio contiene los módulos de gestión de datos y gestión de información pertenecientes al sistema de cuotas partes. 

En este repositorio se define la tecnología que se renderizara del lado del cliente.

Como componentes básicos cuenta con:

 * **ngxAdmin** ~ [link_documentación](https://github.com/akveo/ngx-admin)
 * **Angular 6.0**
 * **Bootstrap 4**
 * **Nebular Components**

<summary><h2> 🛠️ Configuracion del proyecto</h2></summary>
<details>

  - Clonar el proyecto del repositorio de git, configurar el repositorio remoto (github), e instalarlo localmente con 
  
  ```shell 
      npm install
  ```
  - Correr el proyecto para verificar que las dependencias estan correctamente instaladas

  ```shell 
      ng serve
  ```

</details>

<summary><h2> :pick: Dependencias Utilizadas</h2></summary>
<details>

    Dependencias incluidas:

  - **Nebular:** (https://github.com/akveo/nebular)
  - **Angular 6**
  - **Bootstrap 4** 

    Dependencias:

  - **npm > 6.0** 
  - **nvm > 8.0** 

  ### API CRUD
  - **temis_monto_aceptado_crud:** este [api](https://github.com/udistrital/temis_monto_aceptado_crud) se encarga de gestionar las tablas donde se registra el monto aceptado según la cuota parte otorgada a la organización y el registro de los pagos que se realizan sobre el monto aceptado.

  ### Herramientas usadas
  
  - **ngxGenerator:** este [generador](https://github.com/BOTOOM/ngxGenerator) se encarga de crear una un proyecto con las caracteristicas descritas en el repositorio.

  - **ngx-admin:** este [template](https://github.com/akveo/ngx-admin) es el que utiliza ngxGenerator, esta basado en Angular 6+, Bootstrap 4 y <a href="https://github.com/akveo/nebular">Nebular</a>.

  ### Variables de entorno
  ```typescript 
      export const Config = {
      LOCAL: {
        NUXEO: {
            PATH: 'https://documental.udistrital.edu.co/nuxeo/',
        },
        WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
        
        PERSONA_SERVICE: 'http://localhost:8080/v1/persona/',

        EXPERIENCIASERVICE: 'http://localhost:8080/v1/experiencia_laboral/',
        TIPO_DEDICACION_SERVICE: 'http://localhost:8080/v1/tipo_dedicacion/',
        TIPO_VINCULACION_SERVICE: 'http://localhost:8080/v1/tipo_vinculacion/',
        CARGO_SERVICE: 'http://localhost:8080/v1/cargo/',
        DATO_ADICIONAL_EXPERIENCIA_LABORAL_SERVICE: 'http://localhost:8080/v1/dato_adicional_experiencia_laboral/',

        INDICE_PRECIO_CONSUMIDOR_SERVICE: 'http://localhost:8080/v1/indice_precio_consumidor/',
        DTF_SERVICE: 'http://localhost:8080/v1/dtf/',
        SALARIO_MINIMO_LEGAL_SERVICE: 'http://localhost:8080/v1/salario_minimo_legal/',
        
        MONTO_ACEPTADO_POR_COBRAR_SERVICE: 'http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/',
        REGISTRAR_RECAUDO_SERVICE: 'http://localhost:8080/v1/registrar_recaudo/',
        
        EXPERIENCIA_LABORAL_INCAPACIDAD_SERVICE: 'http://localhost:8080/v1/experiencia_laboral_incapacidad/',
        INCAPACIDAD_SERVICE: 'http://localhost:8080/v1/incapacidad/',
        
        ORGANIZACION_SERVICE: 'http://localhost:8080/v1/organizacion/',
        RELACION_ORGANIZACION_SERVICE: 'http://localhost:8080/v1/relacion_organizaciones/',
        TIPO_ORGANIZACION_SERVICE: 'http://localhost:8080/v1/tipo_organizacion/',
        TIPO_RELACION_ORGANIZACION_SERVICE: 'http://localhost:8080/v1/tipo_relacion_organizaciones/',

        ENTE_SERVICE: 'http://localhost:8080/v1/ente/',
        TIPO_ENTE_SERVICE: 'http://localhost:8080/v1/tipo_ente/',

        IDENTIFICACION_SERVICE: 'http://localhost:8080/v1/identificacion/',
        TIPO_IDENTIFICACION_SERVICE: 'http://localhost:8080/v1/tipo_identificacion/',
        
        CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/api/configuracion_crud_api/v1/',
        NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
        CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
          CLIENTE_ID: '3Idp5LUlnZY7cOV10NaLuyRfzooa',
          RESPONSE_TYPE: 'id_token token',
          SCOPE: 'openid email role documento',
          REDIRECT_URL: 'http://localhost:4200/',
          SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
          SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
        },
    },
  };
  ```
</details>