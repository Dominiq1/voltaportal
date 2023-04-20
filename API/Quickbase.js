
// import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
// import axios from 'axios';

// const API_URL = "https://api.quickbase.com/v1/records/query";
// const USER_TOKEN = "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3";
// const QB_DOMAIN = "voltaic.quickbase.com";

// const resolverFunctions = {
//   Mutation: {
//     GetVoltaicInstalls: {
//       type: new GraphQLList(GraphQLString),
//       args: {
//         date: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       async resolve(parent, args) {
//         const requestBody = {
//           from: "br5cqr4r3",
//           sortBy: [
//             { fieldId: 92, order: "ASC" },
//             { fieldId: 915, order: "ASC" },
//             { fieldId: 862, order: "ASC" },
//             { fieldId: 1346, order: "ASC" },
//             { fieldId: 856, order: "ASC" },
//             { fieldId: 1831, order: "ASC" },
//             { fieldId: 1818, order: "ASC" },
//             { fieldId: 1840, order: "ASC" },
//             { fieldId: 408, order: "ASC" },
//             { fieldId: 914, order: "ASC" },
//             { fieldId: 1819, order: "ASC" },
//             { fieldId: 861, order: "ASC" },
//             { fieldId: 1830, order: "ASC" },
//             { fieldId: 876, order: "ASC" },
//             { fieldId: 855, order: "ASC" },
//             { fieldId: 1839, order: "ASC" },
//             { fieldId: 646, order: "ASC" },
//             { fieldId: 3, order: "ASC" },
//             { fieldId: 634, order: "ASC" },
//           ],
//           groupBy: [
//             { fieldId: 105, grouping: "equal-values" },
//             { fieldId: 408, grouping: "equal-values" },
//             { fieldId: 915, grouping: "equal-values" },
//             { fieldId: 862, grouping: "equal-values" },
//             { fieldId: 1346, grouping: "equal-values" },
//             { fieldId: 856, grouping: "equal-values" },
//             { fieldId: 1831, grouping: "equal-values" },
//             { fieldId: 1818, grouping: "equal-values" },
//             { fieldId: 1840, grouping: "equal-values" },
//             { fieldId: 914, grouping: "equal-values" },
//             { fieldId: 1819, grouping: "equal-values" },
//             { fieldId: 861, grouping: "equal-values" },
//                        { fieldId: 1830, grouping: "equal-values" },
//                        { fieldId: 876, grouping: "equal-values" },
//                       { fieldId: 855, grouping: "equal-values" },
//                       { fieldId: 1839, grouping: "equal-values" },
//                        { fieldId: 3, grouping: "equal-values" },
//                    { fieldId: 634, grouping: "equal-values" },
//                      ],        
//                 options: { skip: 0, top: 0, compareWithAppLocalTime: false },
//         };

//         const headers = {
//           Authorization: USER_TOKEN,
//           "QB-Realm-Hostname": QB_DOMAIN,
//           "Content-Type": "application/json",
//         };

//         const response = await axios.post(API_URL, requestBody, { headers });
//         const data = response.data.data;
//         return data;
//       }
//     }
//   }
// };
