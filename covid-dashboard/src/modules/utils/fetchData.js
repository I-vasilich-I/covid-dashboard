const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

async function fecthData(url) {
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
  return null;
}

const getAsyncData = async (data) => {
  const asyncData = await data;
  return asyncData;
};

export { fecthData, getAsyncData };
