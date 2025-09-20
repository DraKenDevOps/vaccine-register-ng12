import { Component, OnInit, ViewChild } from "@angular/core";
import { FormService } from "src/app/form-service/form.service";
import {
    District,
    Province,
    Vaccines,
    Location,
    Job,
    Village,
    webstatus,
} from "./district-get";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import * as moment from "moment";
import Swal from "sweetalert2";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import {
    NgxQrcodeElementTypes,
    NgxQrcodeErrorCorrectionLevels,
} from "@techiediaries/ngx-qrcode";
import { countries } from "./counties.store";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: "form-create",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
    styles: [
        `
            .dark-modal .modal-content {
                background-color: #292b2c;
                color: white;
            }
            .dark-modal .close {
                color: white;
            }
            .light-blue-backdrop {
                background-color: #5cb3fd;
            }
        `,
    ],
})
export class FormCreate implements OnInit {
    provinceList: Province[] = [];
    districtList: District[] = [];
    vaccinesList: Vaccines[] = [];
    villageList: Village[] = [];
    locationList: Location[] = [];
    targetlist: Array<any> = [
        { name: "ບຸກຄະລາກອນການແພດ", value: "ບຸກຄະລາກອນການແພດ" },
        {
            name: "ບຸກຄະລາກອນອື່ນທີ່ມີຄວາມສຽງສູງ",
            value: "ບຸກຄະລາກອນອື່ນທີ່ມີຄວາມສຽງສູງ",
        },
        {
            name: "ບຸກຄົນທີ່ຈຳເປັນຕ້ອງເດີນທາງ ເຂົ້າ-ອອກ ປະເທດ",
            value: "ບຸກຄົນທີ່ຈຳເປັນຕ້ອງເດີນທາງ ເຂົ້າ-ອອກ ປະເທດ",
        },
        { name: "ຜູ້ທີ່ເປັນຳພະຍາດຊຳເຮື້ອ", value: "ຜູ້ທີ່ເປັນຳພະຍາດຊຳເຮື້ອ" },
        {
            name: "ຜູ້ສູງອາຍຸ (≥60 ປີຂື້ນໄປ)",
            value: "ຜູ້ສູງອາຍຸ (≥60 ປີຂື້ນໄປ)",
        },
        { name: "ອື່ນໆ", value: "" },
    ];

    jobList: Job[] = [];
    countries = countries;
    usedata: any;
    provinceID: Array<Object> = [];
    districtID: Array<Object> = [];
    mtaget: any = [];
    villageID: Array<Object> = [];
    now1 = new Date();
    lang: any;
    villageinput: any;

    radio1 = false;
    radio2 = false;
    current_date = moment().add(2, "days").format("YYYY-MM-DD");
    current_date_covide = moment().format("YYYY-MM-DD");
    current_date_max = moment().add(20, "days").format("YYYY-MM-DD");
    age_radio1 = false;
    age_radio2 = false;
    age_radio3 = false;
    age_date: any;
    age_calculate: any;
    age_name: any;
    valuetest: any;

    vac1: any;
    vac2: any;
    location_code: Array<Object> = [];

    closeModal: any;
    lex9: any;
    disease: any;
    country_manual: any;
    elementType: any;
    CorrectionLevel: any;
    value: any;
    siteKey = "6LceNVobAAAAAOqEADQI6XTeGyInMVXkCtH7znSW";
    hl = "lo";
    location_name: any;
    vaccin_name: any;
    province_name: any;
    district_name: any;
    nation_name: any;
    show_name: any;
    show_lastname: any;
    show_nation: any;
    show_id: any;
    show_phone: any;
    show_dob: any;
    show_province: any;
    show_district: any;
    show_nationInter: any;
    show_cvin_ref: any;
    show_location: any;
    show_dtg: any;
    web_status: webstatus[] = [];
    web_status_r: any;
    colone: string = "";
    week: string = "";
    @ViewChild("contents") contents: any;

    constructor(
        private service: FormService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        config: NgbModalConfig,
        private spinner: NgxSpinnerService
    ) {
        config.backdrop = "static";
        config.keyboard = false;

        this.service.getPro().subscribe((response) => {
            this.provinceList = response;
        });

        this.service.getVac().subscribe((response) => {
            this.vaccinesList = response;
        });

        this.service.getjob().subscribe((response) => {
            this.jobList = response;
        });

        this.service.getHospital().subscribe((response) => {
            this.locationList = response;
        });

        this.service.getdisease().subscribe((response) => {
            this.disease = response;
        });
        this.service
            .getticket("LHM47VXV") //DP-WHWV61ID
            .subscribe((response) => {});
    }
    registerForm = new FormGroup({});

