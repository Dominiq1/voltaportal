import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Papa from 'papaparse';
import { DataGrid } from '@mui/x-data-grid';
import { useDropzone } from 'react-dropzone';
import {GET_VOLTAIC_INSTALLS} from '../gql/mutations/VoltaicApp';
import { useMutation } from '@apollo/client';
import {PUSH_VOLTAIC_COGS} from '../gql/mutations/VoltaicFinance'


const columns = [
  { field: 'Name', headerName: 'Name', width: 200 },
  { field: 'Address', headerName: 'Address', width: 300 },
  { field: 'Income', headerName: 'Toal Income', width: 150 },
  // ...define other columns here
];


function parseTotals(arr) {
    const totalObjects = []

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].Name.startsWith("Total ")  ) {
            totalObjects.push(arr[i])
        }
    }


    console.log(totalObjects)
    return totalObjects
}


function getObjectAtIndexN(arr) {


    const personArray = [];
    

        console.log(arr.length - 4)
        console.log("Searching Main Object array..");


      const names = arr[3];
      const Income = arr[4];
      const ConstructionIncome = arr[5];
      const TotalIncome = arr[6];
      const Cogs = arr[7];
      const DirectMaterials = arr[8];
      const Modules = arr[9];
      const Racking = arr[9];
      const Inverter = arr[11];
      const Balance = arr[12];
      const MainServicePannel = arr[13];
      const SalesTax = arr[14];
      const DirectSmallTools = arr[15];
      const QuietCool = arr[16];
      const TotalDirectMaterials = arr[17];
      const SiteSurveys = arr[18];
      const Engineering = arr[19];
      const Permitting = arr[20];
      const SolarPermitting = arr[21];
      const TotalPermitting = arr[22];
      const Inspections = arr[23];
      const Interconnection = arr[24];
      const DirectContractLabor = arr[25];
      const DirectStaffLabor = arr[26];
      const DirectTravel = arr[27];
      const DirectCommissions = arr[28];
      const HomeownerIncentives = arr[29];
      const DirectSolarCommissions = arr[30];
      const DirectNonSolarCommissions = arr[31];
      const HomeownerReimbursements = arr[32];
      const TotalDirectCommissions = arr[33];
      const TotalCostOfGoods = arr[34];
      const GrossProfit = arr[35];
      const Expenses = arr[36];
      const IndirectExpenses = arr[37];
      const QuickbooksPaymentsFees = arr[38];
      const SmallToolsAndEquipment = arr[39];
      const InsuranceExpenses = arr[40];
      const OfficeSupplies = arr[41];
      const InterestExpense = arr[42];
      const DuesAndSubs = arr[43];
      const BankCharges = arr[44];
      const BusinessLicenses = arr[45];
      const Indirecttravel = arr[46];
      const Meals = arr[47];
      const IndirectPayrollCosts = arr[48];
      const StaffSalaries = arr[49];
      const PayrollTaxes = arr[50];
      const PayrollProcessingFees = arr[51];
      const WorkersComp = arr[52];
      const Garnishments = arr[53];
      const TotalIndirectPayrollCosts = arr[54];
      const LegalAndProFees = arr[55];
      const ConsultingAndOtherServices = arr[56];
      const TotalLegalAndProFees = arr[57];
      const PostageAndShipping = arr[58];
      const Uniforms = arr[59];
      const IndirectContractLabor = arr[60];
      const AutoLeases = arr[61];
      const FordMavericLease = arr[62];
      const FordTransitVanLease = arr[63];
      const TotalAutoLease = arr[64];
      const ReimburseableExpense = arr[65];
      const AutoMaintenenceAndRepairs = arr[62];
      const Fuel = arr[67];
      const Software = arr[68];
      const TotalIndirectExpense = arr[69];
      const GeneralAdminExpenses = arr[70];
      const RentAndLease = arr[71];
      const Utilities = arr[72];
      const TotalGeneralAdminExpenses = arr[73];

      const TotalExpenses = arr[74];
      const NetOperatingIncome = arr[75];
      const NetIncome = arr[76];
 
    //   const DirectTravel = arr[i];
    
      for (const key in names) {

        if (names.hasOwnProperty(key) && NetIncome.hasOwnProperty(key)) {
            
            
            personArray.push({
                Name: names[key],
                NetIncome: NetIncome[key],
                TotalDirectCommissions: TotalDirectCommissions[key],
                GrossProfit: GrossProfit[key],
                Income: Income[key],
                ConstructionIncome: ConstructionIncome[key],
                TotalIncome: TotalIncome[key],
                Cogs: Cogs[key],
                DirectMaterials: DirectMaterials[key],
                Modules: Modules[key],
                Racking: Racking[key],
                Inverter: Inverter[key],
                Balance: Balance[key],
                MainServicePannel: MainServicePannel[key],
                SalesTax: SalesTax[key],
                DirectSmallTools: DirectSmallTools[key],
                QuietCool: QuietCool[key],
                TotalDirectMaterials: TotalDirectMaterials[key],
                SiteSurveys: SiteSurveys[key],
                Engineering: Engineering[key],
                Permitting: Permitting[key],
                SolarPermitting: SolarPermitting[key],
                TotalPermitting: TotalPermitting[key],
                Inspections: Inspections[key],
                Interconnection: Interconnection[key],
                DirectContractLabor: DirectContractLabor[key],
                DirectStaffLabor: DirectStaffLabor[key],
                DirectTravel: DirectTravel[key],
                DirectCommissions: DirectCommissions[key],
                HomeownerIncentives: HomeownerIncentives[key],
                DirectSolarCommissions: DirectSolarCommissions[key],
                DirectNonSolarCommissions: DirectNonSolarCommissions[key],
                HomeownerReimbursements: HomeownerReimbursements[key],
                TotalDirectCommissions: TotalDirectCommissions[key],
                TotalCostOfGoods: TotalCostOfGoods[key],
                GrossProfit: GrossProfit[key],
                Expenses: Expenses[key],
                IndirectExpenses: IndirectExpenses[key],
                QuickbooksPaymentsFees: QuickbooksPaymentsFees[key],
                SmallToolsAndEquipment: SmallToolsAndEquipment[key],
                InsuranceExpenses: InsuranceExpenses[key],
                OfficeSupplies: OfficeSupplies[key],
                InterestExpense: InterestExpense[key],
                DuesAndSubs: DuesAndSubs[key],
                BankCharges: BankCharges[key],
                BusinessLicenses: BusinessLicenses[key],
                Indirecttravel: Indirecttravel[key],
                Meals: Meals[key],
                IndirectPayrollCosts: IndirectPayrollCosts[key],
                StaffSalaries: StaffSalaries[key],
                PayrollTaxes: PayrollTaxes[key],
                PayrollProcessingFees: PayrollProcessingFees[key],
                WorkersComp: WorkersComp[key],
                Garnishments: Garnishments[key],
                TotalIndirectPayrollCosts: TotalIndirectPayrollCosts[key],
                LegalAndProFees: LegalAndProFees[key],
                ConsultingAndOtherServices: ConsultingAndOtherServices[key],
                TotalLegalAndProFees: TotalLegalAndProFees[key],
                PostageAndShipping: PostageAndShipping[key],
                Uniforms: Uniforms[key],
                IndirectContractLabor: IndirectContractLabor[key],
                AutoLeases: AutoLeases[key],
                FordMavericLease: FordMavericLease[key],
                FordTransitVanLease: FordTransitVanLease[key],
                TotalAutoLease: TotalAutoLease[key],
                ReimburseableExpense: ReimburseableExpense[key],
                AutoMaintenenceAndRepairs: AutoMaintenenceAndRepairs[key],
                Fuel: Fuel[key],
                Software: Software[key],
                TotalIndirectExpense: TotalIndirectExpense[key],
                GeneralAdminExpenses: GeneralAdminExpenses[key],
                RentAndLease: RentAndLease[key],
                Utilities: Utilities[key],
                TotalGeneralAdminExpenses: TotalGeneralAdminExpenses[key],
                TotalExpenses: TotalExpenses[key],
                NetOperatingIncome: NetOperatingIncome[key],
                NetIncome: NetIncome[key],


        
            });
        }


      } 

        console.log(personArray);
        alert("Full Users")
        return personArray;

    
  }
  

