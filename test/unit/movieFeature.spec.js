import MovieFeature from '../../module/MovieFeature'
import axios from 'axios'

const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-sorted'))

const getHttpRequest = async (url) => await axios.get(url)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error)
    })

describe('MovieFeature [unit]', () => {

    describe('#yearsAndPopluritySearch', () => {
        it('retrieve movie with rating above and not bellow the requested', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/discover/movie?api_key=eaa197b250138af7cf36467821b800d1',
                {
                    language: 'en-US',
                    sort_by: 'vote_average.asc',
                    include_adult: false,
                    include_video: false,
                    page: 1,
                    with_original_language: 'en'
                })
            console.log(data)
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.vote_average >= rating)).to.be.eql(true)
        })

        it('retrieve movie only between specific years', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.release_date >= fromDate && item.release_date <= toDate)).to.be.eql(true)
        })

        it('contain movie that projected in specifics year', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result).to.deep.include({ movieName: 'tom and jery', year: 2012 })
        })

        it('retrieve an empty list for false search result', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2999, toDate: 3016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array').and.to.have.lengthOf(0)
        })

        it('raise exception when years range is invalid', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2016, toDate: 2015 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            expect(() => MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)).to.throw(Error)
        })
    })

    describe('#calculateEarnings', () => {

        it('retrieve a list with all Earning negative and positive', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.profit >= 0 || item.profit <= 0)).to.be.eql(true)
        })

        it('filter movies without information about profit', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result).to.not.deep.include({ movieName: 'tom and jery' })
        })

        it('retrieve a sorted list', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array').and.to.be.sortedBy('profit')
        })

        it('filter movie that not showed yet', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.release_date <= Date.now())).to.be.eql(true)

        })

        it('at least 7 days from premiere', async () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: 2015, toDate: 2016 }
            let data = await getHttpRequest('https://api.themoviedb.org/3/movie/550?api_key=eaa197b250138af7cf36467821b800d1')
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.release_date <= Date.now().setDate(getDate() - 7))).to.be.eql(true)
        })

    })

})
