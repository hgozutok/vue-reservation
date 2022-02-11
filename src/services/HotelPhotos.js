var axios = require("axios").default;

class HotelPhotos {
  async getHotelPhotos(hotelId) {
    var results = null;

    await axios
      .get(process.env.VUE_APP_HOTEL_PHOTOS_URL, {
        headers: {
          "x-rapidapi-host": process.env.VUE_APP_HOST_HEADER,
          "x-rapidapi-key": process.env.VUE_APP_HOST_HEADER_KEY,
        },
        params: {
          id: hotelId,
        },
      })
      .then((response) => {
        results = response.data;
        return results;
        //   console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return results;
  }
}

export default new HotelPhotos();

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
//   params: {id: '1178275040'},
//   headers: {
//     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
//     'x-rapidapi-key': 'e13027cccdmshb792f813a512a15p19ce40jsnf802d29ef038'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
