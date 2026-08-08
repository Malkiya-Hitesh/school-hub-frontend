// lib/constants.js

export const createOptions = (obj) =>
  Object.entries(obj).map(([value, label]) => ({
    value,
    label,
  }));

export const getLabel = (obj, value) => obj[value] ?? value;

export const CLASS_RANGE_PRESETS = {
  "NURSERY_5": {
    label: "Nursery–5",
    from: 0,
    to: 5,
  },
  "DH_1_5": {
    label: "Dh. 1–5",
    from: 1,
    to: 5,
  },
  "DH_6_8": {
    label: "Dh. 6–8",
    from: 6,
    to: 8,
  },
  "DH_9_10": {
    label: "Dh. 9–10",
    from: 9,
    to: 10,
  },
  "DH_11_12": {
    label: "Dh. 11–12",
    from: 11,
    to: 12,
  },
};

export const ITEMS_PER_PAGE = 12;
export const MAX_COMPARE_SCHOOLS = 3;

export const DISTRICTS = {
  "AHMEDABAD": "અમદાવાદ",
  "AMRELI": "અમરેલી",
  "ANAND": "આણંદ",
  "ARVALLI": "અરવલ્લી",
  "BANASKANTHA": "બનાસકાંઠા",
  "BHARUCH": "ભરૂચ",
  "BHAVNAGAR": "ભાવનગર",
  "BOTAD": "બોટાદ",
  "CHHOTAUDEPUR": "છોટાઉદેપુર",
  "DAHOD": "દાહોદ",
  "DANGS": "ડાંગ",
  "DEVBHUMIDWARKA": "દેવભૂમિ દ્વારકા",
  "GANDHINAGAR": "ગાંધીનગર",
  "GIRSOMNATH": "ગીર સોમનાથ",
  "JAMNAGAR": "જામનગર",
  "JUNAGADH": "જૂનાગઢ",
  "KACHCHH": "કચ્છ",
  "KHEDA": "ખેડા",
  "MAHESANA": "મહેસાણા",
  "MAHISAGAR": "મહિસાગર",
  "MORBI": "મોરબી",
  "NARMADA": "નર્મદા",
  "NAVSARI": "નવસારી",
  "PANCHMAHALS": "પંચમહાલ",
  "PATAN": "પાટણ",
  "PORBANDAR": "પોરબંદર",
  "RAJKOT": "રાજકોટ",
  "SABARKANTHA": "સાબરકાંઠા",
  "SURAT": "સુરત",
  "SURENDRANAGAR": "સુરેન્દ્રનગર",
  "TAPI": "તાપી",
  "VADODARA": "વડોદરા",
  "VALSAD": "વલસાડ",
};

export const MANAGEMENTS = {
  "CENTRALGOVERNMENTSCHOOL": "કેન્દ્ર સરકાર શાળા",
  "GOVERNMENTAIDEDSCHOOL": "સરકારી અનુદાનિત શાળા",
  "GOVERNMENTSCHOOL": "સરકારી શાળા",
  "PRIVATESCHOOL": "ખાનગી શાળા",
  "RECOGNIZEDMADARSA": "માન્યતા પ્રાપ્ત મદરસા",
  "SPECIALGOVERNMENTSCHOOL": "વિશેષ સરકારી શાળા",
};

