# Restaurant Frontend App

## Descripción

Aplicación de restaurante que permite atender órdenes de cocina, las cuales se generarán aleatoriamente. Además, puedes gestionar las diferentes etapas del proceso de servicio de cocina. Para crear una orden nueva haga click en el botón **"ORDENAR COMIDA"** ubicado en el menú de la aplicación. Esto generará una nueva orden con estado **"Pedido ordenado"**, esto hará que se enliste en una cola de pedidos en la que se procesará según la hora a la que esta llegue. Dicha cola está conectada a un servicio que se encargará de verificar la disponibilidad de los ingredientes en el inventario, en caso de que no se encuentren disponibles los ingredientes intentará hacer la compra en el mercadito. Si los productos se lográn comprar, la orden pasará al estado **"En preparación"**, en caso contrario el usuario deberá ingresarla nuevamente a la cola. O esperar que el servicio de verificacion de órdenes se ejecute automáticamente y se encargue el de ingresar dicha orden en la cola. Luego el usuario deberá mover la orden por las siguientes etapas según se vayan completando. Para esto puede utilizar la opción arrastrar y soltar o el botón "COMPLETAR ETAPA" que se encuentra en cada ticket de orden.

## Inicialización del Proyecto

Para inicializar el proyecto en su entorno local, el desarrollador deberá descargar este proyecto en su computador o en donde desee ejecutarlo. Para esto deberá tener instalado git y correr el comando:

`git clone git@github.com:soymichelt/restaurant-frontend.git`

Esto descargará el proyecto en el directorio en el que se encuentre ubicado en la consola de bash en la que ejecutó dicho comando. Ahora, teniendo instalado previamente NodeJS y NPM, debe ingresar a la carpeta del proyecto usando siempre una consola bash y ahí instalará las dependencias con el comando:

`npm install`

Ahora ya está listo para utilizar el proyecto localmente.

## Scripts

Para gestionar el proyecto cuenta con una serie de comandos o scripts que le ayudarán a realizar las operaciones necesarias para su implementación. Estos comandos son los siguientes:

- `npm run dev`: Permite ejecutar la aplicación en modo desarrollo. Esto le proporcionará una URL de localhost con un puerto para que pueda visualizar la app en un navegador.

- `npm run build`: Permite transpilar el código de TypeScript y de los componentes a JavaScript vanilla, el cúal puede ser interpretado por los navegadores.

- `npm run preview`: Este comando se debe utilizar después del comando `npm run build`, ya que este se encarga de levantar un servidor para visualizar una preview del bundle generado en la operación del traspilado.

- `npm run lint`: Ejecuta la configuración de ESLint establecida en este proyecto, para detectar problemas de malas prácticas en el código.

- `npm run deploy`: Este comando solo se debe ejecutar después de haber ejecutado el comando `npm run build`. Este tomará el bundle generado por el proceso del traspilado y hará un despliegue a firebase hosting, para que poder visualizar los cambios en la [web](https://soymichelrestaurant.web.app).

## Contacto

Añado información de contacto, para cualquier duda o información:

- [mtraatabladaa94@gmail.com](mailto:mtraatabladaa94@gmail.com)
- [soymichel.dev@gmail.com](mailto:soymichel.dev@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/soymichelt)

![Foto de Perfil](https://github.com/soymichelt/CV/blob/master/public/res/circleProfile64x64.png)