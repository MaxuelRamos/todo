/*
 * O método fetch() retorna erros do servidor da mesma forma que as respostas
 * de sucesso. A diferença é apenas a flag "ok" da resposta.
 *
 * Esse é um método utilitário para ser utilizado nas chamadas Rest para tratar
 * isso e lançar um erro nesses casos, que irá cair no callback "catch" do fetch().
 */
export function handleError(response) {
  if (!response.ok) {
    /* eslint no-console: "off" */
    console.error(response);
    const error = Error(`Error: ${response.status} ${response.statusText}`);
    error.response = response;

    throw error;
  }
  return response;
}

/*
 * Faz uma chamada GET para retornar um JSON como resposta.
 *
 * Já faz o tratamento de erro na resposta.
 */
export function jsonFetch(url) {
  return fetch(url, {
    method: 'GET',
  }).then(resp => handleError(resp).json());
}

/*
 * Faz uma chamada PATCH para retornar um JSON como resposta.
 *
 * Já faz o tratamento de erro na resposta.
 */
export function jsonPatch(url, body) {
  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => handleError(resp).json());
}

/*
 * Faz uma chamada POST para retornar um JSON como resposta.
 *
 * Já faz o tratamento de erro na resposta.
 */
export function jsonPost(url, body) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => handleError(resp).json());
}

/*
 * Faz uma chamada PUT para retornar um JSON como resposta.
 *
 * Já faz o tratamento de erro na resposta.
 */
export function jsonPut(url, body) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => handleError(resp).json());
}

export function jsonDelete(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: {},
  }).then(resp => handleError(resp));
}
