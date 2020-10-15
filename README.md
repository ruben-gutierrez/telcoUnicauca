Posibles errores

- Al crear servidores en openstack da el error
    { code: 400, content:"key_name invalid"}
    Causa: No se encuentra el nombre de la keyname
    Solución: Ingresar desde el usuario configurado en el archivo createToken.sh y crear la key_name
- Si se crean los servidores y el servidor telco no crea los usuarios y contraseña a las vm
    verificar que tenga ipflotante y tenga permisos para ssh
    la blade donde este el openstack debe permitir el protocolo ssh



    Rama development (integración de otros proyectos)