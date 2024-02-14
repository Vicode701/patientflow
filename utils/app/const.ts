export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const DEFAULT_TEMPERATURE = 
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "0.7");

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

export const MODEL_MAX_LENGTH = 12000;

export const MODEL_TOKEN_LIMIT = 4000;

export const FeedbackHTMLTemplate = `
<div>
    <h1>Hey! You got a feedback</h1>
    <p>Got satisfactory response in: {{satisfactoryResponse}}</p>
    <p>Signed note with edits in: {{timeToSignedNotes}}</p>
    <p>Total time taken to complete note: {{totalDuration}}</p>
    <p>Response accuracy: {{responseAccuracy}}</p>
    <p>Decrease in note related stress: {{decreaseInStress}}</p>
    <p>Overall experience: {{overallExperience}}</p>
    <p>Case: {{caseId}}</p>
    <p>User: {{userId}}</p>    
</div>
`;

export const PasswordResetHTMLTemplate = `
<div>
  <p>Hey!,</p>
  <br>
  <p>We received a request to reset your <b>password</b> for your PatientFlowHQ account associated with this email address.</p>
  <br>
  <p>To reset your password, please click on the following link:</p>
  <br>
  <p>{{resetlink}}</p>
  <br>
  <p>This link will expire in 20 minutes.</p>
  <br>
  <p>If you did not request a password reset, please disregard this email. Your password will remain unchanged.</p>
  <br>
  <p>If you have any questions, please feel free to contact our support team at support@patientflowhq.com</p>
  <br>
  <p>Thanks,</p>
  <br>
  <p>The PatientFlowHQ Team</p>
</div>
`;

export const ErrorMessageContent = "Oops, something went wrong. Please try again, and if this issue persists please contact us at support@patientflowhq.com";

export const CARDIO = "cardiology";

export const PULM = "pulmonology";

export const GI = "gastroenterology";

export const ID = "infectious diseases";

export const ENDO = "endocrinology";

export const RHEUMA = "rheumatology";

export const NEURO = "neurology";

export const NEPHRO = "nephrology";

export const OTHER = "other";

export const HEMA = "hematology";

export const FeedResponseContent = {
  Two2FiveMinutes: "2-5 mins",
  Six2TenMinutes: "6-10 mins",
  Eleven2FifteenMinutes: "11-15 mins",
  Sixteen2TwentyMinutes: "16-20 mins",
  MoreThanTwentyMinutes: "More than 20 mins",
  Satisfactory: "Satisfactory",
  AboveExpectation: "Above expectation",
  BelowExpectation: "Below expectation",
  None: "None",
  MoreStress: "More stress",
  DecreasedStress: "Decreased stress",
  AccuracyMakesUp: "Accuracy makes up for effort"
};