    submitted = false;

    vaccine_out_stock = false;
    openModal() {
        this.modalService.open(this.contents, { centered: true });
    }
    ngAfterViewInit() {
        if (this.vaccine_out_stock) this.openModal();
    }

    ngOnInit() {
        // this.service.webstatus().subscribe((response) => {
        //   this.web_status = response;
        //   if (this.web_status[0].website_status == '1') {
        //     this.rout.navigate(['register']);
        //   } else if (this.web_status[0].website_status == '0') {
        //     this.rout.navigate(['not-available']);
        //   }
        // });

        let shand = document.getElementsByClassName(
            "countryselected"
        ) as HTMLCollectionOf<HTMLElement>;
        shand[0].style.display = "none";
        let brshow = document.getElementsByClassName(
            "brshow"
        ) as HTMLCollectionOf<HTMLElement>;
        brshow[0].style.display = "none";

        this.registerForm = this.fb.group({
            vac: ["", Validators.required],
            id_vaccine: "",
            vac_details: "",
            location_to_get: ["", Validators.required],
            date_to_get: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
                    ),
                ],
            ],
            name: ["", Validators.required],
            lastName: ["", Validators.required],
            village: ["", Validators.required],
            province: ["", Validators.required],
            district: ["", Validators.required],
            country: "",
            title: ["", Validators.required],
            dob: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
                    ),
                ],
            ],
            islao: ["", Validators.required],
            id_or_passportid: ["", Validators.required],
            phone: ["", Validators.required],
            job: ["", Validators.required],
            email: "",
            recaptcha: ["", Validators.required],
            work_location: ["", Validators.required],
            date_covid: "",
            ques1: ["", Validators.required],
            ques2: ["", Validators.required],
            ques3: ["", Validators.required],
            ques4: ["", Validators.required],
            ques5: ["", Validators.required],
            ques6: ["", Validators.required],
            ques7: ["", Validators.required],
            ques8: ["", Validators.required],
            ques9: ["", Validators.required],
            ques10: ["", Validators.required],
            ques11: "",
            ques12: this.fb.array([], [Validators.required]),
            Disease: ["", Validators.required],
            quse12input: "",
            villageinput: "",
        });
    }
    get f() {
        return this.registerForm.controls;
    }

    onSubmit(content: any, loading: any) {
        if (this.registerForm.value.village != "") {
        } else if (
            this.registerForm.value.vac == "2" &&
            this.registerForm.value.id_vaccine == ""
        ) {
            Swal.fire({
                icon: "warning",
                title: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງຸທ່ານ",
                text: "ກະລຸນາເລືອກປະເພດວັກຊີນ",
            });
        }
        if (
            this.registerForm.value.vac == "2" &&
            this.registerForm.value.vac_details == ""
        ) {
            this.submitted = true;
            Swal.fire({
                icon: "warning",
                title: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງຸທ່ານ",
                text: "ລາຍລະອຽດວິກຊີນເຂັມສອງຍັງມີບ່ອນວ່າງ",
            });
        } else if (
            this.registerForm.value.ques10 == "ຖືພາມາ" &&
            this.registerForm.value.ques11 == ""
        ) {
            this.submitted = true;
            Swal.fire({
                icon: "warning",
                title: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງຸທ່ານ",
                text: "ກະລຸນາປ້ອນ ອາທິດຖືພາ",
            });
        } else if (
            moment(this.registerForm.value.date_to_get)
                .format("dddd")
                .toString() == "Saturday" ||
            moment(this.registerForm.value.date_to_get)
                .format("dddd")
                .toString() == "Sunday"
        ) {
            console.log(
                moment(this.registerForm.value.date_to_get)
                    .format("dddd")
                    .toString()
            );
            Swal.fire({
                icon: "warning",
                title: "ກະລຸນາເລືອກວັນທີໃໝ່",
                text: "ທ່ານ ບໍ່ສາມາດເລືອກວັນເສົົາ ຫຼື ວັນອາທິດໄດ້",
            });
        } else {
            this.submitted = true;

            if (this.registerForm.value.islao == 1) {
                this.country_manual = "Laos";
            } else {
                this.country_manual = this.registerForm.value.country;
            }
            if (
                this.registerForm.value.vac == "1" &&
                this.registerForm.value.id_vaccine == ""
            ) {
                this.lex9 = "9";
            } else {
                this.lex9 = this.registerForm.value.id_vaccine;
            }
            if (this.registerForm.value.quse12input != "") {
                this.colone = ",";
            } else {
                this.colone = "";
            }
            if (this.registerForm.value.ques10 == "ບໍ່ໄດ້ຖືພາ") {
                this.week = "";
                this.registerForm.value.ques11 = "";
            } else if (this.registerForm.value.ques10 == "ຖືພາມາ") {
                this.week = " ອາທິດ";
            }

            console.log(location.pathname, this.registerForm.value);
            const data = {
                id_vaccine: this.lex9,
                dose: this.registerForm.value.vac,
                cvid_ref: this.registerForm.value.vac_details,
                location_to_get: this.registerForm.value.location_to_get,
                date_to_get: this.registerForm.value.date_to_get,
                gender: this.registerForm.value.title,
                name: this.registerForm.value.name,
                lastname: this.registerForm.value.lastName,
                village: this.registerForm.value.village,
                villageinput: this.registerForm.value.villageinput,
                district: this.registerForm.value.district,
                province: this.registerForm.value.province,
                islao: this.registerForm.value.islao, //1 = lao 2 = another
                job: this.registerForm.value.job,
                country: this.country_manual, // COUNTRY
                id_or_passportid: this.registerForm.value.id_or_passportid,
                phone: this.registerForm.value.phone,
                email: this.registerForm.value.email,
                dob: this.registerForm.value.dob,
                workplace: this.registerForm.value.work_location,
                date_covid: this.registerForm.value.date_covid,
                ques1: this.registerForm.value.ques1,
                ques2: this.registerForm.value.ques2,
                ques3: this.registerForm.value.ques3,
                ques4: this.registerForm.value.ques4,
                ques5: this.registerForm.value.ques5,
                ques6: this.registerForm.value.ques6,
                ques7: this.registerForm.value.ques7,
                ques8: this.registerForm.value.ques8,
                ques9: this.registerForm.value.ques9,
                ques10: this.registerForm.value.ques10,
                ques11: this.registerForm.value.ques11 + this.week,
                ques12:
                    this.registerForm.value.ques12.toString() +
                    this.colone +
                    this.registerForm.value.quse12input,
                Disease: this.registerForm.value.Disease,
            };

            console.log(location.pathname, data);
            console.log(
                location.pathname,
                "Assign:Object:",
                Object.assign(this.registerForm.value, data)
            );
            return;
            if (this.registerForm.status == "INVALID") {
                Swal.fire({
                    title: "ກະລຸນາກວດສອບຂໍ້ມູນ",
                    text: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງຸທ່ານ",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "ຕົກລົງ",
                });
            } else if (this.registerForm.status == "VALID") {
                this.vacines_info(this.registerForm.value.id_vaccine);
                this.hospital_info(this.registerForm.value.location_to_get);
                this.province_info(this.registerForm.value.province);
                this.district_info(this.registerForm.value.district);
                Swal.fire({
                    title: "ລະບົບຈອງຄິວ",
                    text: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານ",
                    footer: " ເມື່ອທ່ານລົງທະບຽນສຳເລັດແລ້ວ ທາງເຮົາຈະກວດສອບຂໍ້ມູນແລ້ວ ສົ່ງຂໍ້ຄວາມ ຫຼື SMS ເພື່ອນັດເວລາ ເຂົ້າໄປຮັບວັກຊີນ",
                    imageWidth: 150,
                    imageHeight: 150,
                    imageUrl: "assets/images/newlogobig.jpeg",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ຕົກລົງ",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.spinner.show();
                        this.service.insert_from(data).subscribe((result) => {
                            if (result.resultCode == "00") {
                                this.spinner.hide();
                                this.show_name = this.registerForm.value.name;
                                this.show_lastname =
                                    this.registerForm.value.lastName;
                                // this.show_nation=this.nation_name;
                                this.show_id =
                                    this.registerForm.value.id_or_passportid;
                                this.show_phone = this.registerForm.value.phone;
                                this.show_dob = this.registerForm.value.dob;
                                this.show_province = this.province_name;
                                this.show_district = this.district_name;
                                this.show_nationInter = this.country_manual;
                                this.show_cvin_ref =
                                    this.registerForm.value.vac_details;
                                this.show_location = this.location_name;
                                this.show_dtg =
                                    this.registerForm.value.date_to_get;
                                this.elementType = NgxQrcodeElementTypes.URL;
                                this.value = result.ticket_id;
                                this.CorrectionLevel =
                                    NgxQrcodeErrorCorrectionLevels.HIGH;
                                this.modalService.open(content);
                                return (
                                    this.value,
                                    this.show_name,
                                    this.show_lastname,
                                    this.show_nation,
                                    this.show_id,
                                    this.show_phone,
                                    this.show_dob,
                                    this.show_province,
                                    this.show_district,
                                    this.show_nationInter,
                                    this.show_cvin_ref,
                                    this.show_location,
                                    this.show_dtg
                                );
                            } else if (result.resultCode == "03") {
                                this.spinner.hide();
                                Swal.fire({
                                    icon: "error",
                                    title: "ໂຮງໝໍທີ່ທ່ານເລືອກຖືກຈຳກັດ",
                                    text: "ກະລຸນາເລືອກໂຮງໝໍອື່ນ ຫຼື ປ່ຽນເປັນວັນທີອື່ນ",
                                    confirmButtonText: "ຕົກລົງ",
                                });
                            } else if (result.resultCode == "04") {
                                this.spinner.hide();
                                Swal.fire({
                                    icon: "error",
                                    title: "ກະລຸນາເລືອກວັນທິໃໝ່",
                                    text: "ບໍ່ສາມາດເລືອກວັນທີຈາກຈຸບັນ,ກະລຸນາເລືອກວັນທີທັດໄປ 2 ມື້",
                                    confirmButtonText: "ຕົກລົງ",
                                });
                            } else {
                                this.spinner.hide();
                                Swal.fire({
                                    icon: "warning",
                                    title: "ການສະໝັກລົ້ມເຫຼວ  ",
                                    text: "ກະລຸນາລອງໃໝ້ອີກຄັ້ງ",
                                });
                            }
                        });
                    }
                });
            }
        }
    }

    checkwebstatus() {
        let webstatusON = document.getElementsByClassName(
            "web_on"
        ) as HTMLCollectionOf<HTMLElement>;
        let webstatusOFF = document.getElementsByClassName(
            "web_off"
        ) as HTMLCollectionOf<HTMLElement>;
        webstatusON[0].style.display = "none";
        webstatusOFF[0].style.display = "none";
        if (this.web_status_r == "1") {
            webstatusON[0].style.display = "block";
            webstatusOFF[0].style.display = "none";
        } else if (this.web_status_r == "0") {
            webstatusON[0].style.display = "none";
            webstatusOFF[0].style.display = "block";
        }
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    onItemChange() {}

    onchange() {
        this.service.getDis(this.provinceID).subscribe((response) => {
            this.districtList = response;
            this.districtID = [];
            this.villageID = [];
        });
    }

    disonchange() {
        this.service.getvillage(this.districtID).subscribe((response) => {
            this.villageList = response;
            this.villageID = [];
        });
    }

    changeFn(event: any) {
        if (event.target.value == 2) {
            this.radio1 = true;
        } else {
            this.radio1 = false;
        }
    }

    changeNt(event: any) {
        if (event.target.value == 2) {
            this.radio2 = true;
        } else {
            this.radio2 = false;
        }
    }

    changeAge(event: any) {
        if (event.target.value == 1) {
            this.age_radio1 = true;
        } else {
            this.age_radio1 = false;
        }
        if (event.target.value == 2) {
            this.age_radio2 = true;
        } else {
            this.age_radio2 = false;
        }
        if (event.target.value == 3) {
            this.age_radio3 = true;
        } else {
            this.age_radio3 = false;
        }
    }
    age_cal() {
        // this.age_calculate = this.ageFromDateOfBirthday(this.age_date);
        const today = moment();
        const birthDate = moment(this.age_date);
        const age = today.diff(birthDate, "years");
        this.age_calculate = age;
    }
    SelectCountry(i: any) {
        let shand = document.getElementsByClassName(
            "countryselected"
        ) as HTMLCollectionOf<HTMLElement>;
        if (i == 0) {
            shand[0].style.display = "none";
        } else if (i == 1) {
            shand[0].style.display = "block";
            return;
        }
    }
    brshow(i: any) {
        let brshow = document.getElementsByClassName(
            "brshow"
        ) as HTMLCollectionOf<HTMLElement>;
        brshow[0].style.display = "none";
        if (i == 0) {
            this.registerForm.value.ques11 = "";
            brshow[0].style.display = "none";
        } else if (i == 1) {
            brshow[0].style.display = "block";
            return;
        }
    }

    open(content: any) {
        this.modalService.open(content, { centered: true });
    }

    loading(content: any) {
        this.modalService.open(content, { centered: true });
    }

    reload() {
        window.location.reload();
    }

    onCheckboxChange(e: any) {
        const checkArray: FormArray = this.registerForm.get(
            "ques12"
        ) as FormArray;

        if (e.target.checked) {
            checkArray.push(new FormControl(e.target.value));
        } else {
            const index = checkArray.controls.findIndex(
                (x) => x.value === e.target.value
            );
            checkArray.removeAt(index);
        }
    }

    hospital_info(id: any) {
        switch (id) {
            case "DP":
                this.location_name = "ວັດຈີນດົງປ່າແຫຼບ";
                break;

            case "HF":
                this.location_name = "ໂຮງຫມໍ150";
                break;
            case "ST":
                this.location_name = "ໂຮງໝໍເສດຖາ";
                break;
            case "CH":
                this.location_name = "ໂຮງໝໍເມືອງຈັນ​ທະ​ບູ​ລີ";
                break;
            case "PP":
                this.location_name = "ສະມາຄົມຈີນ";
                break;
            case "KH":
                this.location_name = "ໂຮງໝໍເມືອງສີໂຄດຕະບອງ";
                break;
            case "CC":
                this.location_name = "ສະໂມສອນປົກຄອງເມືອງຈັນທະບຸລີ";
                break;
            case "SS":
                this.location_name = "ມ.ຕ ສີໄຄ";
                break;
            case "SK":
                this.location_name = "ສະໂມສອນປົກຄອງເມືອງສີໂຄດຕະບອງ";
                break;
            case "SH":
                this.location_name = "ໂຮງໝໍເມືອງໄຊ​ເສດ​ຖາ";
                break;
            case "VH":
                this.location_name = "ມ.ສ ມິດຕະພາບລາວຫວຽດ";
                break;
            case "SB":
                this.location_name = "ສະໜາມກິລາຮົມບຶງຂະຫຍອງ";
                break;
            case "NH":
                this.location_name = "ໂຮງໝໍເມືອງສີສັດຕະນາກ";
                break;
            case "EH":
                this.location_name = "ໂຮງໝໍນ້ອຍອີໄລ";
                break;
            case "AH":
                this.location_name = "ໂຮງໝໍເມືອງນາຊາຍທອງ";
                break;
            case "RH":
                this.location_name = "ໂຮງໝໍນ້ອຍໂຄດສີວິໄລ";
                break;
            case "XC":
                this.location_name = "ສະໂມສອນປົກຄອງເມືອງໄຊທານີ";
                break;
            case "XH":
                this.location_name = "ໂຮງໝໍເມືອງໄຊທານີ";
                break;
            case "FH":
                this.location_name = "ໂຮງໝໍເມືອງຫາດຊາຍຟອງ(ຕຶກໃໝ້)";
                break;
            case "NS":
                this.location_name = "ໂຮງໝໍນ້ອຍນາສາ";
                break;
            case "NC":
                this.location_name = "ນາຈະເລີນ";
                break;
            case "HH":
                this.location_name = "ໂຮງໝໍເມືອງຫາດຊາຍຟອງ";
                break;
            case "PH":
                this.location_name = "ໂຮງໝໍນ້ອຍປາກຕອນ";
                break;
            case "UH":
                this.location_name = "ໂຮງໝໍເມືອງສັງທອງ";
                break;
            case "GH":
                this.location_name = "ໂຮງໝໍເມືອງປາກງື່ມ(ຈຸດ 2)";
                break;
            case "DS":
                this.location_name = "ດົງໂພສີ";
                break;
            case "IT":
                this.location_name = "ໄອເຕັກ";
                break;
            case "MH":
                this.location_name = "ໂຮງໝໍເມືອງປາກງື່ມ";
                break;
        }
    }

    vacines_info(id: any) {
        switch (id) {
            case "1":
                this.vaccin_name = "Pfizer";
                break;
            case "2":
                this.vaccin_name = "AstraZeneca";
                break;
            case "3":
                this.vaccin_name = "Sinopharm";
                break;
            case "4":
                this.vaccin_name = "Sputnik";
                break;
            case "5":
                this.vaccin_name = "Covax";
                break;
            case "6":
                this.vaccin_name = "Sinovac";
                break;
            case "7":
                this.vaccin_name = "Moderna";
                break;
            case "8":
                this.vaccin_name = "Jonhson & Jonhson";
                break;
        }
    }

    province_info(id: any) {
        switch (id) {
            case "LA01":
                this.province_name = "ນະຄອນຫຼວງ ວຽງຈັນ";
                break;
            case "LA02":
                this.province_name = "ຜົ້ງສາລີ";
                break;
            case "LA03":
                this.province_name = "ຫຼວງນ້ຳທາ";
                break;
            case "LA04":
                this.province_name = "ອຸດົມໄຊ";
                break;
            case "LA05":
                this.province_name = "ບໍ່ແກ້ວ";
                break;
            case "LA06":
                this.province_name = "ຫຼວງພະບາງ";
                break;
            case "LA07":
                this.province_name = "​ຫົວພັນ";
                break;
            case "LA08":
                this.province_name = "ໄຊຍະບູລີ";
                break;
            case "LA09":
                this.province_name = "ຊຽງຂວາງ";
                break;
            case "LA10":
                this.province_name = "ວຽງຈັນ";
                break;
            case "LA11":
                this.province_name = "ບໍລິຄຳໄຊ";
                break;
            case "LA12":
                this.province_name = "​​ຄຳມ່ວນ";
                break;
            case "LA13":
                this.province_name = "ສະຫວັນນະເຂດ";
                break;
            case "LA14":
                this.province_name = "ສາລະວັນ";
                break;
            case "LA15":
                this.province_name = "ເຊກອງ";
                break;
            case "LA16":
                this.province_name = "ຈຳປາສັກ";
                break;
            case "LA17":
                this.province_name = "ອັດຕະປື";
                break;
            case "LA18":
                this.province_name = "ໄຊສົມບູນ";
                break;
        }
    }

    district_info(id: any) {
        switch (id) {
            case "LA0101":
                this.district_name = "ຈັນທະບູລີ";
                break;
            case "LA0102":
                this.district_name = "ສີໂຄດຕະບອງ";
                break;
            case "LA0103":
                this.district_name = "ໄຊເສດຖາ";
                break;
            case "LA0104":
                this.district_name = "ສີສັດຕະນາກ";
                break;
            case "LA0105":
                this.district_name = "ນາຊາຍທອງ";
                break;
            case "LA0106":
                this.district_name = "ໄຊທານີ";
                break;
            case "LA0107":
                this.district_name = "ຫາດຊາຍຟອງ";
                break;
            case "LA0108":
                this.district_name = "ສັງທອງ";
                break;
            case "LA0109":
                this.district_name = "ປາກງື່ມ";
                break;
            case "LA0201":
                this.district_name = "ຜົ້ງສາລີ";
                break;
            case "LA0202":
                this.district_name = "ໃໝ່";
                break;
            case "LA0203":
                this.district_name = "ຂວາ";
                break;
            case "LA0204":
                this.district_name = "ສໍາພັນ";
                break;
            case "LA0205":
                this.district_name = "ບຸນເໜືອ";
                break;
            case "LA0206":
                this.district_name = "ຍອດອູ";
                break;
            case "LA0207":
                this.district_name = "ບຸນໃຕ້";
                break;
            case "LA0301":
                this.district_name = "ນ້ຳທາ";
                break;
            case "LA0302":
                this.district_name = "ສິງ";
                break;
            case "LA0303":
                this.district_name = "ລອງ";
                break;
            case "LA0304":
                this.district_name = "ວຽງພູຄາ";
                break;
            case "LA0305":
                this.district_name = "ນາແລ";
                break;
            case "LA0401":
                this.district_name = "ໄຊ";
                break;
            case "LA0402":
                this.district_name = "ຫຼາ";
                break;
            case "LA0403":
                this.district_name = "ນາໝໍ້";
                break;
            case "LA0404":
                this.district_name = "ງາ";
                break;
            case "LA0405":
                this.district_name = "ແບງ";
                break;
            case "LA0406":
                this.district_name = "ຮຸນ";
                break;
            case "LA0407":
                this.district_name = "ປາກແບງ";
                break;
            case "LA0501":
                this.district_name = "ຫ້ວຍຊາຍ";
                break;
            case "LA0502":
                this.district_name = "ຕົ້ນເຜີ້ງ";
                break;
            case "LA0503":
                this.district_name = "ເມິງ";
                break;
            case "LA0504":
                this.district_name = "ຜາອຸດົມ";
                break;
            case "LA0505":
                this.district_name = "ປາກທາ";
                break;
            case "LA0601":
                this.district_name = "ນະຄອນ ຫຼວງພະບາງ";
                break;
            case "LA0602":
                this.district_name = "ຊຽງເງິນ";
                break;
            case "LA0603":
                this.district_name = "ນານ";
                break;
            case "LA0604":
                this.district_name = "ປາກອູ";
                break;
            case "LA0605":
                this.district_name = "ນ້ຳບາກ";
                break;
            case "LA0606":
                this.district_name = "ງອຍ";
                break;
            case "LA0607":
                this.district_name = "ປາກແຊງ";
                break;
            case "LA0608":
                this.district_name = "ໂພນໄຊ";
                break;
            case "LA0609":
                this.district_name = "ຈອມເພັດ";
                break;
            case "LA0610":
                this.district_name = "ວຽງຄຳ";
                break;
            case "LA0611":
                this.district_name = "ພູຄູນ";
                break;
            case "LA0612":
                this.district_name = "ໂພນທອງ";
                break;
            case "LA0701":
                this.district_name = "ຊຳເໜືອ";
                break;
            case "LA0702":
                this.district_name = "ຊຽງຄໍ້";
                break;
            case "LA0703":
                this.district_name = "ຮ້ຽມ";
                break;
            case "LA0704":
                this.district_name = "ວຽງໄຊ";
                break;
            case "LA0705":
                this.district_name = "ຫົວເມືອງ";
                break;
            case "LA0706":
                this.district_name = "ຊຳໃຕ້";
                break;
            case "LA0707":
                this.district_name = "ສົບເບົາ";
                break;
            case "LA0708":
                this.district_name = "ແອດ";
                break;
            case "LA0709":
                this.district_name = "ກວັນ";
                break;
            case "LA0710":
                this.district_name = "ຊ່ອນ";
                break;
            case "LA0801":
                this.district_name = "ໄຊຍະບູລີ";
                break;
            case "LA0802":
                this.district_name = "ຄອບ";
                break;
            case "LA0803":
                this.district_name = "ຫົງສາ";
                break;
            case "LA0804":
                this.district_name = "ເງິນ";
                break;
            case "LA0805":
                this.district_name = "ຊຽງຮອນ";
                break;
            case "LA0806":
                this.district_name = "ພຽງ";
                break;
            case "LA0807":
                this.district_name = "ປາກລາຍ";
                break;
            case "LA0808":
                this.district_name = "ແກ່ນທ້າວ";
                break;
            case "LA0809":
                this.district_name = "ບໍ່ແຕນ";
                break;
            case "LA0810":
                this.district_name = "ທົ່ງມີໄຊ";
                break;
            case "LA0811":
                this.district_name = "ໄຊສະຖານ";
                break;
            case "LA0901":
                this.district_name = "ແປກ";
                break;
            case "LA0902":
                this.district_name = "ຄຳ";
                break;
            case "LA0903":
                this.district_name = "ໜອງແຮດ";
                break;
            case "LA0904":
                this.district_name = "ຄູນ";
                break;
            case "LA0905":
                this.district_name = "ໝອກ";
                break;
            case "LA0906":
                this.district_name = "ພູກູດ";
                break;
            case "LA0907":
                this.district_name = "ຜາໄຊ";
                break;
            case "LA1001":
                this.district_name = "ໂພນໂຮງ";
                break;
            case "LA1002":
                this.district_name = "ທຸລະຄົມ";
                break;
            case "LA1003":
                this.district_name = "ແກ້ວອຸດົມ";
                break;
            case "LA1004":
                this.district_name = "ກາສີ";
                break;
            case "LA1005":
                this.district_name = "ວັງວຽງ";
                break;
            case "LA1006":
                this.district_name = "ເຟືອງ";
                break;
            case "LA1007":
                this.district_name = "ຊະນະຄາມ";
                break;
            case "LA1008":
                this.district_name = "ແມດ";
                break;
            case "LA1009":
                this.district_name = "ວຽງຄຳ";
                break;
            case "LA1010":
                this.district_name = "ຫີນເຫີບ";
                break;
            case "LA1013":
                this.district_name = "ໝື່ນ";
                break;
            case "LA1101":
                this.district_name = "ປາກຊັນ";
                break;
            case "LA1102":
                this.district_name = "ທ່າພະບາດ";
                break;
            case "LA1103":
                this.district_name = "ປາກກະດິງ";
                break;
            case "LA1104":
                this.district_name = "ບໍລິຄັນ";
                break;
            case "LA1105":
                this.district_name = "ຄຳເກີດ";
                break;
            case "LA1106":
                this.district_name = "ວຽງທອງ";
                break;
            case "LA1107":
                this.district_name = "ໄຊຈຳພອນ";
                break;
            case "LA1201":
                this.district_name = "ທ່າແຂກ";
                break;
            case "LA1202":
                this.district_name = "ມະຫາໄຊ";
                break;
            case "LA1203":
                this.district_name = "ໜອງບົກ";
                break;
            case "LA1204":
                this.district_name = "ຫີນບູນ";
                break;
            case "LA1205":
                this.district_name = "ຍົມມະລາດ";
                break;
            case "LA1206":
                this.district_name = "ບົວລະພາ";
                break;
            case "LA1207":
                this.district_name = "ນາກາຍ";
                break;
            case "LA1208":
                this.district_name = "ເຊບັ້ງໄຟ";
                break;
            case "LA1209":
                this.district_name = "ໄຊບົວທອງ";
                break;
            case "LA1210":
                this.district_name = "ຄູນຄຳ";
                break;
            case "LA1301":
                this.district_name = "ໄກສອນພົມວິຫານ";
                break;
            case "LA1302":
                this.district_name = "ອຸທຸມພອນ";
                break;
            case "LA1303":
                this.district_name = "ອາດສະພັງທອງ";
                break;
            case "LA1304":
                this.district_name = "ພີນ";
                break;
            case "LA1305":
                this.district_name = "ເຊໂປນ";
                break;
            case "LA1306":
                this.district_name = "ນອງ";
                break;
            case "LA1307":
                this.district_name = "ທ່າປາງທອງ";
                break;
            case "LA1308":
                this.district_name = "ສອງຄອນ";
                break;
            case "LA1309":
                this.district_name = "ຈຳພອນ";
                break;
            case "LA1310":
                this.district_name = "ຊົນບູລີ";
                break;
            case "LA1311":
                this.district_name = "ໄຊບູລີ";
                break;
            case "LA1312":
                this.district_name = "ວິລະບູລີ";
                break;
            case "LA1313":
                this.district_name = "ອາດສະພອນ";
                break;
            case "LA1314":
                this.district_name = "ໄຊພູທອງ";
                break;
            case "LA1315":
                this.district_name = "ພະລານໄຊ";
                break;
            case "LA1401":
                this.district_name = "ສາລະວັນ";
                break;
            case "LA1402":
                this.district_name = "ຕາໂອຍ";
                break;
            case "LA1403":
                this.district_name = "ຕຸ້ມລານ";
                break;
            case "LA1404":
                this.district_name = "ລະຄອນເພັງ";
                break;
            case "LA1405":
                this.district_name = "ວາປີ";
                break;
            case "LA1406":
                this.district_name = "ຄົງເຊໂດນ";
                break;
            case "LA1407":
                this.district_name = "ເລົ່າງາມ";
                break;
            case "LA1408":
                this.district_name = "ສະມ້ວຍ";
                break;
            case "LA1501":
                this.district_name = "ລະມາມ";
                break;
            case "LA1502":
                this.district_name = "7386";
                break;
            case "LA1503":
                this.district_name = "ດັກຈຶງ";
                break;
            case "LA1504":
                this.district_name = "ທ່າແຕງ";
                break;
            case "LA1601":
                this.district_name = "ປາກເຊ";
                break;
            case "LA1602":
                this.district_name = "ຊະນະສົມບູນ";
                break;
            case "LA1603":
                this.district_name = "ບາຈຽງຈະເລີນສຸກ";
                break;
            case "LA1604":
                this.district_name = "ປາກຊ່ອງ";
                break;
            case "LA1605":
                this.district_name = "ປະທຸມພອນ";
                break;
            case "LA1606":
                this.district_name = "ໂພນທອງ";
                break;
            case "LA1607":
                this.district_name = "ຈຳປາສັກ";
                break;
            case "LA1608":
                this.district_name = "ສຸຂຸມາ";
                break;
            case "LA1609":
                this.district_name = "ມຸນລະປະໂມກ";
                break;
            case "LA1610":
                this.district_name = "ໂຂງ";
                break;
            case "LA1701":
                this.district_name = "ໄຊເສດຖາ";
                break;
            case "LA1702":
                this.district_name = "ສາມະຄີໄຊ";
                break;
            case "LA1703":
                this.district_name = "ສະໜາມໄຊ";
                break;
            case "LA1704":
                this.district_name = "ສານໄຊ";
                break;
            case "LA1705":
                this.district_name = "ພູວົງ";
                break;
            case "LA1801":
                this.district_name = "ອະນຸວົງ";
                break;
            case "LA1802":
                this.district_name = "ທ່າໂທມ";
                break;
            case "LA1803":
                this.district_name = "ລ່ອງແຈ້ງ";
                break;
            case "LA1804":
                this.district_name = "ຮົ່ມ";
                break;
            case "LA1805":
                this.district_name = "ລ້ອງຊານ";
                break;
        }
    }

    nation_info(id: any) {
        switch (id) {
            case "1":
                this.nation_name = "ລາວ";
                break;
            case "2":
                this.nation_name = "";
                break;
        }
    }
}
