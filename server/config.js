module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.20',
    headersOpenStack:{},
    idIMS:{
        idImage:'5813468d-13c1-40dd-88bb-9b9991323017',//img ubuntu14
        idImage1:'5813468d-13c1-40dd-88bb-9b9991323017',//img aio
        idFlavor: 'd3',//flavor ims
        idFlavor1: '3',//flavor aio
        nameKey:'ims'
    },
    idNetPublic:'a0423419-93f8-4a3d-9115-a69193f6c2f7',  
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