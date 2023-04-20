import { gql } from '@apollo/client';

const PUSH_VOLTAIC_COGS = gql`
  mutation PushVoltaicCogs(
    $HomeownerName: String!,
    $HardModules: String!,
    $HardRacking: String!, 
    $HardInverter: String!, 
    $Balance: String!, 
    $MainServicePannel: String!, 
    $SalesTax: String!, 
    $Tools: String! ,
    $QuietCool: String!, 
    $SiteSurveys: String!, 
    $Engineering: String!, 
    $RoofPermitting: String! ,
    $SolarPermitting: String!, 
    $Inspections: String!, 
    $Interconnection: String!, 
    $DirectContractLabor: String!, 
    $DirectStaffLabor: String!, 
    $DirectTravel: String!, 
    $DirectCommissions: String!,
    $CostHomeownerIncentives: String!, 
    $DirectSolarCommissions: String!, 
    $DirectNonSolarCommissions: String!, 
    $HomeownerReimbursements: String!, 
    $SoftCostHomeownerIncentives: String!
  ) {
    pushVoltaicCogs(
      HomeownerName: $HomeownerName,
      HardModules: $HardModules,
      HardRacking: $HardRacking, 
      HardInverter: $HardInverter, 
      Balance: $Balance, 
      MainServicePannel: $MainServicePannel, 
      SalesTax: $SalesTax, 
      Tools: $Tools ,
      QuietCool: $QuietCool, 
      SiteSurveys: $SiteSurveys, 
      Engineering: $Engineering, 
      RoofPermitting: $RoofPermitting ,
      SolarPermitting: $SolarPermitting, 
      Inspections: $Inspections, 
      Interconnection: $Interconnection, 
      DirectContractLabor: $DirectContractLabor, 
      DirectStaffLabor: $DirectStaffLabor, 
      DirectTravel: $DirectTravel, 
      DirectCommissions: $DirectCommissions,
      CostHomeownerIncentives: $CostHomeownerIncentives, 
      DirectSolarCommissions: $DirectSolarCommissions, 
      DirectNonSolarCommissions: $DirectNonSolarCommissions, 
      HomeownerReimbursements: $HomeownerReimbursements, 
      SoftCostHomeownerIncentives: $SoftCostHomeownerIncentives
    )
  }
`;


export  {PUSH_VOLTAIC_COGS};