export const DISTRICT_TALUKA = {
  "MAHESANA": {
    "SATLASANA": "સતલાસણા",
    "MEHSANA": "મહેસાણા",
    "BECHARAJI": "બેચરાજી",
    "JOTANA": "જોટાણા",
    "VADNAGAR": "વડનગર",
    "VISNAGAR": "વિસનગર",
    "KADI": "કડી",
    "UNJHA": "ઉંજા",
    "KHERALU": "ખેરાલુ",
    "VIJAPUR": "વીઅજપુર",
  },
  "DANGS": {
    "SUBIR": "સુબિર",
    "WAGHAI": "વાઘાઈ",
    "AHWA": "આહવા",
  },
  "BOTAD": {
    "RANPUR": "રાણપુર",
    "GADHADA": "ગઢાડા",
    "BARVALA": "બારવાળા",
    "BOTAD": "બોટાડ",
  },
  "CHHOTAUDEPUR": {
    "NASWADI": "નસવાડી",
    "CHHOTAUDEPUR": "છોટાઉદેપુર",
    "BODELI": "બોદેલી",
    "SANKHEDA": "સંખેડા",
    "JETPURPAVI": "જેતપુર પાવી",
    "KAWANT": "કવાંત",
  },
  "SABARKANTHA": {
    "TALOD": "તાલોદ",
    "POSHINA": "પોશીના",
    "VIJAYNAGAR": "વિજયનગર",
    "HIMMATNAGAR": "હિમ્મતનગર",
    "KHEDBRAHMA": "ખેડબ્રહ્મા",
    "VADALI": "વડાલી",
    "IDAR": "ઈડર",
    "PRANTIJ": "પ્રાંતિજ",
  },
  "MAHISAGAR": {
    "KADANA": "કાદાણા",
    "KHANPUR": "ખાનપુર",
    "VIRPUR": "વીરપુર",
    "LUNAWADA": "લુણાવાડા",
    "SANTRAMPUR": "સન્ટ્રામપુર",
    "BALASINOR": "બાલાસિનોર",
  },
  "BHARUCH": {
    "VAGRA": "વગ્રા",
    "ZAGHADIA": "ઝાઘડિયા",
    "AMOD": "અમોડ",
    "NETRANG": "નેترلંગ",
    "VALIA": "વાલિયા",
    "ANKLESHWAR": "આંકલેશ્વર",
    "JAMBUSAR": "જંબુસાર",
    "BHARUCH": "ભરૂચ",
    "HANSOT": "હંસોત",
  },
  "GIRSOMNATH": {
    "GIRGADHADA": "ગિરગઢાડા",
    "UNA": "ઉના",
    "TALALA": "તાલાલા",
    "KODINAR": "કોડીનાર",
    "SUTRAPADA": "સુત્રાપાડા",
    "VERAVAL": "વેરાવળ",
  },
  "PORBANDAR": {
    "PORBANDAR": "પોરબંદર",
    "RANAVAV": "રાણાવાવ",
    "KUTIYANA": "કુટિયાણા",
  },
  "DAHOD": {
    "LIMKHEDA": "લિમખેડા",
    "DAHOD": "ડાહોદ",
    "ZALOD": "જાલોદ",
    "GARBADA": "ગરબડા",
    "SANJELI": "સંજેલી",
    "DHANPUR": "ધનપુર",
    "SINGVAD": "સિંગવડ",
    "FATEPURA": "ફતેપુરા",
    "DEVBARIA": "દેવબરિયા",
  },
  "SURAT": {
    "MANGROL": "માંગરોલ",
    "MAHUVA": "મહુવા",
    "OLPAD": "ઓલપાડ",
    "CHORYASI": "છોર્યાસી",
    "PALASANA": "પાલસાણા",
    "SURATCORPO": "સુરત કોર્પોરેશન",
    "MANDAVI": "મંડવી",
    "KAMREJ": "કામરેજ",
    "BARDOLI": "બારડોલી",
    "UMARPADA": "ઉમરના પાઢા",
  },
  "JAMNAGAR": {
    "DHROL": "ઢ્રોલ",
    "JAMNAGAR": "જામનગર",
    "LALPUR": "લાલપુર",
    "JODIYA": "જોડીયા",
    "KALAVAD": "કલાવડ",
    "JAMJODHPUR": "જામજોધપુર",
  },
  "KHEDA": {
    "THASARA": "થાસરા",
    "VASO": "વાસો",
    "MAHEMDAVAD": "મહેમદાવાદ",
    "KATHLAL": "કઠલાલ",
    "KHEDA": "ખેળા",
    "KAPADVANJ": "કાપડવંજ",
    "NADIAD": "નડિયાદ",
    "GALTESHWAR": "ગલતેશ્વર",
    "MAHUDHA": "મહુધા",
    "MATAR": "માતર",
  },
  "VADODARA": {
    "DABHOI": "ડભોઇ",
    "SAVLI": "સાવલી",
    "VADODARACORPORATION": "વડોદરા કોર્પોરેશન",
    "VAGHODIYA": "વાઘોડિયા",
    "DESAR": "દેસર",
    "VADODARA": "વડોદરા",
    "KARJAN": "કારજન",
    "PADRA": "પાદરા",
    "SHINOR": "શિનોર",
  },
  "RAJKOT": {
    "JAMKANDORNA": "જામકંદોર્ના",
    "PADDHARI": "પાડ્ડહીરી",
    "GONDAL": "ગોંડલ",
    "LODHIKA": "લોધિકા",
    "JASDAN": "જસદણ",
    "RAJKOTCORPORATION": "રાજકોટ કોર્પોરેશન",
    "VINCHHIYA": "વિન્ચીયા",
    "UPLETA": "ઉપ્લેટા",
    "DHORAJI": "ધોરાજી",
    "JETPUR": "જેટપુર",
    "KOTDASANGANI": "કોટદાસંગણી",
    "RAJKOT": "રાજકોટ",
  },
  "BANASKANTHA": {
    "VAV": "વાવ",
    "DANTA": "દાંતા",
    "VADGAM": "વડગામ",
    "BHABHAR": "ભભર",
    "PALANPUR": "પાલનપુર",
    "DEESA": "દીસા",
    "LAKHANI": "લાખાની",
    "DEODAR": "દેઓદાર",
    "KANKAREJ": "કાંકડાજ",
    "THARAD": "થરાડ",
    "AMIRGADH": "અમિરગઢ",
    "DANTIWADA": "દાંતીયાવાડા",
    "DHANERA": "ધનેરા",
    "SUIGAM": "સુઈગામ",
  },
  "NARMADA": {
    "GARUDESHWAR": "ગરુડેશ્વર",
    "DEDIYAPADA": "દેડીયાપાડા",
    "SAGBARA": "સાગબારા",
    "TILAKVADA": "તિલાકવાડા",
    "NANDOD": "નાંડોડ",
  },
  "KACHCHH": {
    "BHACHAU": "ભાચાઉ",
    "GANDHIDHAM": "ગાંધીધામ",
    "MANDVI": "મંડવી",
    "MUNDRA": "મુન્દ્રા",
    "NAKHATRANA": "નખત્રાણા",
    "BHUJ": "ભુજ",
    "RAPAR": "રાપર",
    "LAKHAPAT": "લાખાપાટ",
    "ABDASA": "અબદાસા",
    "ANJAR": "અંજાર",
  },
  "AHMEDABAD": {
    "DASCROI": "દાસક્રોઇ",
    "CITY": "સિટી",
    "VIRAMGAM": "વીરમગામ",
    "AMC": "એએમસી",
    "SANAND": "સાનંદ",
    "BAVLA": "બાવલા",
    "DHOLKA": "ધોલકા",
    "DHANDHUKA": "ધાંધુકા",
    "DETROJRAMPURA": "દેટ્રોજરામપુરા",
    "DHOLERA": "ઢોલેરા",
    "MANDAL": "મંડલ",
  },
  "BHAVNAGAR": {
    "SHIHOR": "શિહોર",
    "UMRALA": "ઉમરાળા",
    "MAHUVA": "મહુવા",
    "VALLBHIPUR": "વલ્લભીપુર",
    "TALAJA": "તલાજા",
    "GARIYADHAR": "ગરીયાધર",
    "JESAR": "જેસર",
    "PALITANA": "પાલીતાણા",
    "GHOGHA": "ઘોગા",
    "BHAVNAGAR": "ભવનગર",
  },
  "JUNAGADH": {
    "MANGROL": "મણગરોલ",
    "MALIYAHATINA": "માલિયાહાતિના",
    "MENDARDA": "મેન્ડારડા",
    "KESHOD": "કેશોદ",
    "JUNAGADH": "જૂનાગઢ",
    "JUNAGADHCORPORATION": "જૂનાગઢ કોર્પોરેશન",
    "BHESAN": "ભેસાન",
    "VISAVADAR": "વિસાવદર",
    "MANAVADAR": "માનાવદર",
    "VANTHALI": "વાંથલી",
  },
  "VALSAD": {
    "VALSAD": "વલસાડ",
    "VAPI": "વાપી",
    "UMBERGAON": "ઉમ્બરગામ",
    "PARDI": "પાર્ડી",
    "KAPARADA": "કપારાદા",
    "DHARAMPUR": "ધરમપુર",
  },
  "ANAND": {
    "UMRETH": "ઉમરેઠ",
    "TARAPUR": "તારાપૂર",
    "SOJITRA": "સોજિત્રા",
    "PETLAD": "પેટલાદ",
    "BORSAD": "બોરસદ",
    "KHAMBHAT": "ખંભાટ",
    "ANKLAV": "આંકલાવ",
    "ANAND": "આણંદ",
  },
  "SURENDRANAGAR": {
    "DHRANGADHRA": "ધ્રાંગધ્રા",
    "CHOTILA": "ચોટીલા",
    "THANGADH": "થાંગઢ",
    "PATDIDASADA": "પાટદીદાસાડા",
    "SAYLA": "સાયલા",
    "CHUDA": "ચુદા",
    "WADHVAN": "વાઢવાન",
    "LAKHTAR": "લાકઠાર",
    "LIMBDI": "લિંબડી",
    "MULI": "મુલી",
  },
  "TAPI": {
    "KUKARMUNDA": "કુકરમુંડા",
    "SONGADH": "સોંગઢ",
    "UCHCHHAL": "ઉચ્ચ્હાલ",
    "VALOD": "વાલોદ",
    "DOLVAN": "દોલવાન",
    "VYARA": "વ્યારા",
    "NIZAR": "નિઝાર",
  },
  "NAVSARI": {
    "VANSDA": "વન્સડા",
    "CHIKHLI": "ચીખલી",
    "JALALPOR": "જલાલપોર",
    "KHERGAM": "ખેરગામ",
    "GANDEVI": "ગનદેવી",
    "NAVSARI": "નવસારી",
  },
  "PANCHMAHALS": {
    "KALOL": "કલોલ",
    "SHAHERA": "શાહેરા",
    "JAMBUGHODA": "જમ્બુઘોડા",
    "GHOGHAMBA": "ઘોગંભા",
    "HALOL": "હલોલ",
    "GODHRA": "ગોધરા",
    "MORVAHADAF": "મોરવા હડફ",
  },
  "AMRELI": {
    "DHARI": "ધારી",
    "SAVARKUNDLA": "સવરકુંડલા",
    "KUKAVAV": "કુકવાવ",
    "RAJULA": "રાજુલા",
    "JAFRABAD": "જાફરાબાદ",
    "AMRELI": "અમરેલી",
    "BABARA": "બાબરા",
    "LATHI": "લાઠી",
    "LILIYA": "લીલિયા",
    "KHAMBHA": "ખંભા",
    "BAGASARA": "બાગસાર",
  },
  "PATAN": {
    "SAMI": "સામી",
    "SHANKHESHWAR": "શંખેશ્વર",
    "SIDDHPUR": "સિદ્ધપુર",
    "HARIJ": "હારિજ",
    "CHANASMA": "ચાણાસ્મા",
    "RADHANPUR": "રાધણપુર",
    "PATAN": "પાટણ",
    "SARASWATI": "સરસ્વતી",
    "SANTALPUR": "સાંતાલપુર",
  },
  "DEVBHUMIDWARKA": {
    "DWARKA": "દ્વારકા",
    "JAMKHAMBHALIYA": "જામખંભાલીયા",
    "JAMKALYANPUR": "જામકલ્યાણપુર",
    "BHANVAD": "ભાનવડ",
  },
  "GANDHINAGAR": {
    "KALOL": "કલોલ",
    "DEHGAM": "દેહગામ",
    "MANSA": "મંસા",
    "GANDHINAGAR": "ગાંધીનગર",
  },
  "ARVALLI": {
    "DHANSURA": "ધન્સરા",
    "BHILODA": "ભિલોડા",
    "MALPUR": "માલપુર",
    "MEGHRAJ": "મેઘરાજ",
    "BAYAD": "બાયદ",
    "MODASA": "મોડાસા",
  },
  "MORBI": {
    "HALVAD": "હાલવાડ",
    "WANKANER": "વાનકાનેર",
    "MALIYA": "માલિયા",
    "MORBI": "મોરબી",
    "TANKARA": "તાણકારા",
  },
};

