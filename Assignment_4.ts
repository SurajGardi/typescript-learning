// Step 1: Define Fields Data
const fields: any = {
  Hierarchies: [],

  Dimensions: [
    {
      isNumericDataType: false,
      entityName: "Order ID",
      variableType: "categorical",
      dataType: "text",
      datasetId: "1",
      subDatasetId: "a"
    },
    {
      isNumericDataType: false,
      entityName: "Order Date",
      variableType: "interval",
      dataType: "date",
      datasetId: "1",
      subDatasetId: "a"
    },
    {
      entityName: "Order Date_Year",
      Parent: "Order Date",
      datasetId: "1",
      variableType: "categorical",
      subDatasetId: "a",
      dataType: "int64"
    },
    {
      entityName: "City",
      isNumericDataType: false,
      variableType: "categorical",
      dataType: "text",
      datasetId: "1",
      subDatasetId: "a"
    },
    {
      isNumericDataType: false,
      entityName: "State",
      variableType: "geographical",
      dataType: "text",
      datasetId: "1",
      subDatasetId: "a",
      mappingDetails: {
        unMappedLocationCount: 0
      }
    },
    {
      calculatedFieldKey: "123",
      variables: [
        {
          entityName: "Customer Name",
          variableType: "categorical",
          dataType: "text"
        }
      ],
      isNumericDataType: false,
      entityName: "Cal32",
      variableType: "categorical",
      dataType: "text",
      datasetId: "1",
      subDatasetId: "a"
    }
  ],

  Measures: [
    {
      isNumericDataType: true,
      entityName: "Sales",
      variableType: "numerical",
      dataType: "float",
      datasetId: "1",
      subDatasetId: "a"
    },
    {
      isNumericDataType: true,
      entityName: "Discount",
      variableType: "numerical",
      dataType: "float",
      datasetId: "1",
      subDatasetId: "a"
    },
    {
      calculatedFieldKey: "456",
      variables: [
        {
          entityName: "Profit",
          variableType: "numerical",
          dataType: "float"
        }
      ],
      isNumericDataType: true,
      entityName: "Cal2",
      variableType: "numerical",
      dataType: "float",
      datasetId: "1",
      subDatasetId: "a"
    }
  ],

  Details: [
    {
      isNumericDataType: false,
      entityName: "Category",
      variableType: "categorical",
      dataType: "text",
      datasetId: "1",
      subDatasetId: "a"
    }
  ]
};


// ==========================
// STEP 2: Combine all arrays
// ==========================
let fieldList = [
  ...fields.Dimensions,
  ...fields.Measures,
  ...fields.Details,
  ...fields.Hierarchies
];

console.log("FieldList:", fieldList);


// ==========================
// STEP 3: Get calculated fields
// ==========================
const calculatedfields = fieldList.filter(
  item => item.calculatedFieldKey
);

console.log("Calculated Fields:", calculatedfields);


// ==========================
// STEP 4: Remove Discount
// ==========================
const index = fieldList.findIndex(
  item => item.entityName === "Discount"
);

if (index !== -1) {
  fieldList.splice(index, 1);
}


// ==========================
// STEP 5: Update City
// ==========================
fieldList.forEach(item => {
  if (item.entityName === "City") {
    item.isNumericDataType = true;
    item.dataType = "Numerical";
  }
});


// ==========================
// STEP 6: Extract numerical variables
// ==========================
let allVariables: any[] = [];

calculatedfields.forEach(item => {
  if (item.variables) {
    allVariables = [...allVariables, ...item.variables];
  }
});

const numericalVariables = allVariables.filter(
  v => v.variableType === "numerical"
);

console.log("Numerical Variables:", numericalVariables);


// ==========================
// STEP 7: Get index where Parent = Order Date
// ==========================
const dataIndex: number[] = [];

fields.Dimensions.forEach((item: any, index: number) => {
  if (item.Parent === "Order Date") {
    dataIndex.push(index);
  }
});


// ==========================
// STEP 8: Print entityName
// ==========================
fields.Dimensions.forEach((item: any, index: number) => {
  if (dataIndex.includes(index)) {
    console.log("Matched Entity:", item.entityName);
  }
});


// ==========================
// STEP 9: Change datasetId → datasetKey
// ==========================
fields.Measures = fields.Measures.map((item: any) => {
  return {
    ...item,
    datasetKey: item.datasetId
  };
});


// ==========================
// STEP 10: Update geographical
// ==========================
fieldList.forEach(item => {
  if (item.variableType === "geographical") {
    item.mappingDetails.unMappedLocationCount = 5;
  }
});


// ==========================
// STEP 11: NumericalItems
// ==========================
const NumericalItems = fieldList
  .filter(
    item =>
      item.isNumericDataType === true &&
      item.dataType === "float"
  )
  .map(item => ({
    ...item,
    datasetId: item.subDatasetId
  }));

console.log("Numerical Items:", NumericalItems);