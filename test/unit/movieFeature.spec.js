const expect = require('chai').expect

describe('MovieFeature [unit]', () => {
    let stub
    beforeEach(() => {
        stub = new MovieFeature()
    })

    describe('#yearsAndPopluritySearch', () => {
        it('retrieve movie with rating above and not bellow the requested', () => {

            stub.yearsAndPopluritySearch()
        })

        it('retrieve movie only between specific year', () => {

        })

        it('contain movie that projected in specifics year', () => {

        })

        it('retrieve an empty list for false search result', () => {

        })

        it('raise exception when years range is invalid', () => {

        })
    })

    describe('#calculateEarnings', () => {

        it('retrieve a list with all Earning negative and positive', () => {

        })

        it('filter movies without information about profit', () => {

        })

        it('retrieve a sorted list', () => {

        })

        it('filter movie that not showed yet', () => {

        })

        it('', () => {

        })

    })

})