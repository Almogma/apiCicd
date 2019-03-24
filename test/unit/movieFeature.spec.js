import { MovieFeature, convertDate, getHttpRequest } from '../../module/MovieFeature'

const moment = require('moment')
const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-sorted'))


describe('MovieFeature [unit]', () => {
    const { rating, fromDate, toDate } = {
        rating: 5,
        fromDate: '2015-1-1',
        toDate: '2020-12-31'
    }
    let movieRatingDateData
    let movieProfitData
    beforeEach(async () => {
        movieRatingDateData = await getHttpRequest('https://api.themoviedb.org/3/discover/movie?api_key=eaa197b250138af7cf36467821b800d1',
            {
                language: 'en-US',
                sort_by: 'vote_average.asc',
                include_adult: false,
                include_video: false,
                page: 1,
                with_original_language: 'en'
            })
        movieProfitData = await getHttpRequest('https://api.themoviedb.org/3/discover/movie?api_key=eaa197b250138af7cf36467821b800d1',
            {
                language: 'en-US',
                sort_by: 'vote_average.asc',
                include_adult: false,
                include_video: false,
                page: 1,
                with_original_language: 'en'
            })
    })

    describe('#yearsAndPopluritySearch', () => {
        it('retrieve movie with rating above and not bellow the requested',  () => {
            const result = MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)
            expect(result).to.be.an('array').with.length.greaterThan(0)
            expect(result.every((item) => item.vote_average >= rating)).to.be.eql(true)
        })

        it('retrieve movie only between specific years',  () => {
            const result = MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)
            expect(result).to.be.an('array').with.length.greaterThan(0)
            expect(result.every(item => moment(item.release_date).isBetween(
                convertDate(fromDate), convertDate(toDate)))).to.be.eql(true)
        })

        it('contain movie that projected in specifics year',  () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: '2015-1-1', toDate: '2020-12-31'}
            const result = MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)
            expect(result).to.be.an('array').with.length.greaterThan(0)
            expect(result).to.deep.include({ title: 'The Hard Way', vote_average: 5.6, release_date: convertDate('2019-03-20')})
        })

        it('retrieve an empty list for false search result',  () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: '2099-1-1', toDate: '2999-12-31'}
            const result = MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)
            expect(result).to.be.an('array').and.to.have.lengthOf(0)
        })

        only('raise exception when years range is invalid',  () => {
            const { rating, fromDate, toDate } = { rating: 5, fromDate: '2016-1-1', toDate: '2015-12-31' }
            expect(() => MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)).to.throw(Error)
        })
    })

    describe('#calculateEarnings', () => {

        it('retrieve a list with all Earning negative and positive', async () => {
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
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.profit >= 0 || item.profit <= 0)).to.be.eql(true)
        })

        it('filter movies without information about profit', async () => {
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
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result).to.not.deep.include({ movieName: 'tom and jery' })
        })

        it('retrieve a sorted list', async () => {
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
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array').and.to.be.sortedBy('profit')
        })

        it('filter movie that not showed yet', async () => {
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
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.release_date <= Date.now())).to.be.eql(true)

        })

        it('at least 7 days from premiere', async () => {
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
            const result = MovieFeature.yearsAndPopluritySearch(data, rating, fromDate, toDate)
            expect(result).to.be.an('array')
            expect(result.every((item) => item.release_date <= Date.now().setDate(getDate() - 7))).to.be.eql(true)
        })

    })

})
