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
    idNetPublic:'20cbf36b-da4e-4b82-99e1-446c11256248',  
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
        // idImageOAI: 'a429c7ae-9eb6-4ab0-bf9e-7a58ee70c766',
        idImageOAI: '1dcedbc1-48a9-4cb4-81b5-8323253be41f',        
        //idFlavorOAI: 'c1',
        idFlavorOAI: '70bffa61-2770-4896-9dc5-bdc617c6dd86',
        idNetworkProjectMovil:'bfc48fa4-99b0-441c-8868-e0eae192a709'
    }
    
    
};


