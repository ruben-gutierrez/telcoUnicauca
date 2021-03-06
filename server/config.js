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
    regexNumber:/(\d+)/g,
    proyectMovil:{
        username:'movil',
        projectName:'movil',
        projectDomainName:'default',
        userDomainName:'default',
        password: '123',
        authURL:'http://10.55.2.20/identity/v3',
        idMovil:{
            idImage:'0ee75157-505f-49fc-954a-ac0179341ea9',//img ubuntu14
            idImage1:'164258a1-4636-4be1-95de-17732a401b30',//img aio
            // idFlavor: 'd3c',//flavor ims
            idFlavor: '4',//flavor ims
            idFlavor1: '4',//flavor aio
            nameKey:'oaimovil'
        }, 
        idImageOAI: 'a429c7ae-9eb6-4ab0-bf9e-7a58ee70c766',
        idFlavorOAI: 'c1',
        idNetworkProjectMovil:'c959d001-cea6-4e7d-8b17-9a1b7247fa60'
    }
    
    
};


