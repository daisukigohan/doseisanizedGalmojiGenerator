export async function fetchImages(breed) {
  const jsonArr = [];
  const response = await fetch(
    //`https://dog.ceo/api/breed/${breed}/images/random/12`
    `https://api.thecatapi.com/api/images/get?format=json&results_per_page=12&type=gif&size=med`
  );
  const data = await response.json();

  for (let i=0; i < data.length; i++){
    jsonArr.push(data[i].url);
  }
  console.log(jsonArr)
  return jsonArr;
}