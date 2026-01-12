import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material-module';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { IndustryService } from '../../../shared/services/industry-service';

@Component({
  selector: 'app-industyform',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './industyform.html',
  styleUrl: './industyform.css',
})
export class Industyform implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;

  mainForm!: FormGroup;
  id!: string | null;
  isEdit = false;
  loading = false;
  isNPL: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private industryService: IndustryService
  )
  {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  this.createForm();

  this.id = this.route.snapshot.paramMap.get('id');
  this.isEdit = !!this.id;

  if (this.isEdit && this.id) {
    this.industryService.getDataById(this.id).subscribe(res => {
      this.patchForm(res);
    });
  } else {
    // ✅ CREATE MODE → show empty forms
    this.ocems_details_array.push(this.createStepTwoForm());
    this.apcd_details_array.push(this.createStepThreeForm());
  }
}

  private createForm() {  
    this.mainForm = this.fb.group({
      industry_details: this.fb.group({
        industry_name: ['', [Validators.required]],
        operational_status: [''],
        sector_category: ['',[Validators.required]],
        district: ['', Validators.required],
        state: ['', Validators.required],
        address: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        pincode: [''],
        ocems_status: ['', Validators.required],
        apcd_status: ['', Validators.required]
      }),

      step2 : this.fb.group({
        ocems_details: this.fb.array([])
      }),
      step3: this.fb.group({
        apcd_details: this.fb.array([])
      })
    });
  }

  private patchForm(data: any) {
    /* -------- Industry Details -------- */
    this.mainForm.get('industry_details')?.patchValue(data);

    /* -------- OCEMS Details -------- */
    const ocemsArray = this.ocems_details_array;
    ocemsArray.clear();

    if (data.ocems_details?.length) {
      data.ocems_details.forEach((item: any) => {
        ocemsArray.push(this.createStepTwoForm(item));
      });
    }

    /* -------- APCD Details -------- */
    const apcdArray = this.apcd_details_array;
    apcdArray.clear();

    if (data.apcd_details?.length) {
      data.apcd_details.forEach((item: any) => {
        apcdArray.push(this.createStepThreeForm(item));
      });
    }
  }


  createStepTwoForm(data?: any): FormGroup {
    const group = this.fb.group({
      ocems_id: [data?.ocems_id ?? null ],
      installed_status: [data?.installed_status, [Validators.required]],
      isdevice_npcl_certified: [data?.isdevice_npcl_certified, [Validators.required]],
      parameter_monitored: [
      Array.isArray(data?.parameter_monitored)
        ? data.parameter_monitored
        : data?.parameter_monitored
          ? data.parameter_monitored.split(',').map((x: string) => x.trim())
          : []
    ],
      npcl_certified_company: [data?.npcl_certified_company],
      manufacturer_name: [data?.manufacturer_name],
      model_number: [data?.model_number],
      npcl_certificate_no: [data?.npcl_certificate_no],
      cost_of_device: [data?.cost_of_device],
      date_of_installation: [data?.date_of_installation],
      connectivity_to_cpcb_server:[data?.connectivity_to_cpcb_server],
      unique_id_ocems_portal:[data?.unique_id_ocems_portal],
      ptz_camera_installed:[data?.ptz_camera_installed],
      ptz_camera_make:[data?.ptz_camera_make],
      ptz_camera_model:[data?.ptz_camera_model]
    });
    return group;
  }

  createStepThreeForm(data?: any): FormGroup {
    return this.fb.group({
      apcd_id: [data?.apcd_id ?? null], 
      source_type: [data?.source_type, [Validators.required]],
      fuel_used: [data?.fuel_used, [Validators.required]],
       attached_apcd_type: [
      Array.isArray(data?.attached_apcd_type)
        ? data.attached_apcd_type
        : data?.attached_apcd_type
          ? data.attached_apcd_type.split(',').map((x: string) => x.trim())
          : []
    ],
      stack_height: [data?.stack_height],
      mpc_empanelled_number: [data?.mpc_empanelled_number],
      inlet_pm: [data?.inlet_pm],
      outlet_pm: [data?.outlet_pm],
      efficiency: [data?.efficiency],
      gas_flow_rate: [data?.gas_flow_rate],
      temperature: [data?.temperature],
      pressure: [data?.pressure],
      remarks: [data?.remarks]
    })
  }

  get industry_details_form(): FormGroup {
    return this.mainForm.get('industry_details') as FormGroup;
  }

  get ocems_details_form(): FormGroup {
    return this.mainForm.get('step2') as FormGroup;
  }

  get ocems_details_array(): FormArray {
    return this.mainForm.get('step2.ocems_details') as FormArray;
  }

  get apcd_details_form(): FormGroup {
    return this.mainForm.get('step3') as FormGroup;
  }

  get apcd_details_array(): FormArray {
    return this.mainForm.get('step3.apcd_details') as FormArray;
  }

  
 addItemInOCEMS(): void {
    this.ocems_details_array.push(this.createStepTwoForm({}));
  }

  removeItemfromOCEMS(index: number): void {
    this.ocems_details_array.removeAt(index);
  }
  
  addItemInAPCD(): void {
    this.apcd_details_array.push(this.createStepThreeForm());
  }

  removeItemfromAPCD(index: number): void {
    this.apcd_details_array.removeAt(index);
  }
  

  private loadData() {
    this.loading = true;
  }

  submit() {
    let payload = this.convetRawDataIntoPayloadFormat(this.mainForm.value);
    if(!this.mainForm.valid) return 
    
    if (this.isEdit && this.id){
      //updATE
        console.log("PATLOAD FOR UPDATE", payload);
        this.industryService.updateIndustry(this.id, payload).subscribe(x=>{
          console.log('data submittupdateded',x)
          alert("data updated")
          this.router.navigate(['/dashboard/industry'])
        });  
    } else{
      //create
      console.log("payload data", payload);
      this.industryService.postIndustryData(payload).subscribe(x=>{
        console.log('data submitted',x)
        alert("data submitted")
        this.router.navigate(['/dashboard/industry'])
      });
    }
    
  }

