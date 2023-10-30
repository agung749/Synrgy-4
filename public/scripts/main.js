const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let i = 0;
class SearchFeature {
  constructor() {
    this.form = document.querySelector("#search-form");
    this.tanggal = document.querySelector("#tanggal");
    this.waktu = document.querySelector("#waktu");
    this.penumpang = document.querySelector("#penumpang");
    this.tanggal.value = params.tanggal;
    this.waktu.value = params.waktu;
    this.penumpang.value = params.penumpang;
  
  }

  _populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(
        timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
      ).toISOString();

      return {
        ...car,
        availableAt,
      };
    });
  };
 
  async fetchCars() {
    const carsLocal = window.localStorage.getItem("cars");
    if (carsLocal) {
      return JSON.parse(carsLocal);
    }

    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    console.log(response)
    const body = this._populateCars(await response.json());
    window.localStorage.setItem("cars", JSON.stringify(body));
    return body;
  }

  async filterCars() {
    const cars = await this.fetchCars();
    console.log(cars)
    const tanggal = this.tanggal.value;
    const waktu = this.waktu.value;
    const penumpang = this.penumpang.value;

    const availableCars = cars.filter((car) => {
      const carTanggal = car.availableAt.split("T")[0];
      const carWaktu = new Date(car.availableAt).getHours();
      const carPenumpang = car.capacity;

      if (carTanggal === tanggal && carWaktu <= +waktu && penumpang<=carPenumpang ) {
        return true;
      }
      return false;
    });
    return availableCars;
  }
}

class Car {
  static list = [];
  
  static init(cars) {
    this.list = cars.map((i) => new this(i));
    
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,i
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
    
  }

  render(length) {
    i++;
    console.log(i)
    if(i%3==1){

    return `
      <div class="row pt-5 mt-3 b-5 justify-content-around d-flex">
      <div class="col-md-3 p-5  card">
      <img src="${this.image}" alt="&nbsp;${this.manufacture}" width="100%" height="20%">
      <h5>&nbsp;${this.type+" "+this.manufacture+" "+this.model} </h5>
      <h4>Rp.&nbsp;${this.plate}/Hari</h4>
      <p class="text-justify fs-6 lh-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>        
      <p><i class="fa fa-calendar"></i>&nbsp;${this.year}</p>
      <p><i class="fa fa-user"></i>&nbsp;${this.capacity}</p>
      <p><i class="fa fa-gear"></i>&nbsp;${this.transmission}</p>
      </div>
    `;
    }
    else if(i==length || i%3==0 ){
      return `
      <div class="col col-md-3 p-5   card">
      <img src="${this.image}" alt="&nbsp;${this.manufacture}" width="100%" height="20%">
      <h5>&nbsp;${this.type+" "+this.manufacture+""+this.model} </h5>
      <h4>Rp.${this.plate}/Hari</h4>
      <p class="text-justify fs-6 lh-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>        
      <p><i class="fa fa-calendar"></i>&nbsp;${this.year}</p>
      <p><i class="fa fa-user"></i>&nbsp;${this.capacity}</p>
      <p><i class="fa fa-gear"></i>&nbsp;${this.transmission}</p>
      </div></div>
    `;
    }
    else{
      return `
      <div class="col col-md-3 p-5  card">
      <img src="${this.image}" alt="&nbsp;${this.manufacture}" width="100%" height="20%">
        <h5>&nbsp;${this.type+" "+this.manufacture+""+this.model} </h5>
        <h4>Rp.&nbsp;${this.plate}/Hari</h4>
        <p class="text-justify fs-6 lh-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>        
        <p><i class="fa fa-calendar"></i>&nbsp;${this.year}</p>
        <p><i class="fa fa-user"></i>&nbsp;${this.capacity}</p>
        <p><i class="fa fa-gear"></i>&nbsp;${this.transmission}</p>
      </div>
    `;
    }
  }
}

class Main {
  constructor() {
    this.result = document.querySelector("#result");
  }

  init() {
    const searchFeature = new SearchFeature();
    searchFeature.filterCars().then((availableCars) => {
      Car.init(availableCars);
      const cars = Car.list.map((car) => car.render(Car.list.length));
      if(cars.length==0){
        this.result.innerHTML = `<center> <h1 class="pt-5">Data Kosong <h1></center>`
      }
      else{
        
      this.result.innerHTML = cars.join("\n");
      }
    });
  }
}

const main = new Main();
main.init();
