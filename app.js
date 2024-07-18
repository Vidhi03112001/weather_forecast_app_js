export const callApi = async (url, methodType) => {
  try {
    let response = await fetch(url, {
      method: methodType,
    });
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      throw Error("Error : " + data["message"]);
    }
  } catch (error) {
    console.log(error.message);
    return {};
  }
};
