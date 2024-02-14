import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { OPENAI_API_HOST, BILLABLE_CASE_CATEGORIES, CARDIO, PULM, ENDO, RHEUMA, NEURO, NEPHRO, ID, GI, HEMA } from '../app/const';

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';
import { Message } from '@/types/chat';
import { NextResponse } from 'next/server';

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

const getBillableCategory = (billable_category: string ) => {
  let possibleDiagnosis: string[];

  switch (billable_category.toLowerCase()) {
    
    case CARDIO:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.CARDIO;
      break;
    case PULM:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.PULM;
      break;
    case ID:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.ID;
      break;
    case ENDO:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.ENDO;
      break;
    case RHEUMA:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.RHEUMA;
      break;
    case NEURO:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.NEURO;
      break;
    case NEPHRO:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.NEPHRO;
      break;
    case GI:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.GI;
      break;
    case HEMA:
        possibleDiagnosis = BILLABLE_CASE_CATEGORIES.HEMA;
        break;
    default:
      possibleDiagnosis = BILLABLE_CASE_CATEGORIES.OTHER;
      break;
  }

  return possibleDiagnosis;
}

export const OpenAICategoriesCompletion = async (
  model: OpenAIModel,
  temperature: number,
  key: string,
  messages: Message[],
) =>
{
  const max_tokens: number = 3000;
  //let url = `https://api.openai.com/v1/completions`;
  let url = `${OPENAI_API_HOST}/v1/chat/completions`;
  const defaultModel = process.env.DEFAULT_MODEL;
 let applicableBillableCategories: string[] | undefined;
 const apiKey: string = process.env.OPENAI_KEY!;
 console.log(`Using temperature ${temperature}`);

 const categorySystemPrompt = `You are an assistant to a physician, aiding them in quickly and accurately diagnosing conditions. You will get a list of patient's past medical history and initial workup done on a patient. You will respond with the specialty(ies) where patient issues are related to. You can only respond with one or more of the following: cardiology, pulmonology, gastroenterology, nephrology, hematology, infectious diseases, endocrinology, rheumatology, neurology
 Next you will get a sample input and the expected output:
   Chief complaint: Shortness of breath 
   Medical History:
   - History of Diabetes Mellitus Type 2
   - History of Hypertension
   
   Important workup:
   - Creatinine 2.7 (baseline 1.2) - AKI
   - Elevated AST 160, Elevated ALT 130 - Transaminitis 
   - Elevated Troponin 150 (high sensitivity)
   ####
   Response:
   ["cardiology","gastroenterology"]
 `;
 
 const categoryCompletion = await fetch(url, {
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${apiKey}`,
   },
   method: 'POST',
   body: JSON.stringify({
     model: defaultModel,
     messages: [
       {
         role: 'system',
         content: categorySystemPrompt,
       },
       ...messages,
     ],
     max_tokens: max_tokens,
     temperature: temperature,
   }),
 });

 console.log(`Calling openai for categoryCompletion`);
 const categoryResponse = await categoryCompletion.json();
 const categories =  categoryResponse.choices[0].message.content;
 //console.log(``);
 console.log(`Categories are: ${categories}`);
 if (categories){
   const categoriesList: string[] = JSON.parse(categories);

   categoriesList.map((cat) => {
     const billableDiagnoses = getBillableCategory(cat);
     if (!applicableBillableCategories) {
       applicableBillableCategories = billableDiagnoses;
     } else {
       applicableBillableCategories = [...applicableBillableCategories, ...billableDiagnoses];
     }
   });
 }

 console.log(`applicableBillableCategories is ${JSON.stringify(applicableBillableCategories)}`);

 return NextResponse.json({ data: JSON.stringify(applicableBillableCategories) }, { status: 200 });
}

export const OpenAICompletion = async (
  model: OpenAIModel,
  temperature: number,
  key: string,
  messages: Message[],
  applicableBillableCategories: string[]
) => {
  const max_tokens: number = 3000;
   //let url = `https://api.openai.com/v1/completions`;
   let url = `${OPENAI_API_HOST}/v1/chat/completions`;
   const defaultModel = process.env.DEFAULT_MODEL;
  //let applicableBillableCategories: string[] | undefined;
  const apiKey: string = process.env.OPENAI_KEY!;
  console.log(`Using temperature ${temperature}`);

  const systemPrompt = `You are an assistant to a physician, aiding them in quickly and accurately diagnosing conditions. Based on the provided information, you will write the the H&P using ONLY history findings without using any of the important workup items. Write the Interval History using ONLY important workup items and determine the appropriate diagnosis and list the assessment and plan for each diagnosis. The diagnosis must be based on the workup and problems identified from medical history done for the patient. You must pick the diagnosis from the following lists: \n ${JSON.stringify(applicableBillableCategories)}
  
  Also, give the in-patient status of the patient i.e based on the workups and identified problems should the patient be admitted or not and then give an estimated length of stay (LOS) the patient is expected to stay admitted in the hospital. Note: Always add the line 'All previous hospital notes, ER notes reviewed and additional information from family members also reviewed.' verbatim after the assessment and plan and before the estimated LOS. Next you will get a sample of how the case will be presented. Then you respond with the diagnoses and the corresponding assessments and plans in the format shown in the example below. Highlight other workups to consider if not already done.

  Chief complaint: Loss of consciousness
  Medical History:
  - 72 yo female
  - Palpitations
  - diaphoresis
  - chest pain mid sternal non radiating
  - no aggravating or alleviating factors
  - no head trauma
  - no post ictal period
  - COPD
  - CAD
  - Hypertension
  
  Important workup:
  - Positive orthostatic vitals
  - elevated troponin
  - No acute ischemic changes on EKG
  - Check D-dimer 
  ####

  H & P:

  Patient is a 72 year old female with a medical history of COPD, CAD, Hypertension and Hyperlipidemia who presented after a syncopal episode. She was in her usual state of health prior to the episode. She had a brief period of palpitations, diaphoresis, and mild chest pain prior to the episode. She does not remember if she hit her head or not. She remembers where she was when she woke up and denied any prolonged period of confusion. She describes her chest pain as mid sternal, sharp, and non radiating. She reports no aggravating or alleviating factors. She denies any shortness of breath or any other symptoms.

  Interval History:
  
  In the ED, patient was found to have positive orthostatic vitals, elevated troponin. No acute ischemic changes was found on EKG. Patient was refered to hospitalist service for further evaluations and management.
  
  Assessment and Plan:

  - Syncope:

    Differentials include vasovagal, situational however can not r/o Cardiac or neurologic etiologies
    Orthostatic vitals:
    EKG:
    D-dimer to r/o Pulmonary embolism if low clinical suspicion
    Signs of acute coronary syndrome: troponin, acute ischemic changes on EKG?
    Signs of structural heart disease: Murmur, LVH on EKG – Obtain echocardiography
    Neurologic deficits or Post ictal state:
    If presence of neurologic symptoms, consider head imaging
    Place patient on telemetry
    Cardiology evaluation if high suspicion for cardiac etiology

  - Elevated troponin:

    Likely demand ischemia due to cardiopulmonary distress given absence of chest pain or acute ischemic changes on EKG
    Will continue to trend troponin
    If uptrending will get echocardiography and obtain cardiology evaluation 
  
  - History of Hypertension:

    Resume blood pressure medications as tolerated 
  
  - History of CAD:

    Continue home medications including Aspirin and Statins

  All previous hospital notes, ER notes reviewed and additional information from family members also reviewed.  

  Estimated LOS: 3 - 4 days
`;
//  Note: don't say anything else after the line that starts with 'Estimated LOS: 


  const modelResponse = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: defaultModel,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: max_tokens,
      temperature: temperature,
      stream: true,
    }),
  });

  console.log('Waiting on model response');
  
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (modelResponse.status !== 200) {
    const result = await modelResponse.json();
    console.log(`Error from model: ${result.statusText}`);
    if (result.error) {
      throw new OpenAIError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code,
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${
          result.statusText
        }`,
      );
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          try {
            const json = JSON.parse(data);
            if (json.choices[0].finish_reason != null) {
              controller.close();
              return;
            }
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of modelResponse.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  console.log('Model response received');
  return stream;
};