function App() {
  const [csvData, setCsvData] = useState([]);


  const [ voltaicProjects, setVoltaicProjects ] = useState([ ]);

  const [getVoltaicInstalls, { data }] = useMutation(GET_VOLTAIC_INSTALLS);

  const [pushCogs, {cogData}] = useMutation(PUSH_VOLTAIC_COGS);

 
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const text = await file.text();
      const { data } = Papa.parse(text, { header: true });
      const rows = data.map((row, index) => ({ ...row, id: index }));

      console.log(rows);
      


      const quickbooksPorjects =  parseTotals(getObjectAtIndexN(data));

        //Loop through projects set in useeffect and compare to quickbooks projects
        //If they match, update the project with the quickbooks data   
        
        const NamelessProjects = [];
        const NamedProjects = [];

        const readyCOGs = [];

        console.log("Quickbooks Projects");
        console.log(quickbooksPorjects);

        console.log("Voltaic Projects");
        console.log(voltaicProjects);

        for (let i = 0; i < quickbooksPorjects.length; i++) {
            let isMatchFound = false;
          
            for (let j = 0; j < voltaicProjects.length; j++) {
              const str = quickbooksPorjects[i].Name;
          
              const lastSpaceIndex = str.lastIndexOf(' ');
              const secondLastSpaceIndex = str.lastIndexOf(' ', lastSpaceIndex - 1);
              const ownerName = secondLastSpaceIndex === -1 ? str : str.substring(secondLastSpaceIndex + 1);
          
              if (ownerName === voltaicProjects[j].ownerName) {
                console.log("Match Found");
                console.log(ownerName);
                console.log(voltaicProjects[j].ownerName);
          
                const final = { ...voltaicProjects[j], ...quickbooksPorjects[i] };
                NamedProjects.push(final);
                isMatchFound = true;
                break; // exit the inner loop since a match is found
              }
            }
          
            // If no match is found for the current quickbooksPorjects item
            if (!isMatchFound) {
              console.log("No Match Found");
              console.log(quickbooksPorjects[i].Name);
              NamelessProjects.push(quickbooksPorjects[i]);
            }
          }
          

        // for(let i = 0; i < quickbooksPorjects.length; i++) {

        //     const namedProject = {}


        //     for(let j = 0; j < voltaicProjects.length; j++) {

        //         const str = quickbooksPorjects[i].Name;

        //         const lastSpaceIndex = str.lastIndexOf(' ');
        //      //   const ownerName = str.substring(lastSpaceIndex + 1);
        //         const secondLastSpaceIndex = str.lastIndexOf(' ', lastSpaceIndex - 1);
        //         const ownerName = secondLastSpaceIndex === -1 ? str : str.substring(secondLastSpaceIndex + 1);
               
        //         if(ownerName == voltaicProjects[j].ownerName) {
        //             console.log("Match Found");
        //             console.log(ownerName);
        //             console.log(voltaicProjects[j].ownerName);

        //             const final = {...voltaicProjects[j], ...quickbooksPorjects[i]};
        //             NamedProjects.push(final);

        //         }else if(ownerName != voltaicProjects[j].ownerName && j == voltaicProjects.length - 1) {
        //             console.log("No Match Found");
        //             console.log(ownerName);
        //             NamelessProjects.push(voltaicProjects[j]);
                   
        //         }




            
        //     }}

            console.log("Named Projects");
            console.log(NamedProjects);
            

            // for(let i = 0; i < NamedProjects.length; i++) {


            //   for (let key in NamedProjects[i]) {
            //     if (typeof NamedProjects[i][key] === "string" && /\d/.test(NamedProjects[i][key])) {
            //       const dollarStripped = NamedProjects[i][key].replace(/[^\d.-]/g, "");
            //       const dollarsCents = Math.round(parseFloat(dollarStripped) * 100);
            //       NamedProjects[i][key] = dollarsCents;
                 
            //     }
            //   }

            //   readyCOGs.push(NamedProjects[i]);

            // }









            // console.log("Nameless Projects");
            // console.log(NamelessProjects);

            console.log("Ready COGs");
            console.log(readyCOGs);

      
      setCsvData(rows);
    },
  });