export const SCHOOL_TYPES = {
  "BOYS": "છોકરાઓની શાળા",
  "GIRLS": "છોકરીઓની શાળા",
  "COEDUCATIONAL": "સહશિક્ષણ",
};

export const LOCATION_TYPES = {
  "RURAL": "ગ્રામ્ય",
  "URBAN": "શહેરી",
};

export const MEDIUMS = {
  "GUJARATI": "ગુજરાતી",
  "ENGLISH": "અંગ્રેજી",
  "HINDI": "હિન્દી",
  "MARATHI": "મરાઠી",
  "ORIYA": "ઓડિયા",
  "SANSKRIT": "સંસ્કૃત",
  "URDU": "ઉર્દૂ",
};

export const BOARDS = {
  "STATEBOARD": "રાજ્ય બોર્ડ (GSEB)",
  "CBSE": "CBSE",
  "ICSE": "ICSE",
  "INTERNATIONALBOARD": "આંતરરાષ્ટ્રીય બોર્ડ",
};

export const STREAMS = {
  "ARTS": "ARTS",
  "COMMERCE": "COMMERCE",
  "SCIENCE": "SCIENCE",
  "VOCATIONAL": "VOCATIONAL",
  "OTHER": "OTHER",
};

export const ACTIVE_CHIP_KEYS = {
  "q": "q",
  "district": "district",
  "taluka": "taluka",
  "medium": "medium",
  "board": "board",
  "management": "management",
  "schoolType": "schoolType",
  "locationType": "locationType",
  "sortBy": "sortBy",
  "gradeFrom": "gradeFrom",
  "gradeTo": "gradeTo",
  "streams": "streams",
  "lat": "lat",
  "lng": "lng",
  "nearRadius": "nearRadius",
};

