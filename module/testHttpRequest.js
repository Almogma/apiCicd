var axios = require('axios')

axios.get('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
     .then((response) => {
         console.log(response.data.revenue - response.data.budget)
         console.log(response.data.id)
     })
     .catch(function (error) {
         console.log(error)
     })