convetRawDataIntoPayloadFormat(input: any) {
  const industry_details = input?.industry_details || {};
  industry_details.created_by = 'admin';

  const ocems_details = (input?.step2?.ocems_details || [])
    .map((item: any) => {
      const payload: any = {
        ...item,
        parameter_monitored: Array.isArray(item.parameter_monitored)
          ? item.parameter_monitored.join(', ')
          : item.parameter_monitored
      };

      if (!payload.ocems_id) {
        delete payload.ocems_id;
      }

      return payload;
    });

  const apcd_details = (input?.step3?.apcd_details || [])
      .map((item: any) => {
        const payload: any = {
          ...item,
          attached_apcd_type: Array.isArray(item.attached_apcd_type)
            ? item.attached_apcd_type.join(', ')
            : item.attached_apcd_type
        };

        if (!payload.apcd_id) {
          delete payload.apcd_id;
        }

        return payload;
      });

    return {
      industry_details,
      ocems_details,
      apcd_details
    };
  }


  onChange(value: string) {
    this.isNPL = value === 'Yes';
  }

  isNpclYes(group: AbstractControl): boolean {
    return group.get('isdevice_npcl_certified')?.value === 'Yes';
  }

  isConnected(group: AbstractControl): boolean {
    return group.get('connectivity_to_cpcb_server')?.value === 'Connected';
  }

  isPtzInstalled(group: AbstractControl): boolean {
    return group.get('ptz_camera_installed')?.value === 'Yes';
  }
  isPTZCameraInstalled(value: string){
    if(value=="Yes"){
      this.ptzInstalled = true
    } else{
      this.ptzInstalled = false;
    }
  }


  cancel() {
    this.router.navigate(['/industry']);
  }

  onDistrictChange(district: string) {
    const state = this.districtStateMap[district] || '';
    this.mainForm.get('industry_details')?.patchValue({
      state: state
    });
  }

  districtStateMap: Record<string, string> = {
    // Delhi
    Delhi: 'Delhi',
    // Haryana
    Palwal: 'Haryana',
    Faridabad: 'Haryana',
    Gurugram: 'Haryana',
    Panipat: 'Haryana',
    Nuh: 'Haryana',
    Sonipat: 'Haryana',
    Jhajjar: 'Haryana',
    Bhiwani: 'Haryana',
    Rewari: 'Haryana',
    Jind: 'Haryana',
    Rohtak: 'Haryana',
    'Charkhi Dadri': 'Haryana',
    Karnal: 'Haryana',
    Ballabgarh: 'Haryana',
    Mahendergarh: 'Haryana',
    // Rajasthan
    'Kotputali-Behror': 'Rajasthan',
    Alwar: 'Rajasthan',
    'Khairthal-Tijara': 'Rajasthan',
    Deeg: 'Rajasthan',
    // Uttar Pradesh
    'Gautam Budh Nagar': 'Uttar Pradesh',
    Bulandshahr: 'Uttar Pradesh',
    Muzaffarnagar: 'Uttar Pradesh',
    Ghaziabad: 'Uttar Pradesh',
    Hapur: 'Uttar Pradesh',
    Meerut: 'Uttar Pradesh',
    Baghpat: 'Uttar Pradesh',
    Shamli: 'Uttar Pradesh'
  };

  // districts: string[] = [
  //   'Delhi',
  //   'Palwal',
  //   'Faridabad',
  //   'Gurugram',
  //   'Panipat',
  //   'Nuh',
  //   'Sonipat',
  //   'Jhajjar',
  //   'Bhiwani',
  //   'Rewari',
  //   'Jind',
  //   'Rohtak',
  //   'Charkhi Dadri',
  //   'Karnal',
  //   'Ballabgarh',
  //   'Mahendergarh',
  //   'Kotputali-Behror',
  //   'Alwar',
  //   'Khairthal-Tijara',
  //   'Deeg',
  //   'Gautam Budh Nagar',
  //   'Bulandshahr',
  //   'Muzaffarnagar',
  //   'Ghaziabad',
  //   'Hapur',
  //   'Meerut',
  //   'Baghpat',
  //   'Shamli',
  // ];

  parameters: string[] = [];
  ptzInstalled: boolean = false;

  nplCompanies: string[] = [
    'PRIMA Equipment',
    'NEVCO Engineers Pvt Ltd',
    'ACE GAS ANALYSERS PRIVATE LIMITED',
    'Endress+Hauser (India) Pvt. Ltd.',
    'Envea India Private Limited',
    'Horiba India Pvt. Ltd.',
    'Envirozone Instruments & Equipments Pvt. Ltd.',
    'DURAG India / Instrumentation Pvt. Ltd.',
    'Forbes Marshall',
  ];

  // vendors = ['Vendor A', 'Vendor B', 'Vendor C'];
  vendors: any = [
    { value: 'Vendor-A', viewValue: 'Vendor A' },
    { value: 'Vendor-B', viewValue: 'Vendor B' },
    { value: 'Vendor-C', viewValue: 'Vendor C' },
  ];

  updateAPCDOptions(sourceType: string) {
    console.log('Selected source:', sourceType);
    // your logic here
  }
  calculateEfficiency() {
    // Example placeholder logic
    console.log('Recalculate efficiency');
  }

  addAPCDDevice() {
    console.log('add apcv devices');
  }

  get canGoNext(): boolean {
    return (
      this.industry_details_form.get('ocems_status')?.value === 'yes' &&
      this.industry_details_form.get('apcd_status')?.value === 'yes'
    );
  }
  
}