export const CommonHistoryOptions = [
  "Abdominal discomfort",
  "Abdominal pain",
  "Anxiety",
  "Back pain",
  "Bedbound at baseline",
  "Blood in stool",
  "Blood in vomit",
  "Blurred vision",
  "Bone pain",
  "Breast pain or lumps",
  "Bright red blood in stool",
  "Brought from assisted living facility",
  "Brought from home",
  "Brought from nursing home",
  "Chest pain or discomfort",
  "Chest tightness",
  "Chills",
  "Cough",
  "Constipation",
  "Coughing up blood",
  "Dark stool",
  "Denies any other symptoms",
  "Depression",
  "Diaphoresis",
  "Diarrhea",
  "Dizziness",
  "Dizziness or vertigo",
  "Double vision",
  "Dysuria",
  "Erectile dysfunction",
  "Excessive hunger (polyphagia)",
  "Excessive thirst (polydipsia)",
  "Eye pain or redness",
  "Facial droop",
  "Fatigue",
  "Fever",
  "Flank pain",
  "Focal weakness",
  "Found on the floor",
  "Frequency of urination",
  "Gait instability",
  "Generalized weakness",
  "Groin pain",
  "Hallucinations or delusions",
  "Headache",
  "Hearing loss",
  "Heartburn",
  "Heat or cold intolerance",
  "Hematuria",
  "Hemoptysis",
  "History of Asthma",
  "History of CAD",
  "History of CKD",
  "History of COPD",
  "History of COPD on BiPAP",
  "History of CVA",
  "History of CVA with residual symptoms",
  "History of DVT",
  "History of DVT on anticoagulation",
  "History of Diabetes Mellitus",
  "History of HFpEF",
  "History of HFrEF",
  "History of OSA",
  "History of OSA on CPAP",
  "History of PE",
  "History of PE on anticoagulation",
  "History of alcohol abuse",
  "History of atrial fibrillation",
  "History of atrial fibrillation on anticoagulation",
  "History of chronic hypoxia on home oxygen",
  "History of hypertension",
  "History of hypothyroidism",
  "History of peripheral arterial disease",
  "History of recurrent DKA",
  "History of tobacco smoking",
  "History of urinary retention with Indwelling foley",
  "Hives",
  "Inability to produce words/Aphasia",
  "Incontinence",
  "Indigestion",
  "Itching (pruritus)",
  "Itching",
  "Joint pain or swelling",
  "Limited range of motion",
  "Loose bowel movement",
  "Loss of consciousness",
  "Loss of vision",
  "Malaise",
  "Memory loss or confusion",
  "Mood swings",
  "Muscle pain or cramps",
  "Nasal congestion or discharge",
  "Nausea",
  "Night sweats",
  "Non-productive cough",
  "Numbness",
  "Palpitations",
  "Pelvic pain",
  "Photophobia",
  "Poor oral intake",
  "Productive cough",
  "Recurrent infections",
  "Seizures",
  "Shortness of breath",
  "Shortness of breath on exertion",
  "Skin lesions or ulcers",
  "Sleep disturbances",
  "Slurred speech",
  "Sore throat",
  "Swelling in the throat/tongue",
  "Swelling of ankles",
  "Swelling of feet",
  "Swollen lymph nodes",
  "Syncope/loss of consciousness",
  "Testicular pain",
  "Tingling",
  "Tinnitus",
  "Unintentional weight loss or gain",
  "Urinary Urgency",
  "Vaginal discharge",
  "Vertigo",
  "Vomiting",
  "Weakness",
  "Wheezing",
  "Yellowing of the skin"  
];

export const CommonWorkupOptions = [
  "CT angio chest negative for PE",
  "CT angio chest shows Pulmonary embolism",
  "CT head with no acute findings",
  "CXR with focal infiltrates",
  "CXR with pulmonary vascular congestion",
  "Clear chest X-ray",
  "EKG shows atrial fibrillation",
  "EKG shows atrial fibrillation with RVR",
  "EKG shows sinus rhythm",
  "Elevated Blood pressure",
  "Elevated CPK",
  "Elevated Creatinine",
  "Elevated Troponin",
  "Elevated WBCs",
  "Elevated potassium",
  "Elevated sodium",
  "Elevated transaminasesBN BBGHL",
  "Hemodynamically stable",
  "Hypoxic requiring oxygen supplementation",
  "Low blood pressure",
  "Low hemoglobin",
  "Low platelets",
  "Low potassium",
  "Low sodium",
  "No acute ischemic changes on EKG",
  "Non-specific ST-T changes on EKG",
  "Orthostatic vitals positive",
  "Sacral wounds",
  "UTI on urinalysis"
]

