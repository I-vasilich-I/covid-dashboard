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
    alert(
      `Something went terribly wrong, can't get covid data from API. Please try again a bit later. We'll really appreciate it if you contact us if the problem wouldn't solve by itself (Discord: Michael_Sh#1396 or __vasilich__#1398)`
    );
  }
  return null;
}

const getAsyncData = async (data) => {
  const asyncData = await data;
  return asyncData;
};

export { fecthData, getAsyncData };
