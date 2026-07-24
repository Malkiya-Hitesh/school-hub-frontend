





export const CLASS_RANGE_PRESETS = [
  { label: "Nursery–5", from: 0, to: 5 },
  { label: "Dh. 1–5", from: 1, to: 5 },
  { label: "Dh. 6–8", from: 6, to: 8 },
  { label: "Dh. 9–10", from: 9, to: 10 },
  { label: "Dh. 11–12", from: 11, to: 12 },
];
export const ITEMS_PER_PAGE = 12
export const MAX_COMPARE_SCHOOLS = 3


const DISTRICTS = [
  'AHMEDABAD',
  'AMRELI',
  'ANAND',
  'ARVALLI',
  'BANASKANTHA',
  'BHARUCH',
  'BHAVNAGAR',
  'BOTAD',
  'CHHOTAUDEPUR',
  'DAHOD',
  'DANGS',
  'DEVBHUMIDWARKA',
  'GANDHINAGAR',
  'GIRSOMNATH',
  'JAMNAGAR',
  'JUNAGADH',
  'KACHCHH',
  'KHEDA',
  'MAHESANA',
  'MAHISAGAR',
  'MORBI',
  'NARMADA',
  'NAVSARI',
  'PANCHMAHALS',
  'PATAN',
  'PORBANDAR',
  'RAJKOT',
  'SABARKANTHA',
  'SURAT',
  'SURENDRANAGAR',
  'TAPI',
  'VADODARA',
  'VALSAD'
]

