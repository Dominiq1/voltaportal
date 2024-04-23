import { gql } from "@apollo/client";

const GET_CRM_USERS = gql`
  mutation {
    GetCRMusers {
      name
      email
      status
      sales
    }
  }
`;

const PUSH_NEW_LEAD = gql`
  mutation PushNewLead(
    $HomeownerName: String!
    $AmbassadorName: String!
    $Address: String!
    $Phone: String!
    $Email: String!
    $DateString: String!
    $UtilityBill: String!
  ) {
    pushNewLead(
      HomeownerName: $HomeownerName
      AmbassadorName: $AmbassadorName
      Address: $Address
      Phone: $Phone
      Email: $Email
      DateString: $DateString
      UtilityBill: $UtilityBill
    )
  }
`;


    const PUSH_NEW_EMPLOYEE = gql`
    mutation pushNewEmployee(
      $name: String!
      $phone: String!
      $email: String!
      $social: String!
      $dob: String!
 
    ) {
      pushNewEmployee(
        name: $name
        phone: $phone
        email: $email
        social: $social
        dob: $dob
    
      )
    }
  `;

const PUSH_NEW_SALE_MUTATION = gql`
  mutation PushNewSale(
    $ownerName: String!
    $saleRep: String!
    $leadGen: String!
    $leadgenEmail: String!
    $utilityImage1: String!
    $utilityImage2: String!
    $utilityImage3: String!
    $utilityImage4: String!
    $utilityImage5: String!
    $utilityImage6: String!
    $utilityImage7: String!
    $atticImage1: String!
    $atticImage2: String!
    $LicenseImage: String!
    $depositImage: String!
    $installer: String!
    $program: String!
    $notes: String!
    $adders: [String]!
    $repEmail: String!
    $design: String
    $designNotes: String
    $mainPanelUpgrade: String
    $mpuNotes: String
    $inverter: String
    $batteries: String
    $batteryQuantity: String
    $batteryMode: String
    $batteryPlacement: String
    $batteryPlacementNotes: String
  ) {
    pushNewSale(
      ownerName: $ownerName
      saleRep: $saleRep
      utilityImage1: $utilityImage1
      utilityImage2: $utilityImage2
      utilityImage3: $utilityImage3
      utilityImage4: $utilityImage4
      utilityImage5: $utilityImage5
      utilityImage6: $utilityImage6
      utilityImage7: $utilityImage7
      atticImage1: $atticImage1
      atticImage2: $atticImage2
      leadGen: $leadGen
      leadgenEmail: $leadgenEmail
      LicenseImage: $LicenseImage
      depositImage: $depositImage
      installer: $installer
      program: $program
      notes: $notes
      adders: $adders
      repEmail: $repEmail
      design: $design
      designNotes: $designNotes
      mainPanelUpgrade: $mainPanelUpgrade
      mpuNotes: $mpuNotes
      inverter: $inverter
      batteries: $batteries
      batteryQuantity: $batteryQuantity
      batteryMode: $batteryMode
      batteryPlacement: $batteryPlacement
      batteryPlacementNotes: $batteryPlacementNotes
    )
  }
`;




const PUSH_NEW_COMPANY_LEAD = gql`
  mutation PushLead(
    $homeowner: String!
    $electricBill: String!
    $primaryStatus: String!
    $secondaryStatus: String!
    $FollowUp: String!
    $Datetime: String!
    $Notes: String!
  ) {
    PushLead(
      homeowner: $homeowner
      electricBill: $electricBill
      primaryStatus: $primaryStatus
      secondaryStatus: $secondaryStatus
      FollowUp: $FollowUp
      Datetime: $Datetime
      Notes: $Notes
    
    )
  }
`;

export { GET_CRM_USERS, PUSH_NEW_SALE_MUTATION, PUSH_NEW_LEAD , PUSH_NEW_COMPANY_LEAD, PUSH_NEW_EMPLOYEE};
