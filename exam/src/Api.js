function get(url) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.onload = () => {
      if (http.status === 200) {
        resolve(JSON.parse(http.responseText));
      } else {
        reject(http.statusText);
      }
    };
    http.onerror = () => {
      reject(http.statusText);
    };
    http.send();
  });
}

let promiseObj = get("https://jsonplaceholder.typicode.com/posts");
promiseObj.then((message) => {
  message.Countries.forEach((item) => {
    const mainBody = document.querySelector("body div.main");
    const h1Temp = document.createElement("h1");
    const pTemp = document.createElement("p");
    let cName = `${item.Country} - ${item.CountryCode}`;
    h1Temp.textContent = cName;
    pTemp.textContent = `Cases - ${item.TotalConfirmed}, Recoverd - ${
      item.TotalRecovered
    }, Active - ${item.TotalConfirmed - item.TotalRecovered}`;

    mainBody.appendChild(h1Temp);
    mainBody.appendChild(pTemp);

    //to search
    const list = document.querySelector("body ul");
    const search = document.forms["update"].querySelector("input");
    search.addEventListener("keyup", function (e) {
      {
        const term = e.target.value.toLowerCase();
        if (
          item.Country.toLowerCase().indexOf(term) != -1 ||
          item.CountryCode.indexOf(term) != -1
        ) {
          h1Temp.style.display = "block";
          pTemp.style.display = "block";
        } else {
          h1Temp.style.display = "none";
          pTemp.style.display = "none";
        }
      }
    });
  });
});
