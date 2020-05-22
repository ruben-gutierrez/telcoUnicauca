module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.24',
    headersOpenStack:{},
    idIMS:{
        idImage:'cdf76373-fc49-4fcf-b0cb-b64e2623f65b',
        idFlavor: 'd2',
        nameKey:'keyIMS'
    },
    idNetPublic:'48f7f3ff-6fa9-4a90-b17d-0dcd45a19eab', 
    VMcoreIMS:{
        aio:[
            'aio',
            'sipp'
        ],
        distributed:[
            'sipp',
            'sprout',
            'ellis',
            'homer',
            'vellum',
            'dime',
            'dns',
            'bono'
        ],
        distributedPSTN:[
            'sipp',
            'sprout',
            'ellis',
            'homer',
            'vellum',
            'dime',
            'ibcf',
            'asterisk',
            'dns',
            'bono'
        ]
    },
    comunityCacti:'public',
    templateHostCacti:4,
    regexNumber:/(\d+)/g
};