const handlePushCogs = async (user) => {

  await pushCogs({ variables: {

    HomeownerName: "Anthony  Robinson",
    HardModules : "2,055.47",
    HardRacking : "12",
    HardInverter : "12",
    Balance: "12",
    MainServicePannel: "12",
    SalesTax: "12",
    Tools: "12",
    QuietCool: "39",
    SiteSurveys: "40",
    Engineering: "41",
    RoofPermitting: "42",
    SolarPermitting: "43",
    Inspections: "44",
    Interconnection: "45",
    DirectContractLabor: "46",
    DirectStaffLabor: "47",
    DirectTravel : "48",
    DirectCommissions: "49",
    CostHomeownerIncentives: "50",
    DirectSolarCommissions: "51",
    DirectNonSolarCommissions: "52",
    HomeownerReimbursements: "53",
    SoftCostHomeownerIncentives: "54",

  }}).then((response) => {
    console.log(response.data.PushVoltaicCogs);
  }).catch((error) => {
    console.log(error);

});
}


  useEffect(() => {
    getVoltaicInstalls().then((response) => {
      console.log(response.data.GetVoltaicInstalls);
      setVoltaicProjects(response.data.GetVoltaicInstalls);


    //   alert("Data has been sent to the server");



    });
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {csvData.length === 0 ? (

        <Box> 

        <Box
          sx={{
       
            width: '50vw',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Button
            variant="contained"
            component="label"
            sx={{ marginBottom: '16px' }}
          >
            Upload CSV File
          </Button>

    
        </Box>
        <Button onClick={handlePushCogs}>
            <p>Push Cog test</p>
          </Button>
</Box>



      ) : (

        <Box sx={{ width: '60vw', height: '100%'}}> 

        <DataGrid rows={csvData} columns={columns} />

        </Box>

      )}
    </Box>
  );
}

export default App;











// import React, { useState } from 'react';
// import { Box, Button } from '@mui/material';
// import Papa from 'papaparse';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDropzone } from 'react-dropzone';

// const columns = [
//   { field: 'Name', headerName: 'Name', width: 200 },
//   { field: 'Address', headerName: 'Address', width: 300 },
//   { field: 'Income', headerName: 'Toal Income', width: 150 },
//   // ...define other columns here
// ];





// function getObjectAtIndexN(arr) {


//     const personArray = [];
    

//         console.log(arr.length - 4)
//         console.log("Searching Main Object array..");


//       const names = arr[3];
//       const Income = arr[4];
//       const ConstructionIncome = arr[5];
//       const TotalIncome = arr[6];
//       const Cogs = arr[7];
//       const DirectMaterials = arr[8];
//       const Modules = arr[9];
//       const Racking = arr[9];
//       const Inverter = arr[11];
//       const Balance = arr[12];
//       const MainServicePannel = arr[13];
//       const SalesTax = arr[14];
//       const DirectSmallTools = arr[15];
//       const QuietCool = arr[16];
//       const TotalDirectMaterials = arr[17];
//       const SiteSurveys = arr[18];
//       const Engineering = arr[19];
//       const Permitting = arr[20];
//       const SolarPermitting = arr[21];
//       const TotalPermitting = arr[22];
//       const Inspections = arr[23];
//       const Interconnection = arr[24];
//       const DirectContractLabor = arr[25];
//       const DirectStaffLabor = arr[26];
//       const DirectTravel = arr[27];
//       const DirectCommissions = arr[28];
//       const HomeownerIncentives = arr[29];
//       const DirectSolarCommissions = arr[30];
//       const DirectNonSolarCommissions = arr[31];
//       const HomeownerReimbursements = arr[32];
//       const TotalDirectCommissions = arr[33];
//       const TotalCostOfGoods = arr[34];
//       const GrossProfit = arr[35];
//       const Expenses = arr[36];
//       const IndirectExpenses = arr[37];
//       const QuickbooksPaymentsFees = arr[38];
//       const SmallToolsAndEquipment = arr[39];
//       const InsuranceExpenses = arr[40];
//       const OfficeSupplies = arr[41];
//       const InterestExpense = arr[42];
//       const DuesAndSubs = arr[43];
//       const BankCharges = arr[44];
//       const BusinessLicenses = arr[45];
//       const Indirecttravel = arr[46];
//       const Meals = arr[47];
//       const IndirectPayrollCosts = arr[48];
//       const StaffSalaries = arr[49];
//       const PayrollTaxes = arr[50];
//       const PayrollProcessingFees = arr[51];
//       const WorkersComp = arr[52];
//       const Garnishments = arr[53];
//       const TotalIndirectPayrollCosts = arr[54];
//       const LegalAndProFees = arr[55];
//       const ConsultingAndOtherServices = arr[56];
//       const TotalLegalAndProFees = arr[57];
//       const PostageAndShipping = arr[58];
//       const Uniforms = arr[59];
//       const IndirectContractLabor = arr[60];
//       const AutoLeases = arr[61];
//       const FordMavericLease = arr[62];
//       const FordTransitVanLease = arr[63];
//       const TotalAutoLease = arr[64];
//       const ReimburseableExpense = arr[65];
//       const AutoMaintenenceAndRepairs = arr[62];
//       const Fuel = arr[67];
//       const Software = arr[68];
//       const TotalIndirectExpense = arr[69];
//       const GeneralAdminExpenses = arr[70];
//       const RentAndLease = arr[71];
//       const Utilities = arr[72];
//       const TotalGeneralAdminExpenses = arr[73];
      
//       const TotalExpenses = arr[74];
//       const NetOperatingIncome = arr[75];
//       const NetIncome = arr[76];
 
//     //   const DirectTravel = arr[i];
    
//       for (let j = 0; j <423  ; j++) {
//         // const person = {};
//         console.log("Searching Sub Object array..");


//         console.log(names[j]);
//         console.log(names["_1"]);
//         alert("name");

//         const person = {
//             name: names[j],
//             Income: Income[j],
//             ConstructionIncome: ConstructionIncome[j],
//             TotalIncome: TotalIncome[j],
//             Cogs: Cogs[j],
//             DirectMaterials: DirectMaterials[j],
//             Modules: Modules[j],
//             Racking: Racking[j],
//             Inverter: Inverter[j],
//             Balance: Balance[j],
//             MainServicePannel: MainServicePannel[j],
//             SalesTax: SalesTax[j],
//             DirectSmallTools: DirectSmallTools[j],
//             QuietCool: QuietCool[j],
//             TotalDirectMaterials: TotalDirectMaterials[j],
//             SiteSurveys: SiteSurveys[j],
//             Engineering: Engineering[j],
//             Permitting: Permitting[j],
//             SolarPermitting: SolarPermitting[j],
//             TotalPermitting: TotalPermitting[j],
//             Inspections: Inspections[j],
//             Interconnection: Interconnection[j],
//             DirectContractLabor: DirectContractLabor[j],
//             DirectStaffLabor: DirectStaffLabor[j],
//             DirectTravel: DirectTravel[j],
//             DirectCommissions: DirectCommissions[j],
//             HomeownerIncentives: HomeownerIncentives[j],
//             DirectSolarCommissions: DirectSolarCommissions[j],
//             DirectNonSolarCommissions: DirectNonSolarCommissions[j],
//             HomeownerReimbursements: HomeownerReimbursements[j],
//             TotalDirectCommissions: TotalDirectCommissions[j],
//             TotalCostOfGoods: TotalCostOfGoods[j],
//             GrossProfit: GrossProfit[j],
//             Expenses: Expenses[j],
//             IndirectExpenses: IndirectExpenses[j],
//             QuickbooksPaymentsFees: QuickbooksPaymentsFees[j],
//             SmallToolsAndEquipment: SmallToolsAndEquipment[j],
//             InsuranceExpenses: InsuranceExpenses[j],
//             OfficeSupplies: OfficeSupplies[j],
//             InterestExpense: InterestExpense[j],
//             DuesAndSubs: DuesAndSubs[j],
//             BankCharges: BankCharges[j],
//             BusinessLicenses: BusinessLicenses[j],
//             Indirecttravel: Indirecttravel[j],
//             Meals: Meals[j],
//             IndirectPayrollCosts: IndirectPayrollCosts[j],
//             StaffSalaries: StaffSalaries[j],
//             PayrollTaxes: PayrollTaxes[j],
//             PayrollProcessingFees: PayrollProcessingFees[j],
//             WorkersComp: WorkersComp[j],
//             Garnishments: Garnishments[j],
//             TotalIndirectPayrollCosts: TotalIndirectPayrollCosts[j],
//             LegalAndProFees: LegalAndProFees[j],
//             ConsultingAndOtherServices: ConsultingAndOtherServices[j],
//             TotalLegalAndProFees: TotalLegalAndProFees[j],
//             PostageAndShipping: PostageAndShipping[j],
//             Uniforms: Uniforms[j],
//             IndirectContractLabor: IndirectContractLabor[j],
//             AutoLeases: AutoLeases[j],
//             FordMavericLease: FordMavericLease[j],
//             FordTransitVanLease: FordTransitVanLease[j],
//             TotalAutoLease: TotalAutoLease[j],
//             ReimburseableExpense: ReimburseableExpense[j],
//             AutoMaintenenceAndRepairs: AutoMaintenenceAndRepairs[j],
//             Fuel: Fuel[j],
//             Software: Software[j],
//             TotalIndirectExpense: TotalIndirectExpense[j],
//             GeneralAdminExpenses: GeneralAdminExpenses[j],
//             RentAndLease: RentAndLease[j],
//             Utilities: Utilities[j],
//             TotalGeneralAdminExpenses: TotalGeneralAdminExpenses[j],
//             TotalExpenses: TotalExpenses[j],
//             NetOperatingIncome: NetOperatingIncome[j],
//             NetIncome: NetIncome[j],
            
//         }
    
//         // person.name = names[j];
//         // person.Income = Income[j];
//         // person.ConstructionIncome = ConstructionIncome[j];
//         // person.TotalIncome = TotalIncome[j];
//         // person.Cogs = Cogs[j];
//         // person.DirectMaterials = DirectMaterials[j];
//         // person.Modules = Modules[j];
//         // person.Racking = Racking[j];
//         // person.Inverter = Inverter[j];
//         // person.Balance = Balance[j];
//         // person.MainServicePannel = MainServicePannel[j];
//         // person.SalesTax = SalesTax[j];
//         // person.DirectSmallTools = DirectSmallTools[j];
//         // person.QuietCool = QuietCool[j];
//         // person.TotalDirectMaterials = TotalDirectMaterials[j];
//         // person.SiteSurveys = SiteSurveys[j];
//         // person.Engineering = Engineering[j];
//         // person.Permitting = Permitting[j];
//         // person.SolarPermitting = SolarPermitting[j];
//         // person.TotalPermitting = TotalPermitting[j];
//         // person.Inspections = Inspections[j];
//         // person.Interconnection = Interconnection[j];
//         // person.DirectContractLabor = DirectContractLabor[j];
//         // person.DirectStaffLabor = DirectStaffLabor[j];
//         // person.DirectTravel = DirectTravel[j];
//         // person.DirectCommissions = DirectCommissions[j];
//         // person.HomeownerIncentives = HomeownerIncentives[j];
//         // person.DirectSolarCommissions = DirectSolarCommissions[j];
//         // person.DirectNonSolarCommissions = DirectNonSolarCommissions[j];
//         // person.HomeownerReimbursements = HomeownerReimbursements[j];
//         // person.TotalDirectCommissions = TotalDirectCommissions[j];
//         // person.TotalCostOfGoods = TotalCostOfGoods[j];
//         // person.GrossProfit = GrossProfit[j];
//         // person.Expenses = Expenses[j];
//         // person.IndirectExpenses = IndirectExpenses[j];
//         // person.QuickbooksPaymentsFees = QuickbooksPaymentsFees[j];
//         // person.SmallToolsAndEquipment = SmallToolsAndEquipment[j];
//         // person.InsuranceExpenses = InsuranceExpenses[j];
//         // person.OfficeSupplies = OfficeSupplies[j];
//         // person.InterestExpense = InterestExpense[j];
//         // person.DuesAndSubs = DuesAndSubs[j];
//         // person.BankCharges = BankCharges[j];
//         // person.BusinessLicenses = BusinessLicenses[j];
//         // person.Indirecttravel = Indirecttravel[j];
//         // person.Meals = Meals[j];
//         // person.IndirectPayrollCosts = IndirectPayrollCosts[j];
//         // person.StaffSalaries = StaffSalaries[j];
//         // person.PayrollTaxes = PayrollTaxes[j];
//         // person.PayrollProcessingFees = PayrollProcessingFees[j];
//         // person.WorkersComp = WorkersComp[j];
//         // person.Garnishments = Garnishments[j];
//         // person.TotalIndirectPayrollCosts = TotalIndirectPayrollCosts[j];
//         // person.LegalAndProFees = LegalAndProFees[j];
//         // person.ConsultingAndOtherServices = ConsultingAndOtherServices[j];
//         // person.TotalLegalAndProFees = TotalLegalAndProFees[j];
//         // person.PostageAndShipping = PostageAndShipping[j];
//         // person.Uniforms = Uniforms[j];
//         // person.IndirectContractLabor = IndirectContractLabor[j];
//         // person.AutoLeases = AutoLeases[j];
//         // person.FordMavericLease = FordMavericLease[j];
//         // person.FordTransitVanLease = FordTransitVanLease[j];
//         // person.TotalAutoLease = TotalAutoLease[j];
//         // person.ReimburseableExpense = ReimburseableExpense[j];
//         // person.AutoMaintenenceAndRepairs = AutoMaintenenceAndRepairs[j];
//         // person.Fuel = Fuel[j];
//         // person.Software = Software[j];
//         // person.TotalIndirectExpense = TotalIndirectExpense[j];
//         // person.GeneralAdminExpenses = GeneralAdminExpenses[j];
//         // person.RentAndLease = RentAndLease[j];
//         // person.Utilities = Utilities[j];
//         // person.TotalGeneralAdminExpenses = TotalGeneralAdminExpenses[j];
//         // person.TotalExpenses = TotalExpenses[j];
//         // person.NetOperatingIncome = NetOperatingIncome[j];
//         // person.NetIncome = NetIncome[j];

//         console.log(person);
//          alert("Full User")

//         personArray.push(person);


//       } 

//         console.log(personArray);
//         alert("Full Users")
//         return personArray;

    
//   }
  

// function App() {
//   const [csvData, setCsvData] = useState([]);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: '.csv',
//     onDrop: async (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       const text = await file.text();
//       const { data } = Papa.parse(text, { header: true });
//       const rows = data.map((row, index) => ({ ...row, id: index }));

//       console.log(rows);
      


//       console.log(getObjectAtIndexN(data));

      
//       setCsvData(rows);
//     },
//   });

//   return (
//     <Box
//       sx={{
//         width: '100vw',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       {csvData.length === 0 ? (
//         <Box
//           sx={{
       
//             width: '50vw',
//             height: '80vh',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           {...getRootProps()}
//         >
//           <input {...getInputProps()} />
//           <Button
//             variant="contained"
//             component="label"
//             sx={{ marginBottom: '16px' }}
//           >
//             Upload CSV File
//           </Button>
//           <p>Drag 'n' drop a CSV file here, or click to select a file</p>
//         </Box>
//       ) : (

//         <Box sx={{ width: '60vw', height: '100%'}}> 

//         <DataGrid rows={csvData} columns={columns} />

//         </Box>

//       )}
//     </Box>
//   );
// }

// export default App;