export const CHIP_LABELS = {
  "q": "શોધ",
  "district": "જિલ્લો",
  "taluka": "તાલુકો",
  "medium": "માધ્યમ",
  "board": "બોર્ડ",
  "management": "વ્યવ.",
  "schoolType": "પ્રકાર",
  "locationType": "વિસ્તાર",
  "sortBy": "ક્રમ",
  "gradeFrom": "ગ્રેડ થી",
  "gradeTo": "ગ્રેડ સુધી",
  "streams": "સ્ટ્રીમ",
};

export const FILTER_KEYS = {
  "sortBy": "sortBy",
  "district": "district",
  "taluka": "taluka",
  "gradeFrom": "gradeFrom",
  "gradeTo": "gradeTo",
  "medium": "medium",
  "board": "board",
  "streams": "streams",
  "management": "management",
  "schoolType": "schoolType",
  "locationType": "locationType",
  "lat": "lat",
  "lng": "lng",
  "nearRadius": "nearRadius",
};

export const CATEGORY_TYPES = {
  "HIGHERSECONDARY": "HIGHERSECONDARY",
  "PRIMARY": "PRIMARY",
  "PRIMARYTOHIGHERSECONDARY": "PRIMARYTOHIGHERSECONDARY",
  "PRIMARYTOSECONDARY": "PRIMARYTOSECONDARY",
  "PRIMARYUPPERPRIMARY": "PRIMARYUPPERPRIMARY",
  "SECONDARY": "SECONDARY",
  "SECONDARYHIGHERSECONDARY": "SECONDARYHIGHERSECONDARY",
  "UPPERPRIMARY": "UPPERPRIMARY",
  "UPPERPRIMARYTOHIGHERSECONDARY": "UPPERPRIMARYTOHIGHERSECONDARY",
  "UPPERPRIMARYTOSECONDARY": "UPPERPRIMARYTOSECONDARY",
};