const DISTRICT_TALUKA = {
  MAHESANA: [
    'SATLASANA',
    'MEHSANA',
    'BECHARAJI',
    'JOTANA',
    'VADNAGAR',
    'VISNAGAR',
    'KADI',
    'UNJHA',
    'KHERALU',
    'VIJAPUR'
  ],
  DANGS: [
    'SUBIR',
    'WAGHAI',
    'AHWA'
  ],
  BOTAD: [
    'RANPUR',
    'GADHADA',
    'BARVALA',
    'BOTAD'
  ],
  CHHOTAUDEPUR: [
    'NASWADI',
    'CHHOTAUDEPUR',
    'BODELI',
    'SANKHEDA',
    'JETPURPAVI',
    'KAWANT'
  ],
  SABARKANTHA: [
    'TALOD',
    'POSHINA',
    'VIJAYNAGAR',
    'HIMMATNAGAR',
    'KHEDBRAHMA',
    'VADALI',
    'IDAR',
    'PRANTIJ'
  ],
  MAHISAGAR: [
    'KADANA',
    'KHANPUR',
    'VIRPUR',
    'LUNAWADA',
    'SANTRAMPUR',
    'BALASINOR'
  ],
  BHARUCH: [
    'VAGRA',
    'ZAGHADIA',
    'AMOD',
    'NETRANG',
    'VALIA',
    'ANKLESHWAR',
    'JAMBUSAR',
    'BHARUCH',
    'HANSOT'
  ],
  GIRSOMNATH: [
    'GIRGADHADA',
    'UNA',
    'TALALA',
    'KODINAR',
    'SUTRAPADA',
    'VERAVAL'
  ],
  PORBANDAR: [
    'PORBANDAR',
    'RANAVAV',
    'KUTIYANA'
  ],
  DAHOD: [
    'LIMKHEDA',
    'DAHOD',
    'ZALOD',
    'GARBADA',
    'SANJELI',
    'DHANPUR',
    'SINGVAD',
    'FATEPURA',
    'DEVBARIA'
  ],
  SURAT: [
    'MANGROL',
    'MAHUVA',
    'OLPAD',
    'CHORYASI',
    'PALASANA',
    'SURATCORPO',
    'MANDAVI',
    'KAMREJ',
    'BARDOLI',
    'UMARPADA'
  ],
  JAMNAGAR: [
    'DHROL',
    'JAMNAGAR',
    'LALPUR',
    'JODIYA',
    'KALAVAD',
    'JAMJODHPUR'
  ],
  KHEDA: [
    'THASARA',
    'VASO',
    'MAHEMDAVAD',
    'KATHLAL',
    'KHEDA',
    'KAPADVANJ',
    'NADIAD',
    'GALTESHWAR',
    'MAHUDHA',
    'MATAR'
  ],
  VADODARA: [
    'DABHOI',
    'SAVLI',
    'VADODARACORPORATION',
    'VAGHODIYA',
    'DESAR',
    'VADODARA',
    'KARJAN',
    'PADRA',
    'SHINOR'
  ],
  RAJKOT: [
    'JAMKANDORNA',
    'PADDHARI',
    'GONDAL',
    'LODHIKA',
    'JASDAN',
    'RAJKOTCORPORATION',
    'VINCHHIYA',
    'UPLETA',
    'DHORAJI',
    'JETPUR',
    'KOTDASANGANI',
    'RAJKOT'
  ],
  BANASKANTHA: [
    'VAV',
    'DANTA',
    'VADGAM',
    'BHABHAR',
    'PALANPUR',
    'DEESA',
    'LAKHANI',
    'DEODAR',
    'KANKAREJ',
    'THARAD',
    'AMIRGADH',
    'DANTIWADA',
    'DHANERA',
    'SUIGAM'
  ],
  NARMADA: [
    'GARUDESHWAR',
    'DEDIYAPADA',
    'SAGBARA',
    'TILAKVADA',
    'NANDOD'
  ],
  KACHCHH: [
    'BHACHAU',
    'GANDHIDHAM',
    'MANDVI',
    'MUNDRA',
    'NAKHATRANA',
    'BHUJ',
    'RAPAR',
    'LAKHAPAT',
    'ABDASA',
    'ANJAR'
  ],
  AHMEDABAD: [
    'DASCROI',
    'CITY',
    'VIRAMGAM',
    'AMC',
    'SANAND',
    'BAVLA',
    'DHOLKA',
    'DHANDHUKA',
    'DETROJRAMPURA',
    'DHOLERA',
    'MANDAL'
  ],
  BHAVNAGAR: [
    'SHIHOR',
    'UMRALA',
    'MAHUVA',
    'VALLBHIPUR',
    'TALAJA',
    'GARIYADHAR',
    'JESAR',
    'PALITANA',
    'GHOGHA',
    'BHAVNAGAR'
  ],
  JUNAGADH: [
    'MANGROL',
    'MALIYAHATINA',
    'MENDARDA',
    'KESHOD',
    'JUNAGADH',
    'JUNAGADHCORPORATION',
    'BHESAN',
    'VISAVADAR',
    'MANAVADAR',
    'VANTHALI'
  ],
  VALSAD: [
    'VALSAD',
    'VAPI',
    'UMBERGAON',
    'PARDI',
    'KAPARADA',
    'DHARAMPUR'
  ],
  ANAND: [
    'UMRETH',
    'TARAPUR',
    'SOJITRA',
    'PETLAD',
    'BORSAD',
    'KHAMBHAT',
    'ANKLAV',
    'ANAND'
  ],
  SURENDRANAGAR: [
    'DHRANGADHRA',
    'CHOTILA',
    'THANGADH',
    'PATDIDASADA',
    'SAYLA',
    'CHUDA',
    'WADHVAN',
    'LAKHTAR',
    'LIMBDI',
    'MULI'
  ],
  TAPI: [
    'KUKARMUNDA',
    'SONGADH',
    'UCHCHHAL',
    'VALOD',
    'DOLVAN',
    'VYARA',
    'NIZAR'
  ],
  NAVSARI: [
    'VANSDA',
    'CHIKHLI',
    'JALALPOR',
    'KHERGAM',
    'GANDEVI',
    'NAVSARI'
  ],
  PANCHMAHALS: [
    'KALOL',
    'SHAHERA',
    'JAMBUGHODA',
    'GHOGHAMBA',
    'HALOL',
    'GODHRA',
    'MORVAHADAF'
  ],
  AMRELI: [
    'DHARI',
    'SAVARKUNDLA',
    'KUKAVAV',
    'RAJULA',
    'JAFRABAD',
    'AMRELI',
    'BABARA',
    'LATHI',
    'LILIYA',
    'KHAMBHA',
    'BAGASARA'
  ],
  PATAN: [
    'SAMI',
    'SHANKHESHWAR',
    'SIDDHPUR',
    'HARIJ',
    'CHANASMA',
    'RADHANPUR',
    'PATAN',
    'SARASWATI',
    'SANTALPUR'
  ],
  DEVBHUMIDWARKA: [
    'DWARKA',
    'JAMKHAMBHALIYA',
    'JAMKALYANPUR',
    'BHANVAD'
  ],
  GANDHINAGAR: [
    'KALOL',
    'DEHGAM',
    'MANSA',
    'GANDHINAGAR'
  ],
  ARVALLI: [
    'DHANSURA',
    'BHILODA',
    'MALPUR',
    'MEGHRAJ',
    'BAYAD',
    'MODASA'
  ],
  MORBI: [
    'HALVAD',
    'WANKANER',
    'MALIYA',
    'MORBI',
    'TANKARA'
  ]
}

