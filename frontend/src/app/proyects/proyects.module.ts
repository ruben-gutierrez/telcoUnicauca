
import { NgModule } from "@angular/core";



// modules
import { SharedModule } from '../proyects/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider'; 
import { BrowserModule } from '@angular/platform-browser';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

// Routes
import { ProyectsRoutes } from './proyects.routes';

// Components
import { ProyectsComponent } from './proyects.component';
import { InformationComponent } from './ims/information/information.component';
import { ArquitecturesComponent } from './ims/arquitectures/arquitectures.component';
import { TestsComponent } from './ims/tests/tests.component';
import { GraphsComponent } from './ims/graphs/graphs.component';

import { AvailableComponent } from './ims/arquitectures/available/available.component';
import { TestingComponent } from './ims/tests/testing/testing.component';
import { TestsCreatedComponent } from './ims/tests/tests-created/tests-created.component';
import { NewTestComponent } from './ims/tests/new-test/new-test.component';
import { TestComponent } from './ims/tests/test/test.component';
import { ArquitectureComponent } from './ims/arquitectures/arquitecture/arquitecture.component';
import { GraphComponent } from './ims/graphs/graph/graph.component';
import { GraphNewComponent } from './ims/graphs/graph-new/graph-new.component';
import { InformationTemplateComponent } from './ims/information/information-template/information-template.component';
import { GraphTemplateComponent } from './ims/graphs/graph-template/graph-template.component';
import { NewServerComponent } from './ims/arquitectures/arquitecture/new-server/new-server.component';
import { InformationModule } from './ims/information/information.module';
import { InformationRoutes } from './ims/information/information.routes';
//import { InfoServiceComponent } from './ims/informatio/info-service/info-service.component';
// import { GuideTestComponent } from './ims/tests/guide-test/guide-test.component';
// import { GuideSoftphoneComponent } from './ims/information/guide-softphone/guide-softphone.component';
// import { InfoTelcoIMSComponent } from './ims/information/info-telco-ims/info-telco-ims.component';
// import { InfoArquitectureComponent } from './ims/information/info-arquitecture/info-arquitecture.component';
// import { InfoTestComponent } from './ims/information/info-test/info-test.component';
// import { InfoGraphsComponent } from './ims/information/info-graphs/info-graphs.component';
// import { InfoGuidesComponent } from './ims/information/info-guides/info-guides.component';


//Telcomovil
    import { MenumovilComponent } from './telcomovil/menumovil/menumovil.component';
    import { IniciomovilComponent } from './telcomovil/iniciomovil/iniciomovil.component';
    //InformacionTelcomovil
    import { ForomovilComponent } from './telcomovil/informacionTelcomovil/foromovil/foromovil.component';
    import { InformacionmovilComponent } from './telcomovil/informacionTelcomovil/informacionmovil/informacionmovil.component';
    import { ProtocolosmovilComponent } from './telcomovil/informacionTelcomovil/protocolosmovil/protocolosmovil.component';
    import { Redes4gmovilComponent } from './telcomovil/informacionTelcomovil/redes4gmovil/redes4gmovil.component';
    //guiasTelcomovil
    import { GuiasmovilComponent } from './telcomovil/guiasTelcomovil/guiasmovil/guiasmovil.component';
    import { GuiaopenstackmovilComponent } from './telcomovil/guiasTelcomovil/guiaopenstackmovil/guiaopenstackmovil.component';
    //pruebasTelcomovil
    import { PruebasmovilComponent } from './telcomovil/pruebasTelcomovil/pruebasmovil/pruebasmovil.component';
    import { Escenario1movilComponent } from './telcomovil/pruebasTelcomovil/escenario1movil/escenario1movil.component';
    import { Escenario2movilComponent } from './telcomovil/pruebasTelcomovil/escenario2movil/escenario2movil.component';
    import { GestorpruebasmovilComponent } from './telcomovil/pruebasTelcomovil/gestorpruebasmovil/gestorpruebasmovil.component';
    import { ResultadomovilComponent } from './telcomovil/pruebasTelcomovil/resultadomovil/resultadomovil.component';
    import { GestorresultadosmovilComponent } from './telcomovil/pruebasTelcomovil/gestorresultadosmovil/gestorresultadosmovil.component';

    import { Asideleft4gComponent } from './telcomovil/shared4g/asideleft4g/asideleft4g.component';
    import { Aside4gComponent } from './telcomovil/shared4g/aside4g/aside4g.component';
    import { Contacto4gComponent } from './telcomovil/shared4g/contacto4g/contacto4g.component';
    import { Footer4gComponent } from './telcomovil/shared4g/footer4g/footer4g.component';
    import { Header4gComponent } from './telcomovil/shared4g/header4g/header4g.component';
    import { Principal4gComponent } from './telcomovil/shared4g/principal4g/principal4g.component';
    import { Breadcrumbs4gComponent } from './telcomovil/shared4g/breadcrumbs4g/breadcrumbs4g.component';
    import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeachingComponent } from './telcomovil/teaching/teaching.component';
   // import { Accordion, AccordionModule } from 'ngx-accordion';

@NgModule({
    declarations:[
        ProyectsComponent,
        InformationComponent,
        ArquitecturesComponent,
        TestsComponent,
        GraphsComponent,
        AvailableComponent,
        TestingComponent,
        TestsCreatedComponent,
        NewTestComponent,
        TestComponent,
        ArquitectureComponent,
        GraphComponent,
        GraphNewComponent,
        InformationTemplateComponent,
        GraphTemplateComponent,
        NewServerComponent,
        InformationTemplateComponent,
        // components telco Movil
        Escenario1movilComponent,
        Escenario2movilComponent,
        ForomovilComponent,
        GestorpruebasmovilComponent,
        MenumovilComponent,
        PruebasmovilComponent,
        InformacionmovilComponent,
        ResultadomovilComponent,
        GuiasmovilComponent,
        IniciomovilComponent,
        Redes4gmovilComponent,
        ProtocolosmovilComponent,
        GuiaopenstackmovilComponent,
        GestorresultadosmovilComponent,
        Asideleft4gComponent,
        Aside4gComponent,
        Contacto4gComponent,
        Footer4gComponent,
        Header4gComponent,
        Principal4gComponent,
        Breadcrumbs4gComponent,
        TeachingComponent,
        
    ],
    exports:[
        ProyectsComponent,
        InformationComponent,
        ArquitecturesComponent,
        TestsComponent,
        GraphsComponent,
        AngularMultiSelectModule
        
        
    ],
    imports:[
        ProyectsRoutes,
        SharedModule,
        RouterModule,
        CommonModule,
        ChartsModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        MatSliderModule,
        ReactiveFormsModule,
        BrowserModule,
        InformationModule,
        AngularMultiSelectModule,
        NgbModule
    
        
    ]

})
export class ProyectsModule { }