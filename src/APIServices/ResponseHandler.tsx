// import { getToken } from "./AsyncStorage";

export const GET = async (dispatch: any, url: string) => {
  //   const token = await getToken();
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("GET-->", url, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("GET Error-->", err);
    });
};

export async function POST(dispatch: any, url: string, data: any) {
  //   const token = await getToken();
  let formData = new FormData();
  if (data) {
    Object.keys(data).map((element) => {
      if (data[element] !== undefined) {
        formData.append(element, data[element]);
      }
    });
  }
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("POST-->", url, formData, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("POST Error-->", url, formData, err);
    });
}
