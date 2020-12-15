import * as storage from './storage';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

async function fecthData(url) {
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
}

const getAsyncData = async (data, name) => {
  const asyncData = await data;
  storage.set(name, asyncData);
  return asyncData;
};

export { fecthData, getAsyncData };
