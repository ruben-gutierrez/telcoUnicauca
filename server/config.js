module.exports={
    secret: 'rootPassToken',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.24',
    headersOpenStack:{},
    idIMS:{
        idImage:'a51f2fb2-e632-4033-9307-79617c462bf7',
        idFlavor: 'd2',
        nameKey:'Testbed_vIMS'
    },
    idNetPublic:'897405e4-ec27-43ae-befe-3ef65d0ebee6',
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