const MANAGEMENTS = [
  'CENTRALGOVERNMENTSCHOOL',
  'GOVERNMENTAIDEDSCHOOL',
  'GOVERNMENTSCHOOL',
  'PRIVATESCHOOL',
  'RECOGNIZEDMADARSA',
  'SPECIALGOVERNMENTSCHOOL'
]

const SCHOOL_TYPES = ['BOYS', 'COEDUCATIONAL', 'GIRLS']
const LOCATION_TYPES = [ 'RURAL', 'URBAN']

const MEDIUMS = [
  'ENGLISH', 'GUJARATI',
  'HINDI', 'MARATHI',
  'ORIYA', 'SANSKRIT',
  'URDU'
]

const BOARDS = [ 'CBSE', 'ICSE', 'INTERNATIONALBOARD', 'STATEBOARD']

const STREAMS = ['ARTS', 'COMMERCE', 'SCIENCE', "VOCATIONAL", "OTHER",]




// આ existing constants.js માં ઉમેરો
export const ACTIVE_CHIP_KEYS = [
  "q", "district", "taluka", "medium", "board",
  "management", "schoolType", "locationType", "sortBy", "gradeFrom", "gradeTo", "streams","lat", "lng", "nearRadius",
];

export const CHIP_LABELS = {
  q: "શોધ", district: "જિલ્લો", taluka: "તાલુકો", medium: "માધ્યમ",
  board: "બોર્ડ", management: "વ્યવ.", schoolType: "પ્રકાર",
  locationType: "વિસ્તાર", sortBy: "ક્રમ", gradeFrom: "ગ્રેડ થી",
  gradeTo: "ગ્રેડ સુધી", streams: "સ્ટ્રીમ",
};

export const FILTER_KEYS = [
  "sortBy", "district", "taluka", "gradeFrom", "gradeTo",
  "medium", "board", "streams", "management", "schoolType", "locationType","lat", "lng", "nearRadius"
];




const CATEGORY_TYPES = [
  'HIGHERSECONDARY',
  'PRIMARY',
  'PRIMARYTOHIGHERSECONDARY',
  'PRIMARYTOSECONDARY',
  'PRIMARYUPPERPRIMARY',
  'SECONDARY',
  'SECONDARYHIGHERSECONDARY',
  'UPPERPRIMARY',
  'UPPERPRIMARYTOHIGHERSECONDARY',
  'UPPERPRIMARYTOSECONDARY'
];
const GRADE_FROM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const GRADE_TO = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const SORT_OPTIONS =[
  { value: "", label: "ડિફૉલ્ટ" },
  { value: "students", label: "વિદ્યાર્થી ↓" },
  { value: "name", label: "નામ A–Z" },
  { value: "district", label: "જિલ્લો A–Z" },
  { value: "newest", label: "નવી પહેલા" },
];
// src/lib/constants.js — add this export alongside your other constants

export {

  DISTRICTS,
  DISTRICT_TALUKA,
  MEDIUMS,
  BOARDS,
  STREAMS,
  MANAGEMENTS,
  SCHOOL_TYPES,
  LOCATION_TYPES,
  CATEGORY_TYPES,
  GRADE_FROM,
  GRADE_TO,
  SORT_OPTIONS,
}