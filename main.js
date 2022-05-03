function getURL() {
  const num = document.getElementById("numberOfJokes").value;
  const twoRadio = document.getElementById("twoJoke").checked;
  const type = twoRadio ? "twopart" : "single";
  return `https://v2.jokeapi.dev/joke/Any?type=${type}${
    num > 1 && `&amount=${num}`
  }`;
}

const ClearAll = () => {
  const el = document.querySelector(".joke__container");
  el.innerHTML = "";
};

const AddMe = () => {
  const url = getURL();
  const el = document.querySelector(".joke__container");
  // console.log('url', url)

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log('json', data)
      if (data.jokes) {
        data.jokes.forEach((joke) =>
          joke.type === "twopart"
            ? paintTwoPartJoke(el, joke)
            : paintSingleJoke(el, joke)
        );
      } else {
        data.type === "twopart"
          ? paintTwoPartJoke(el, data)
          : paintSingleJoke(el, data);
      }
    });
};

const paintTwoPartJoke = (el, joke) => {
  let div = document.createElement("li");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  div.classList.add("joke");
  div1.innerHTML = joke.setup;
  div2.innerHTML = joke.delivery;
  div.appendChild(div1);
  div.appendChild(div2);
  el.appendChild(div);
};

const paintSingleJoke = (el, joke) => {
  let div3 = document.createElement("li");
  div3.classList.add("joke");
  div3.innerHTML = joke.joke;
  el.appendChild(div3);
};
