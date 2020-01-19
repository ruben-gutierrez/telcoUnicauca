module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.24',
    headersOpenStack:{},
    idIMS:{
        idImage:'0f14e28f-1118-4d23-bf04-9a7d00f2f652',
        idFlavor: 'd2',
        nameKey:'ims'
    },
    idNetPublic:'40e05140-3469-41d1-8a9e-9eb55ff05bd3',
    VMcoreIMS:{
        aio:[
            'aio',
            'sipp'
        ],
        distributed:[
            'bono',
            'sprout',
            'ellis',
            'homer',
            'vellum',
            'dime',
            'dns',
            'sipp'
        ],
        distributedPSTN:[
            'bono',
            'sprout',
            'ellis',
            'homer',
            'vellum',
            'dime',
            'ibcf',
            'asterisk',
            'dns',
            'sipp'
        ]
    },
    comunityCacti:'public',
    templateHostCacti:4,
    regexNumber:/(\d+)/g
};