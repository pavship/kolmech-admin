const defaults = {
    // apolloClientDemo: {
    //     __typename: ‘ApolloClientDemo’,
    //     currentPageName: ‘Apollo Demo’,
    // }
    // alteredEnquiry: {
    //     __typename: 'AlteredEnquiry',
    //     // dateLocal: 
    //     // active: false,
    // },
    newEnquiry: {
        __typename: 'Enquiry',
        id: 'new'
    },
    layout: {
        __typename: 'Layout',
        details: null,
        extra: null,
        bottomPanel: null
    },
    lists: {
        __typename: 'Lists',
        selectedProdIds: [],
    }
}

export default defaults