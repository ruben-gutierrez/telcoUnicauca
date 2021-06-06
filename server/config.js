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
    idNetPublic:'627ad86f-0456-4139-a2f4-f33596af84f0',  
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
        //username:'movil',
        //projectName:'movil',
        username:'admin',
        projectName:'admin',
        projectDomainName:'default',
        userDomainName:'default',
        password: '3rootbl',
        authURL:'http://10.55.2.20/identity/v3',
        idMovil:{
            idImage:'0ee75157-505f-49fc-954a-ac0179341ea9',//
            idImage1:'164258a1-4636-4be1-95de-17732a401b30',//          
            // idFlavor: 'd3c',//flavor ims
            idFlavor: '4',//flavor ims
            idFlavor1: '4',//flavor aio
            nameKey:'oaimovil'
        }, 
        // idImageOAI: 'a429c7ae-9eb6-4ab0-bf9e-7a58ee70c766',
        idImageOAI: '23b1473b-ee1f-4884-99d0-62fe87f6b556',    //  id dela imagen oai   
        //idFlavorOAI: 'c1',
        idFlavorOAI: '3',
        idNetworkProjectMovil:'58775e89-0a93-4abe-9490-71c805f2075b'
    }
    
    
};


