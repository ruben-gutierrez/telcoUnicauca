module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.20',
    headersOpenStack:{},
    idIMS:{
        idImage:'0ee75157-505f-49fc-954a-ac0179341ea9',//img ubuntu14
        idImage1:'164258a1-4636-4be1-95de-17732a401b30',//img aio
        // idFlavor: 'd3c',//flavor ims
        idFlavor: '4',//flavor ims
        idFlavor1: '4',//flavor aio
        nameKey:'ims'
    }, 
    idNetPublic:'e2374ddf-9eb4-4594-8874-ea3586b5b2c4',  
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