import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Route } from "@angular/router";
import { AppComponent } from "./app.component";

import { FormCreate } from "./posts/Register/form.component";

import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
import { TicketComponent } from "./posts/Search/ticket.component";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgxSpinnerModule } from "ngx-spinner";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NotAvailableComponent } from "./posts/not-available/not-available.component";

const appRoute: Route[] = [
    { path: "register", component: FormCreate },
    { path: "not-available", component: NotAvailableComponent },
    { path: "search", component: TicketComponent },
    { path: "", redirectTo: "register", pathMatch: "full" },
];
@NgModule({
    declarations: [
        AppComponent,
        FormCreate,
        TicketComponent,
        NotAvailableComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoute),
        BrowserModule,
        HttpClientModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxQRCodeModule,
        NgxCaptchaModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
