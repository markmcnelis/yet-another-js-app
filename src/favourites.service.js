const baseUrl = "http://localhost:3210/favourites";

export default async function getFavourites({ userId = "user001" }) {
  const url = `${baseUrl}/${userId}`;
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.log("Error", e.message);
  }
}

export async function addFavourite({ userId = "user001", favourite = {} }) {
  try {
    let response = await fetch(baseUrl, {
      body: JSON.stringify({ userId, favourite }),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
    return await response.json();
  } catch (e) {
    console.log("Error", e.message);
  }
}