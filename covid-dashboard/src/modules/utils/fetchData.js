const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

async function fecthData(url) {
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
}

const getAsyncData = async (data) => {
  const asyncData = await data;
  return asyncData;
};

export { fecthData, getAsyncData };
