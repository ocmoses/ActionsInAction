const countries = [
  {
    title: "Afghanistan",
    code: "93",
    value: "AF",
  },
  {
    title: "Albania",
    code: "355",
    value: "AL",
  },
  {
    title: "Algeria",
    code: "213",
    value: "DZ",
  },
  {
    title: "American Samoa",
    code: "1-684",
    value: "AS",
  },
  {
    title: "Andorra",
    code: "376",
    value: "AD",
  },
  {
    title: "Angola",
    code: "244",
    value: "AO",
  },
  {
    title: "Anguilla",
    code: "1-264",
    value: "AI",
  },
  {
    title: "Antarctica",
    code: "672",
    value: "AQ",
  },
  {
    title: "Antigua and Barbuda",
    code: "1-268",
    value: "AG",
  },
  {
    title: "Argentina",
    code: "54",
    value: "AR",
  },
  {
    title: "Armenia",
    code: "374",
    value: "AM",
  },
  {
    title: "Aruba",
    code: "297",
    value: "AW",
  },
  {
    title: "Australia",
    code: "61",
    value: "AU",
  },
  {
    title: "Austria",
    code: "43",
    value: "AT",
  },
  {
    title: "Azerbaijan",
    code: "994",
    value: "AZ",
  },
  {
    title: "Bahamas",
    code: "1-242",
    value: "BS",
  },
  {
    title: "Bahrain",
    code: "973",
    value: "BH",
  },
  {
    title: "Bangladesh",
    code: "880",
    value: "BD",
  },
  {
    title: "Barbados",
    code: "1-246",
    value: "BB",
  },
  {
    title: "Belarus",
    code: "375",
    value: "BY",
  },
  {
    title: "Belgium",
    code: "32",
    value: "BE",
  },
  {
    title: "Belize",
    code: "501",
    value: "BZ",
  },
  {
    title: "Benin",
    code: "229",
    value: "BJ",
  },
  {
    title: "Bermuda",
    code: "1-441",
    value: "BM",
  },
  {
    title: "Bhutan",
    code: "975",
    value: "BT",
  },
  {
    title: "Bolivia",
    code: "591",
    value: "BO",
  },
  {
    title: "Bosnia and Herzegovina",
    code: "387",
    value: "BA",
  },
  {
    title: "Botswana",
    code: "267",
    value: "BW",
  },
  {
    title: "Brazil",
    code: "55",
    value: "BR",
  },
  {
    title: "British Indian Ocean Territory",
    code: "246",
    value: "IO",
  },
  {
    title: "British Virgin Islands",
    code: "1-284",
    value: "VG",
  },
  {
    title: "Brunei",
    code: "673",
    value: "BN",
  },
  {
    title: "Bulgaria",
    code: "359",
    value: "BG",
  },
  {
    title: "Burkina Faso",
    code: "226",
    value: "BF",
  },
  {
    title: "Myanmar",
    code: "95",
    value: "MM",
  },
  {
    title: "Burundi",
    code: "257",
    value: "BI",
  },
  {
    title: "Cambodia",
    code: "855",
    value: "KH",
  },
  {
    title: "Cameroon",
    code: "237",
    value: "CM",
  },
  {
    title: "Canada",
    code: "1",
    value: "CA",
  },
  {
    title: "Cape Verde",
    code: "238",
    value: "CV",
  },
  {
    title: "Cayman Islands",
    code: "1-345",
    value: "KY",
  },
  {
    title: "Central African Republic",
    code: "236",
    value: "CF",
  },
  {
    title: "Chad",
    code: "235",
    value: "TD",
  },
  {
    title: "Chile",
    code: "56",
    value: "CL",
  },
  {
    title: "China",
    code: "86",
    value: "CN",
  },
  {
    title: "Christmas Island",
    code: "61",
    value: "CX",
  },
  {
    title: "Cocos Islands",
    code: "61",
    value: "CC",
  },
  {
    title: "Colombia",
    code: "57",
    value: "CO",
  },
  {
    title: "Comoros",
    code: "269",
    value: "KM",
  },
  {
    title: "Republic of the Congo",
    code: "242",
    value: "CG",
  },
  {
    title: "Democratic Republic of the Congo",
    code: "243",
    value: "CD",
  },
  {
    title: "Cook Islands",
    code: "682",
    value: "CK",
  },
  {
    title: "Costa Rica",
    code: "506",
    value: "CR",
  },
  {
    title: "Croatia",
    code: "385",
    value: "HR",
  },
  {
    title: "Cuba",
    code: "53",
    value: "CU",
  },
  {
    title: "Curacao",
    code: "599",
    value: "CW",
  },
  {
    title: "Cyprus",
    code: "357",
    value: "CY",
  },
  {
    title: "Czech Republic",
    code: "420",
    value: "CZ",
  },
  {
    title: "Denmark",
    code: "45",
    value: "DK",
  },
  {
    title: "Djibouti",
    code: "253",
    value: "DJ",
  },
  {
    title: "Dominica",
    code: "1-767",
    value: "DM",
  },
  {
    title: "Dominican Republic",
    code: "1-809, 1-829, 1-849",
    value: "DO",
  },
  {
    title: "East Timor",
    code: "670",
    value: "TL",
  },
  {
    title: "Ecuador",
    code: "593",
    value: "EC",
  },
  {
    title: "Egypt",
    code: "20",
    value: "EG",
  },
  {
    title: "El Salvador",
    code: "503",
    value: "SV",
  },
  {
    title: "Equatorial Guinea",
    code: "240",
    value: "GQ",
  },
  {
    title: "Eritrea",
    code: "291",
    value: "ER",
  },
  {
    title: "Estonia",
    code: "372",
    value: "EE",
  },
  {
    title: "Ethiopia",
    code: "251",
    value: "ET",
  },
  {
    title: "Falkland Islands",
    code: "500",
    value: "FK",
  },
  {
    title: "Faroe Islands",
    code: "298",
    value: "FO",
  },
  {
    title: "Fiji",
    code: "679",
    value: "FJ",
  },
  {
    title: "Finland",
    code: "358",
    value: "FI",
  },
  {
    title: "France",
    code: "33",
    value: "FR",
  },
  {
    title: "French Polynesia",
    code: "689",
    value: "PF",
  },
  {
    title: "Gabon",
    code: "241",
    value: "GA",
  },
  {
    title: "Gambia",
    code: "220",
    value: "GM",
  },
  {
    title: "Georgia",
    code: "995",
    value: "GE",
  },
  {
    title: "Germany",
    code: "49",
    value: "DE",
  },
  {
    title: "Ghana",
    code: "233",
    value: "GH",
  },
  {
    title: "Gibraltar",
    code: "350",
    value: "GI",
  },
  {
    title: "Greece",
    code: "30",
    value: "GR",
  },
  {
    title: "Greenland",
    code: "299",
    value: "GL",
  },
  {
    title: "Grenada",
    code: "1-473",
    value: "GD",
  },
  {
    title: "Guam",
    code: "1-671",
    value: "GU",
  },
  {
    title: "Guatemala",
    code: "502",
    value: "GT",
  },
  {
    title: "Guernsey",
    code: "44 - 1481",
    value: "GG",
  },
  {
    title: "Guinea",
    code: "224",
    value: "GN",
  },
  {
    title: "Guinea-Bissau",
    code: "245",
    value: "GW",
  },
  {
    title: "Guyana",
    code: "592",
    value: "GY",
  },
  {
    title: "Haiti",
    code: "509",
    value: "HT",
  },
  {
    title: "Honduras",
    code: "504",
    value: "HN",
  },
  {
    title: "Hong Kong",
    code: "852",
    value: "HK",
  },
  {
    title: "Hungary",
    code: "36",
    value: "HU",
  },
  {
    title: "Iceland",
    code: "354",
    value: "IS",
  },
  {
    title: "India",
    code: "91",
    value: "IN",
  },
  {
    title: "Indonesia",
    code: "62",
    value: "ID",
  },
  {
    title: "Iran",
    code: "98",
    value: "IR",
  },
  {
    title: "Iraq",
    code: "964",
    value: "IQ",
  },
  {
    title: "Ireland",
    code: "353",
    value: "IE",
  },
  {
    title: "Isle of Man",
    code: "44 - 1624",
    value: "IM",
  },
  {
    title: "Israel",
    code: "972",
    value: "IL",
  },
  {
    title: "Italy",
    code: "39",
    value: "IT",
  },
  {
    title: "Ivory Coast",
    code: "225",
    value: "CI",
  },
  {
    title: "Jamaica",
    code: "1-876",
    value: "JM",
  },
  {
    title: "Japan",
    code: "81",
    value: "JP",
  },
  {
    title: "Jersey",
    code: "44 - 1534",
    value: "JE",
  },
  {
    title: "Jordan",
    code: "962",
    value: "JO",
  },
  {
    title: "Kazakhstan",
    code: "7",
    value: "KZ",
  },
  {
    title: "Kenya",
    code: "254",
    value: "KE",
  },
  {
    title: "Kiribati",
    code: "686",
    value: "KI",
  },
  {
    title: "Kosovo",
    code: "383",
    value: "XK",
  },
  {
    title: "Kuwait",
    code: "965",
    value: "KW",
  },
  {
    title: "Kyrgyzstan",
    code: "996",
    value: "KG",
  },
  {
    title: "Laos",
    code: "856",
    value: "LA",
  },
  {
    title: "Latvia",
    code: "371",
    value: "LV",
  },
  {
    title: "Lebanon",
    code: "961",
    value: "LB",
  },
  {
    title: "Lesotho",
    code: "266",
    value: "LS",
  },
  {
    title: "Liberia",
    code: "231",
    value: "LR",
  },
  {
    title: "Libya",
    code: "218",
    value: "LY",
  },
  {
    title: "Liechtenstein",
    code: "423",
    value: "LI",
  },
  {
    title: "Lithuania",
    code: "370",
    value: "LT",
  },
  {
    title: "Luxembourg",
    code: "352",
    value: "LU",
  },
  {
    title: "Macau",
    code: "853",
    value: "MO",
  },
  {
    title: "Macedonia",
    code: "389",
    value: "MK",
  },
  {
    title: "Madagascar",
    code: "261",
    value: "MG",
  },
  {
    title: "Malawi",
    code: "265",
    value: "MW",
  },
  {
    title: "Malaysia",
    code: "60",
    value: "MY",
  },
  {
    title: "Maldives",
    code: "960",
    value: "MV",
  },
  {
    title: "Mali",
    code: "223",
    value: "ML",
  },
  {
    title: "Malta",
    code: "356",
    value: "MT",
  },
  {
    title: "Marshall Islands",
    code: "692",
    value: "MH",
  },
  {
    title: "Mauritania",
    code: "222",
    value: "MR",
  },
  {
    title: "Mauritius",
    code: "230",
    value: "MU",
  },
  {
    title: "Mayotte",
    code: "262",
    value: "YT",
  },
  {
    title: "Mexico",
    code: "52",
    value: "MX",
  },
  {
    title: "Micronesia",
    code: "691",
    value: "FM",
  },
  {
    title: "Moldova",
    code: "373",
    value: "MD",
  },
  {
    title: "Monaco",
    code: "377",
    value: "MC",
  },
  {
    title: "Mongolia",
    code: "976",
    value: "MN",
  },
  {
    title: "Montenegro",
    code: "382",
    value: "ME",
  },
  {
    title: "Montserrat",
    code: "1-664",
    value: "MS",
  },
  {
    title: "Morocco",
    code: "212",
    value: "MA",
  },
  {
    title: "Mozambique",
    code: "258",
    value: "MZ",
  },
  {
    title: "Namibia",
    code: "264",
    value: "NA",
  },
  {
    title: "Nauru",
    code: "674",
    value: "NR",
  },
  {
    title: "Nepal",
    code: "977",
    value: "NP",
  },
  {
    title: "Netherlands",
    code: "31",
    value: "NL",
  },
  {
    title: "Netherlands Antilles",
    code: "599",
    value: "AN",
  },
  {
    title: "New Caledonia",
    code: "687",
    value: "NC",
  },
  {
    title: "New Zealand",
    code: "64",
    value: "NZ",
  },
  {
    title: "Nicaragua",
    code: "505",
    value: "NI",
  },
  {
    title: "Niger",
    code: "227",
    value: "NE",
  },
  {
    title: "Nigeria",
    code: "234",
    value: "NG",
  },
  {
    title: "Niue",
    code: "683",
    value: "NU",
  },
  {
    title: "Northern Mariana Islands",
    code: "1-670",
    value: "MP",
  },
  {
    title: "North Korea",
    code: "850",
    value: "KP",
  },
  {
    title: "Norway",
    code: "47",
    value: "NO",
  },
  {
    title: "Oman",
    code: "968",
    value: "OM",
  },
  {
    title: "Pakistan",
    code: "92",
    value: "PK",
  },
  {
    title: "Palau",
    code: "680",
    value: "PW",
  },
  {
    title: "Palestine",
    code: "970",
    value: "PS",
  },
  {
    title: "Panama",
    code: "507",
    value: "PA",
  },
  {
    title: "Papua New Guinea",
    code: "675",
    value: "PG",
  },
  {
    title: "Paraguay",
    code: "595",
    value: "PY",
  },
  {
    title: "Peru",
    code: "51",
    value: "PE",
  },
  {
    title: "Philippines",
    code: "63",
    value: "PH",
  },
  {
    title: "Pitcairn",
    code: "64",
    value: "PN",
  },
  {
    title: "Poland",
    code: "48",
    value: "PL",
  },
  {
    title: "Portugal",
    code: "351",
    value: "PT",
  },
  {
    title: "Puerto Rico",
    code: "1-787, 1-939",
    value: "PR",
  },
  {
    title: "Qatar",
    code: "974",
    value: "QA",
  },
  {
    title: "Reunion",
    code: "262",
    value: "RE",
  },
  {
    title: "Romania",
    code: "40",
    value: "RO",
  },
  {
    title: "Russia",
    code: "7",
    value: "RU",
  },
  {
    title: "Rwanda",
    code: "250",
    value: "RW",
  },
  {
    title: "Saint Barthelemy",
    code: "590",
    value: "BL",
  },
  {
    title: "Samoa",
    code: "685",
    value: "WS",
  },
  {
    title: "San Marino",
    code: "378",
    value: "SM",
  },
  {
    title: "Sao Tome and Principe",
    code: "239",
    value: "ST",
  },
  {
    title: "Saudi Arabia",
    code: "966",
    value: "SA",
  },
  {
    title: "Senegal",
    code: "221",
    value: "SN",
  },
  {
    title: "Serbia",
    code: "381",
    value: "RS",
  },
  {
    title: "Seychelles",
    code: "248",
    value: "SC",
  },
  {
    title: "Sierra Leone",
    code: "232",
    value: "SL",
  },
  {
    title: "Singapore",
    code: "65",
    value: "SG",
  },
  {
    title: "Sint Maarten",
    code: "1-721",
    value: "SX",
  },
  {
    title: "Slovakia",
    code: "421",
    value: "SK",
  },
  {
    title: "Slovenia",
    code: "386",
    value: "SI",
  },
  {
    title: "Solomon Islands",
    code: "677",
    value: "SB",
  },
  {
    title: "Somalia",
    code: "252",
    value: "SO",
  },
  {
    title: "South Africa",
    code: "27",
    value: "ZA",
  },
  {
    title: "South Korea",
    code: "82",
    value: "KR",
  },
  {
    title: "South Sudan",
    code: "211",
    value: "SS",
  },
  {
    title: "Spain",
    code: "34",
    value: "ES",
  },
  {
    title: "Sri Lanka",
    code: "94",
    value: "LK",
  },
  {
    title: "Saint Helena",
    code: "290",
    value: "SH",
  },
  {
    title: "Saint Kitts and Nevis",
    code: "1-869",
    value: "KN",
  },
  {
    title: "Saint Lucia",
    code: "1-758",
    value: "LC",
  },
  {
    title: "Saint Martin",
    code: "590",
    value: "MF",
  },
  {
    title: "Saint Pierre and Miquelon",
    code: "508",
    value: "PM",
  },
  {
    title: "Saint Vincent and the Grenadines",
    code: "1-784",
    value: "VC",
  },
  {
    title: "Sudan",
    code: "249",
    value: "SD",
  },
  {
    title: "Suriname",
    code: "597",
    value: "SR",
  },
  {
    title: "Svalbard and Jan Mayen",
    code: "47",
    value: "SJ",
  },
  {
    title: "Swaziland",
    code: "268",
    value: "SZ",
  },
  {
    title: "Sweden",
    code: "46",
    value: "SE",
  },
  {
    title: "Switzerland",
    code: "41",
    value: "CH",
  },
  {
    title: "Syria",
    code: "963",
    value: "SY",
  },
  {
    title: "Taiwan",
    code: "886",
    value: "TW",
  },
  {
    title: "Tajikistan",
    code: "992",
    value: "TJ",
  },
  {
    title: "Tanzania",
    code: "255",
    value: "TZ",
  },
  {
    title: "Thailand",
    code: "66",
    value: "TH",
  },
  {
    title: "Togo",
    code: "228",
    value: "TG",
  },
  {
    title: "Tokelau",
    code: "690",
    value: "TK",
  },
  {
    title: "Tonga",
    code: "676",
    value: "TO",
  },
  {
    title: "Trinidad and Tobago",
    code: "1-868",
    value: "TT",
  },
  {
    title: "Tunisia",
    code: "216",
    value: "TN",
  },
  {
    title: "Turkey",
    code: "90",
    value: "TR",
  },
  {
    title: "Turkmenistan",
    code: "993",
    value: "TM",
  },
  {
    title: "Turks and Caicos Islands",
    code: "1-649",
    value: "TC",
  },
  {
    title: "Tuvalu",
    code: "688",
    value: "TV",
  },
  {
    title: "United Arab Emirates",
    code: "971",
    value: "AE",
  },
  {
    title: "Uganda",
    code: "256",
    value: "UG",
  },
  {
    title: "United Kingdom",
    code: "44",
    value: "GB",
  },
  {
    title: "Ukraine",
    code: "380",
    value: "UA",
  },
  {
    title: "Uruguay",
    code: "598",
    value: "UY",
  },
  {
    title: "United States",
    code: "1",
    value: "US",
  },
  {
    title: "Uzbekistan",
    code: "998",
    value: "UZ",
  },
  {
    title: "Vanuatu",
    code: "678",
    value: "VU",
  },
  {
    title: "Vatican",
    code: "379",
    value: "VA",
  },
  {
    title: "Venezuela",
    code: "58",
    value: "VE",
  },
  {
    title: "Vietnam",
    code: "84",
    value: "VN",
  },
  {
    title: "U.S. Virgin Islands",
    code: "1-340",
    value: "VI",
  },
  {
    title: "Wallis and Futuna",
    code: "681",
    value: "WF",
  },
  {
    title: "Western Sahara",
    code: "212",
    value: "EH",
  },
  {
    title: "Yemen",
    code: "967",
    value: "YE",
  },
  {
    title: "Zambia",
    code: "260",
    value: "ZM",
  },
  {
    title: "Zimbabwe",
    code: "263",
    value: "ZW",
  },
];

export const COUNTRIES = countries.sort((c1, c2) =>
  c1.title < c2.title ? -1 : c1.title > c2.title ? 1 : 0
);
