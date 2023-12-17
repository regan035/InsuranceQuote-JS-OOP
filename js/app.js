class Insurance {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }

  //calculate the price
  calculateQuote(insurance) {
    let price;
    const base = 2000;
    const make = insurance.make;

    switch (make) {
      case "1":
        price = base * 1.15;
        break;
      case "2":
        price = base * 1.05;
        break;
      case "3":
        price = base * 1.25;
        break;
    }

    //get the year
    const year = insurance.year;
    const difference = this.getYearDifference(year);
    //each year 3% cheaper
    price = price - (difference * 3 * price) / 100;
    // check level
    const level = insurance.level;
    price = this.calculateQuoteLevels(price, level);
    return price;
  }

  //return years
  getYearDifference(year) {
    return new Date().getFullYear() - year;
  }

  //calculate levels
  calculateQuoteLevels(price, level) {
    if (level === "basic") {
      price = price * 1.3;
    } else {
      price = price * 1.5;
    }
    return price;
  }
}

class UI {
  // display years
  displayYears() {
    //max and min years
    const max = new Date().getFullYear(),
      min = max - 20;
    //generate list for 20 years
    const selectYears = document.getElementById("year");
    //display values in dom
    for (let i = max; i > min; i--) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      selectYears.appendChild(option);
    }
  }

  // //error messages
  displayError(message) {
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML = `<p>${message}</p>`;
    form.insertBefore(div, document.querySelector(".form-group"));
    console.log(document.querySelector(".form-group"));
    //remove error message
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
  }
  // //show results
  showResults(price, insurance) {
    const resultEl = document.getElementById("result");
    const div = document.createElement("div");
    let make = insurance.make;
    switch (make) {
      case "1":
        make = "American";
        break;
      case "2":
        make = "Asian";
        break;
      case "3":
        make = "European";
        break;
    }
    div.innerHTML = `
    <p class = "header">Total: $ ${price}</p>
    <p>Make: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>
    <p class = "total">Total: $ ${price}</p>
    `;

    // spinner gif
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      resultEl.appendChild(div);
    }, 3000);
  }
}
// variables
const form = document.getElementById("request-quote");
const ui = new UI();
//Event Listener

const eventListeners = () => {
  document.addEventListener("DOMContentLoaded", function () {
    ui.displayYears();
  });

  // submite the form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // read values from the form
    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value;

    //read radio buttons
    const level = document.querySelector('input[name="level"]:checked').value;

    //check all fields
    if (make === "" || level === "" || year === "") {
      ui.displayError("Please fill out the form");
    } else {
      //clear previous values
      const previousResult = document.querySelector("#result div");
      if (previousResult != null) {
        previousResult.remove();
      }
      //new quote
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuote(insurance);

      //display results
      ui.showResults(price, insurance);
    }
  });
};

eventListeners();
//objects