export const BILLABLE_CASE_CATEGORIES = {
  CARDIO: [
    "Chest pain R/O Acute coronary Syndrome (No significant ACS findings)",
    "NSTEMI", 
    "STEMI",      
    "Elevated troponin",
    "Unspecified Heart Failure",
    "Acute on chronic Heart Failure with reduced ejection fraction",
    "New onset Heart Failure with reduced ejection fraction",
    "Chronic Heart Failure with reduced ejection fraction",
    "Acute on chronic Heart failure with preserved ejection", 
    "New onset (Acute) Heart failure with preserved ejection", 
    "Chronic heart failure with preserved ejection fraction", 
    "Syncope", 
    "New onset Atrial fibrillation with Rapid ventricular response", 
    "New onset Atrial fibrillation with Normal ventricular response", 
    "Atrial fibrillation with Rapid ventricular response", 
    "New onset Atrial flutter with Rapid ventricular response", 
    "New onset Atrial flutter with Normal ventricular response", 
    "Atrial flutter with Rapid ventricular response",
    "Atrial flutter with Normal ventricular response", 
    "Supraventricular tachycardia",
    "Symptomatic Bradycardia",
    "Hypertensive urgency", 
    "Hypertensive emergency", 
    "History of Hypertension", 
    "Thoracic Aortic aneurysm/Dissections",
    "Peripheral arterial disease",
    "ASCVD", 
    "Acute Pericarditis"
  ],
  PULM: [
    "Acute Hypoxic respiratory failure",
    "COPD Exacerbation",
    "Asthma Exacerbation",
    "Community Acquired Pneumonia/May add location",
    "Healthcare Associated Pneumonia/May add location",
    "Aspiration Pneumonia/Community Acquired Pneumonia",
    "COVID 19 Pneumonitis",
    "Acute Hypoxic Respiratory Failure Secondary to COVID 19 pneumonitis",
    "Acute on chronic Hypoxic respiratory failure", 
    "Chronic Hypoxic respiratory failure",
    "Acute Hypercapnic respiratory failure", 
    "Acute on chronic hypercapnic respiratory support",
    "Acute Hypercapnic and Hypoxic Respiratory failure",
    "Acute hypoxic respiratory failure secondary to Acute respiratory distress syndrome",
    "Low Risk Pulmonary embolism/Add location",
    "Intermediate Risk (Sub-massive) Pulmonary embolism/Add location",
    "High risk (Massive) Pulmonary embolism",
    "High risk (Massive) Pulmonary embolism/Add location",
    "Pleural effusion",
    "Pulmonary nodule",
    "Hemoptysis",
    "Interstitial lung disease",
    "Pulmonary hypertension",
    "Pulmonary Hypertension with known Group/etiology"
  ],
  GI: [
    "Esophagitis/GERD",
    "Gastritis, Gastroenteretitis",
    "Intractable Abdominal Pain",
    "Intractable nausea and vomiting",
    "Small bowel obstruction",
    "Diarrhea",
    "Acute Pancreatitis",
    "Pancreatic mass",
    "Upper GI Bleed",
    "Lower GI Bleed",
    "Acute Blood Loss Anemia",
    "Inflammatory Bowel Disease",
    "Intestinal Ischemia",
    "Transaminitis",
    "Acute Liver failure",
    "Cirrhosis",
    "Ascites",
    "Liver mass",
    "Hepatitis",
    "Choledocholithiasis",
    "Cholangitis",
    "Acute Cholecystitis",
    "Colitis",
    "Colon mass",
    "Colonic mass"
  ],
  ID: [
    "Urinary tract infection",
    "Cellulitis",
    "Bone infection",
    "Endocarditis",
    "Meningitis/CNS infection",
    "Fungal infections",
    "Fever of unclear source",
    "Leukocytosis of unclear source",
    "HIV/AIDS",
    "Sepsis"
  ],
  ENDO: [
    "History of Diabetes Mellitus",
    "Diabetes Mellitus with Non-DKA Non HHS hyperglycemia",
    "Diabetic Ketoacidosis",
    "Hyperglycemic Hyperosmolar State",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Hypocalcemia",
    "Hypercalcemia",
    "Adrenal Mass",
    "Hypercortisolism",
    "Adrenal Insufficiency"    
  ],
  RHEUMA: [
    "Systemic lupus erythematous",
    "Rheumatoid arthritis",
    "Infectious arthritis",
    "Vasculitis",
    "Cryoglobunemia",
    "Seronegative spondyloarthropathies",
    "Amyloidosis"
  ],
  NEURO: [
    "Acute encephalopathy",
    "Seizure disorder",
    "New onset seizures",
    "Stroke like symptoms",
    "Acute CVA",
    "Hemorrhagic stroke",
    "Cerebral Edema",
    "Approach to stroke-like symptoms",
    "Neuromuscular dysfunction",
    "Multiple sclerosis/Demyelinating disease",
    "Alcohol withdrawal",
    "Cord compression",
    "Spinal abscess"
  ],
  NEPHRO: [
    "Acute Kidney Injury",
    "Chronic kidney Disease",
    "Acute on Chronic Kidney Disease", 
    "High anion gap metabolic acidosis", 
    "Normal anion gap metabolic acidosis",
    "Hyponatremia", 
    "Hypernatremia",
    "Hyperkalemia", 
    "Hypokalemia", 
    "Hypomagnesemia", 
    "Glomerular Disease", 
    "Obstructive Uropathy", 
    "Nephrolithiasis",
    "Rhabdomyolysis",
  ],
  HEMA: [
    "Anemia",
    "Thrombocytopenia",
    "Coagulopathy",
    "Stabilizing a bleeding patient",
    "Hypercoagulable states",
    "Myelodysplastic syndrome",
    "Myeloproliferative diseases",
    "Leukemia",
    "Lymphoma",
    "Plasma cell dyscrasias",
    "Hematologic emergencies"    
  ],
  OTHER: [],
}