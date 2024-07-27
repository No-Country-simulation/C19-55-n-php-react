// Helper que nos ayuda a realizar las peticiones AJAX a la API...
export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    // Cabecera por defecto para la petición...
    const defaultHeaders = {
      accept: 'application/json',
    };

    //AbortController -> Permite cancelar la peticion si el endpoint no responde...
    const controller = new AbortController();
    options.signal = controller.signal;

    // Si el usuario especificó el metodo, utiliza ese, si no lo especificó, utiliza GET...
    options.method = options.method || 'GET';

    // Si el usuario especifica las cabeceras, mezcla las defaultHeaders con las especificadas por el usuario, sino, utiliza las establecidas por defecto...
    options.header = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    // Si la peticion es un POST parsea el body que almacena la información a cadena JSON, si no existe elimina el cuerpo de la petición...
    options.body = JSON.stringify(options.body) || false; // No puede ser [false], por eso se valida y se elimina en la siguiente línea...
    if (!options.body) delete options.body;

    // console.log(options);

    // Si no se recibe respuesta después de 10 segundos, se cancela la petición.
    setTimeout(() => controller.abort(), 10000);

    // Custon Fetch retorna una promesa con la ejecución de la solicitud.
    return fetch(endpoint, options)
      .then((resp) =>
        resp.ok
          ? resp.json()
          : Promise.reject({
              error: true,
              status: resp.status || '00',
              statusText: resp.statusText || 'Ocurrió un error',
            })
      )
      .catch((error) => error);
  };

  // Extraer los datos de la API
  const get = (url, options = {}) => customFetch(url, options);

  // Agregar datos a la API
  const post = (url, options = {}) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  // Modificar los datos de la API
  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };

  // Eliminar los datos en la API
  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  return { get, post, put, del };
};