export const GRADE_FROM = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
};

export const GRADE_TO = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
  "12": 12,
};

export const SORTS = {
  "": "ડિફૉલ્ટ",
  "students": "વિદ્યાર્થી ↓",
  "name": "નામ A–Z",
  "district": "જિલ્લો A–Z",
  "newest": "નવી પહેલા",
};

export const FILTER_VALUE_LABELS = {
  "district": DISTRICTS,
  "medium": MEDIUMS,
  "board": BOARDS,
  "streams": STREAMS,
  "management": MANAGEMENTS,
  "schoolType": SCHOOL_TYPES,
  "locationType": LOCATION_TYPES,
  "sortBy": SORTS,
  "gradeFrom": GRADE_FROM,
  "gradeTo": GRADE_TO,
};

export const getTalukaLabel = (district, value) =>
  district && DISTRICT_TALUKA[district]
    ? getLabel(DISTRICT_TALUKA[district], value)
    : value;

export const getFilterValueLabel = (key, value, context = {}) => {
  if (key === "taluka") {
    return getTalukaLabel(context.district, value);
  }

  const lookup = FILTER_VALUE_LABELS[key];
  return lookup ? getLabel(lookup, value) : value;
};

export const CLASS_RANGE_PRESET_OPTIONS = Object.entries(CLASS_RANGE_PRESETS).map(
  ([value, preset]) => ({
    value,
    label: preset.label,
    from: preset.from,
    to: preset.to,
  })
);
export const DISTRICT_OPTIONS = createOptions(DISTRICTS);
export const MANAGEMENT_OPTIONS = createOptions(MANAGEMENTS);
export const DISTRICT_TALUKA_OPTIONS = Object.fromEntries(
  Object.entries(DISTRICT_TALUKA).map(([district, talukas]) => [
    district,
    createOptions(talukas),
  ])
);
export const SCHOOL_TYPE_OPTIONS = createOptions(SCHOOL_TYPES);
export const LOCATION_TYPE_OPTIONS = createOptions(LOCATION_TYPES);
export const MEDIUM_OPTIONS = createOptions(MEDIUMS);
export const BOARD_OPTIONS = createOptions(BOARDS);
export const STREAM_OPTIONS = createOptions(STREAMS);
export const ACTIVE_CHIP_KEY_OPTIONS = createOptions(ACTIVE_CHIP_KEYS);
export const CHIP_LABEL_OPTIONS = createOptions(CHIP_LABELS);
export const FILTER_KEY_OPTIONS = createOptions(FILTER_KEYS);
export const CATEGORY_TYPE_OPTIONS = createOptions(CATEGORY_TYPES);
export const FILTER_VALUE_LABEL_OPTIONS = Object.fromEntries(
  Object.entries(FILTER_VALUE_LABELS).map(([key, lookup]) => [
    key,
    createOptions(lookup),
  ])
);
export const GRADE_FROM_OPTIONS = createOptions(GRADE_FROM);
export const GRADE_TO_OPTIONS = createOptions(GRADE_TO);
export const SORT_OPTIONS = createOptions(SORTS);
