module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.24',
    headersOpenStack:{},
    idIMS:{
        idImage:'60a33155-b856-4639-8ced-1426ab8c300c',
        idFlavor: 'd2',
        nameKey:'imsKey'
    },
    idNetPublic:'dbd5b4b7-7b4f-4bb3-9fd3-c45ea064eea0',
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