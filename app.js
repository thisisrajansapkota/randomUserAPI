let userList = [];
const API_EP = "https://randomuser.me/api/?results=20";
const searchElem = document.getElementById("search");
const genderElem = document.getElementById("gender");
const usersListElem = document.getElementById("users");
const countElem = document.getElementById("count");

genderElem.addEventListener("change", (e) => {
  const { value } = e.target;
  const API_EP_GENDER_FILTER = `${API_EP}&gender=${value}`;
  fetchUserAndDisplay(API_EP_GENDER_FILTER);
});

searchElem.addEventListener("input", (e) => {
  const { value } = e.target;
  //filter the userList with given filter value
  // then display filtered value
  const filteredList = userList.filter((user) => {
    const fName = user.name.first.toLowerCase();
    const lName = user.name.last.toLowerCase();
    const filterName = value.toLowerCase();
    return fName.includes(filterName) || lName.includes(filterName);

    //another way if else.
    // if (
    //   user.name.first.toLowerCase().includes(value.toLowerCase()) ||
    //   user.name.last.toLowerCase().includes(value.toLowerCase())
    // )
    //   return true;
  });
  displayUsers(filteredList);
});
const fetchUserAndDisplay = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;

  displayUsers(userList);
};

const displayUsers = (users) => {
  console.log(users);
  //display
  let htmlStr = "";
  users.forEach((user) => {
    htmlStr += ` <div class="card" style="width: 18rem">
                <img
                  src="${user.picture.large}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body  ">
                  <h5 class="card-title text-center">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                  <div class="card-text">
                    <div><i class="fa-solid fa-mobile"></i> ${user.phone}</div>
                    <div>
                      <i class="fa-solid fa-envelope"></i> ${user.email}
                    </div>
                    <div>
                      <i class="fa-solid fa-map"></i>${user.location.city}  ${user.location.country}
                    </div>
                    <div> <p class="card-text"> ${user.gender},  ${user.dob.age}</p></div>
                  </div>
                </div>
              </div>`;
  });
  usersListElem.innerHTML = htmlStr;
  countElem.innerText = users.length;
};

//calling fetchUserAndDisplay function!
fetchUserAndDisplay(API_EP);
