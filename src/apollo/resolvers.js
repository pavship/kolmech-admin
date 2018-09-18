const resolvers = {
    Mutation: {
        // assignCurrentEnquiry: (_, { id }, { cache }) => {
        //     // console.log(id)
        //     cache.writeData({
        //         data: {
        //             currentEnquiry: {
        //                 __typename: 'CurrentEnquiry',
        //                 id,
        //                 dateLocal: new Date()
        //             }
        //         }
        //     })
        // },
        // updateAlteredEnquiry: (_, { key, value }, { cache }) => {
        //     console.log(key, value)
        // }
    }
}

export default resolvers