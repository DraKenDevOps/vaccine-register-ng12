import { Component, OnInit } from "@angular/core";
import { FormService } from "src/app/form-service/form.service";
import { Ticket } from "./ticket-interface";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
    styleUrls: ["./ticket.component.css"],
})
export class TicketComponent implements OnInit {
    tiketGet: any;
    getTicket: Ticket[] = [];
    status_cus: any;
    status_cus_name: any;

    constructor(
        private service: FormService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {}

    ticketfun() {
        this.spinner.show();
        this.service
            .getticket(this.tiketGet) //DP-WHWV61ID LHM47VXV
            .subscribe((response) => {
                this.spinner.hide();
                console.log(response);
                if (response.Status == "Error") {
                    // console.log(response.Status)
                    Swal.fire({
                        icon: "error",
                        title: "ບໍ່ພົບຂໍ້ມູນ",
                        text: "ກະລຸນາກວດສອບລະຫັດຂອງທ່ານ",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "ຕົກລົງ",
                    });
                    this.tiketGet == "";
                    return (this.getTicket = []);
                } else if (response.Status == "success") {
                    // console.log("Hello"+response.Status)
                    this.status_cus = response.Result[0].status_cus;
                    switch (this.status_cus) {
                        case "0":
                            this.status_cus_name = "ລົງທະບຽນສຳເລັດ";
                            break;
                        case "1":
                            this.status_cus_name = "ລໍ່ຖ້າຮັບວັກຊີນ";
                            break;
                        case "2":
                            this.status_cus_name = "ສຳເລັດໃນການສັກວັກຊີນ";
                            break;

                        default:
                            break;
                    }
                    return (this.getTicket = response.Result);
                }
                // this.disease=response;
            });
    }
}
