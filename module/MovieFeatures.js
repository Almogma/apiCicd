import axios from 'axios'

const moment = require('moment')
const convertDate = (date) => {
    return moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD'])
}

class MovieFeatures {
    static yearsAndPopluritySearch (data, rating, fromDate, toDate) {
        if (convertDate(toDate) < convertDate(fromDate)) {
            throw new Error()
        }
        return data.results.map(item => {
            return {
                title: item.title,
                vote_average: item.vote_average,
                release_date: item.release_date
            }
        }).filter(item => item.vote_average >= rating)
            .filter(item => {
                return moment(convertDate(item.release_date)).isBetween(
                    convertDate(fromDate), convertDate(toDate))
            })
    }

    static yearsAndRatingSearch (data, pop, fromDate, toDate) {
        if (convertDate(toDate) < convertDate(fromDate)) {
            throw new Error()
        }
        return data.results.map(item => {
            return {
                title: item.title,
                popularity: item.popularity,
                release_date: item.release_date
            }
        }).filter(item => item.popularity >= pop)
            .filter(item => {
                return moment(convertDate(item.release_date)).isBetween(
                    convertDate(fromDate), convertDate(toDate))
            })
    }

    static async getHttpRequest (url, args = {}) {
        return await axios.get(url, args)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

module.exports = { MovieFeature: MovieFeatures, convertDate }
