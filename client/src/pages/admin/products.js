import axios from 'axios';
import constants from '../../constants';

function getProductList() {
    axios.get(SERVER_URL + '/products')
        .then((response) => {
            constants = response.data
        }).catch((err) => {
            console.log(err);
        })
    }j

export const products = [
  {
    "Barcode": 6008877012656,
    "Description": "7 Day Pill Box",
    "Additional Info": "",
    "Strength": "",
    "Form": "",
    "Pack Size": 1,
    "Price": 62,
    "ProductCode": ""
  },
  {
    "Barcode": 6003622000049,
    "Description": "77 Blood Mixture",
    "Additional Info": "",
    "Strength": "",
    "Form": "Susp",
    "Pack Size": "250ml",
    "Price": 41.3,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650001382,
    "Description": "A Vogel",
    "Additional Info": "Multiforce Alkaline",
    "Strength": "",
    "Form": "Sachets",
    "Pack Size": "30x7.5gm",
    "Price": 245,
    "ProductCode": ""
  },
  {
    "Barcode": 7610313411597,
    "Description": "A Vogel",
    "Additional Info": "Molkosan",
    "Strength": "",
    "Form": "Susp",
    "Pack Size": "200ml",
    "Price": 142.8,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650001078,
    "Description": "A Vogel",
    "Additional Info": "Multiforce Alkaline",
    "Strength": "",
    "Form": "Powder",
    "Pack Size": "225gm",
    "Price": 233.6,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650001481,
    "Description": "A Vogel",
    "Additional Info": "Multiforce Alkaline",
    "Strength": "",
    "Form": "Powder",
    "Pack Size": "105gm",
    "Price": 127.5,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650000057,
    "Description": "A Vogel",
    "Additional Info": "Echinaforce",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "100ml",
    "Price": 177.6,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650000538,
    "Description": "A Vogel",
    "Additional Info": "Boldcynara",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "50ml",
    "Price": 161.3,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650000040,
    "Description": "A Vogel",
    "Additional Info": "Echinaforce",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "50ml",
    "Price": 123.8,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650001160,
    "Description": "A Vogel",
    "Additional Info": "Anti-Appetite Formula",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "30ml",
    "Price": 101.3,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650001191,
    "Description": "A Vogel",
    "Additional Info": "Asthma Formula",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "30ml",
    "Price": 108,
    "ProductCode": ""
  },
  {
    "Barcode": 6007650000910,
    "Description": "A Vogel",
    "Additional Info": "Migraine Formula",
    "Strength": "",
    "Form": "Drops",
    "Pack Size": "30ml",
    "Price": 97.1,
    "ProductCode": ""
  },
  {
    "Barcode": 6008877001049,
    "Description": "Absorbant Sterile Gauze Swab",
    "Additional Info": "",
    "Strength": "7.5 x 7.5",
    "Form": "",
    "Pack Size": 1,
    "Price": 17.6,
    "ProductCode": ""
  },
  {
    "Barcode": 23,
    "Description": "Absorbent Cotton Wool",
    "Additional Info": "",
    "Strength": "",
    "Form": "",
    "Pack Size": "500gm",
    "Price": 79,
    "ProductCode": ""
  },
  {
    "Barcode": 6009801985756,
    "Description": "Accord Escitalopram",
    "Additional Info": "",
    "Strength": "20mg",
    "Form": "Tabs",
    "Pack Size": 28,
    "Price": 107.7,
    "ProductCode": ""
  },
  {
    "Barcode": 6009801985190,
    "Description": "Accord Glimepiride",
    "Additional Info": "",
    "Strength": "4mg",
    "Form": "Tabs",
    "Pack Size": 30,
    "Price": 155.9,
    "ProductCode": 68245
  },
  {
    "Barcode": 4015630064045,
    "Description": "Accu-Chek",
    "Additional Info": "Active",
    "Strength": "",
    "Form": "Strips",
    "Pack Size": 50,
    "Price": 269.3,
    "ProductCode": 55944
  },
  {
    "Barcode": 4015630981939,
    "Description": "Accu-Chek",
    "Additional Info": "Proforma",
    "Strength": "",
    "Form": "Strips",
    "Pack Size": 50,
    "Price": 211.4,
    "ProductCode": 52688
  },
  {
    "Barcode": 4015630018277,
    "Description": "Accu-Chek",
    "Additional Info": "Softclix",
    "Strength": "",
    "Form": "Lancets",
    "Pack Size": 25,
    "Price": 144.5,
    "ProductCode": 2822
  },
  {
    "Barcode": 4015630936687,
    "Description": "Accutrend",
    "Additional Info": "Cholesterol",
    "Strength": "",
    "Form": "Strips",
    "Pack Size": 25,
    "Price": 761.2,
    "ProductCode": ""
  },
  {
    "Barcode": 6006352002031,
    "Description": "Acitop",
    "Additional Info": "",
    "Strength": "",
    "Form": "Cream",
    "Pack Size": "2gm",
    "Price": 40.1,
    "ProductCode": 17230
  },
  {
    "Barcode": 38,
    "Description": "Acnelak",
    "Additional Info": "CL Z",
    "Strength": "",
    "Form": "Cream",
    "Pack Size": "15gm",
    "Price": 47.2,
    "ProductCode": ""
  },
  {
    "Barcode": 39,
    "Description": "Acnelak",
    "Additional Info": "",
    "Strength": "",
    "Form": "Soap",
    "Pack Size": "75gm",
    "Price": 47.2,
    "ProductCode": ""
  },
  {
    "Barcode": 6006264102553,
    "Description": "Acnetane",
    "Additional Info": "",
    "Strength": "20mg",
    "Form": "Caps",
    "Pack Size": 60,
    "Price": 758.9,
    "ProductCode": ""
  },
  {
    "Barcode": 6001424000465,
    "Description": "Actifed",
    "Additional Info": "",
    "Strength": "",
    "Form": "Syrup",
    "Pack Size": "100ml",
    "Price": 55.3,
    "ProductCode": ""
  },
  {
    "Barcode": 6001424000458,
    "Description": "Actifed",
    "Additional Info": "",
    "Strength": "",
    "Form": "Syrup",
    "Pack Size": "50ml",
    "Price": 28.7,
    "ProductCode": ""
  }
]

export const barcodes = ['6008877012656' ,'6003622000049' ,'6007650001382' ,'7610313411597' ,'6007650001078' ,'6007650001481' ,'6007650000057' ,'6007650000538' ,'6007650000040' ,'6007650001160' ,'6007650001191' ,'6007650000910' ,'6008877001049' ,'23' ,'6009801985756' ,'6009801985190' ,'4015630064045' ,'4015630981939' ,'4015630018277' ,'4015630936687' ,'6006352002031' ,'38' ,'39' ,'6006264102553' ,'6001424000465' ,'6001424000458'
]

// export default { products, barcodes };