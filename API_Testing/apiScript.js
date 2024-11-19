fetch("citylist.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // You can work with the JSON data here
    data.forEach((element) => {
      if (element.id === "") {
        console.log(element.name);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });
