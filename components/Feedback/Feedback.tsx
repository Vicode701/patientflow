'use client'
// components/FeedbackForm.tsx
import { useContext, useState } from 'react';
import { submitFeedback } from '@/app/home/feedbackaction';
import { FeedbackContent } from '@/types/feedback';
import { FeedResponseContent } from '@/utils/app/const';
import { IconCheck } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import HomeContext from '@/types/home.context';

interface FeedbackFormProps {
    userId: string;
    caseId: string
}

export const FeedbackForm = ({ userId, caseId}: FeedbackFormProps) => {
    const {
        state: { feedbackSent },    
        dispatch: homeDispatch,
      } = useContext(HomeContext);
      
    const [formData, setFormData] = useState<FeedbackContent>({
        satisfactoryResponse: '',
        timeToSignedNotes: '',
        totalDuration: '',
        responseAccuracy: '',
        decreaseInStress: '',
        overallExperience: '',
        feedback: '',
        userId: userId,
        caseId: caseId
    });

    const [selectedOptions, setSelectedOptions] = useState({
        satisfactoryResponse: '',
        timeToSignedNotes: '',
        totalDuration: '',
        responseAccuracy: '',
        decreaseInStress: '',
        overallExperience: '',
      });


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submitFeedback(formData);
        // Reset form data for the next submission
        setFormData({
          satisfactoryResponse: '',
          timeToSignedNotes: '',
          totalDuration: '',
          responseAccuracy: '',
          decreaseInStress: '',
          overallExperience: '',
          feedback: '',
          userId: userId,
          caseId: caseId
        });
        // TODO: Add user feedback here (e.g., a success message)
        toast("Feedback sent. Thank you!");
        homeDispatch({ field: 'feedbackSent', value: true });
    };

    const updateField = (field: keyof FeedbackContent, value: string) => {
        setFormData(prevState => ({ ...prevState, [field]: value }));
        setSelectedOptions(prevState => ({ ...prevState, [field]: value }));
      };

    const isSelected = (field: keyof typeof selectedOptions, value: string) => {
    return selectedOptions[field] === value;
    };

    return (
        <div className='flex flex-col items-center px-4 sm:px-6 lg:px-8'>
            <div className='mb-10 text-xl sm:text-2xl md:text-2xl font-bold font-sans text-[#556BB1] text-center'>
                Was this response helpful? Please share your feedback with us!
            </div>
            <div className='max-h-40 w-full overflow-y-auto border rounded'>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className='divide-y divide-gray-200'>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Got satisfactory response in</label>
                            <button type="button"
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                                onClick={() => updateField('satisfactoryResponse', FeedResponseContent.Two2FiveMinutes)}
                                >
                                <div className='flex-grow'>{FeedResponseContent.Two2FiveMinutes}</div> {isSelected("satisfactoryResponse", FeedResponseContent.Two2FiveMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-200 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('satisfactoryResponse', FeedResponseContent.Six2TenMinutes)}
                                >
                                {FeedResponseContent.Six2TenMinutes} {isSelected("satisfactoryResponse", FeedResponseContent.Six2TenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('satisfactoryResponse', FeedResponseContent.Eleven2FifteenMinutes)}
                                >
                                {FeedResponseContent.Eleven2FifteenMinutes} {isSelected("satisfactoryResponse", FeedResponseContent.Eleven2FifteenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-yellow-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('satisfactoryResponse', FeedResponseContent.Sixteen2TwentyMinutes)}
                                >
                                {FeedResponseContent.Sixteen2TwentyMinutes} {isSelected("satisfactoryResponse", FeedResponseContent.Sixteen2TwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('satisfactoryResponse', FeedResponseContent.MoreThanTwentyMinutes)}
                                >
                                {FeedResponseContent.MoreThanTwentyMinutes} {isSelected("satisfactoryResponse", FeedResponseContent.MoreThanTwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Signed note with edits in</label>
                            <button type="button"
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('timeToSignedNotes', FeedResponseContent.Two2FiveMinutes)}
                                >
                                {FeedResponseContent.Two2FiveMinutes} {isSelected("timeToSignedNotes", FeedResponseContent.Two2FiveMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-200 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('timeToSignedNotes', FeedResponseContent.Six2TenMinutes)}
                                >
                                {FeedResponseContent.Six2TenMinutes} {isSelected("timeToSignedNotes", FeedResponseContent.Six2TenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('timeToSignedNotes', FeedResponseContent.Eleven2FifteenMinutes)}
                                >
                                {FeedResponseContent.Eleven2FifteenMinutes} {isSelected("timeToSignedNotes", FeedResponseContent.Eleven2FifteenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-yellow-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('timeToSignedNotes', FeedResponseContent.Sixteen2TwentyMinutes)}
                                >
                                {FeedResponseContent.Sixteen2TwentyMinutes} {isSelected("timeToSignedNotes", FeedResponseContent.Sixteen2TwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField('timeToSignedNotes', FeedResponseContent.MoreThanTwentyMinutes)}
                                >
                                {FeedResponseContent.MoreThanTwentyMinutes} {isSelected("timeToSignedNotes", FeedResponseContent.MoreThanTwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Total time taken to complete note</label>
                            <button type="button" 
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("totalDuration", FeedResponseContent.Six2TenMinutes)}
                                >
                                {FeedResponseContent.Six2TenMinutes} {isSelected("totalDuration", FeedResponseContent.Six2TenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-200 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("totalDuration", FeedResponseContent.Eleven2FifteenMinutes)}
                                >
                                {FeedResponseContent.Eleven2FifteenMinutes} {isSelected("totalDuration", FeedResponseContent.Eleven2FifteenMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-yellow-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("totalDuration", FeedResponseContent.Sixteen2TwentyMinutes)}
                                >
                                {FeedResponseContent.Sixteen2TwentyMinutes} {isSelected("totalDuration", FeedResponseContent.Sixteen2TwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("totalDuration", FeedResponseContent.MoreThanTwentyMinutes)}
                                >
                                {FeedResponseContent.MoreThanTwentyMinutes} {isSelected("totalDuration", FeedResponseContent.MoreThanTwentyMinutes) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Response accuracy</label>
                            <button type="button" 
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("responseAccuracy", FeedResponseContent.AboveExpectation)}
                                >
                                {FeedResponseContent.AboveExpectation} {isSelected("responseAccuracy", FeedResponseContent.AboveExpectation) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-200 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("responseAccuracy", FeedResponseContent.Satisfactory)}
                                >
                                {FeedResponseContent.Satisfactory} {isSelected("responseAccuracy", FeedResponseContent.Satisfactory) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("responseAccuracy", FeedResponseContent.BelowExpectation)}
                                >
                                {FeedResponseContent.BelowExpectation} {isSelected("responseAccuracy", FeedResponseContent.BelowExpectation) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Decrease in note related stress</label>
                            <button type="button" 
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("decreaseInStress", FeedResponseContent.DecreasedStress)}
                                >
                                {FeedResponseContent.DecreasedStress} {isSelected("decreaseInStress", FeedResponseContent.DecreasedStress) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("decreaseInStress", FeedResponseContent.None)}
                                >
                                {FeedResponseContent.None} {isSelected("decreaseInStress", FeedResponseContent.None) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-yellow-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("decreaseInStress", FeedResponseContent.AccuracyMakesUp)}
                                >
                                {FeedResponseContent.AccuracyMakesUp} {isSelected("decreaseInStress", FeedResponseContent.AccuracyMakesUp) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full "
                                onClick={() => updateField("decreaseInStress", FeedResponseContent.MoreStress)}
                                >
                                {FeedResponseContent.MoreStress} {isSelected("decreaseInStress", FeedResponseContent.MoreStress) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        <div className='flex py-3 mx-5'>
                            <label className='mr-5'>Overall experience</label>
                            <button type="button" 
                                className="flex bg-blue-500 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                                onClick={() => updateField("overallExperience", FeedResponseContent.AboveExpectation)}
                                >
                                {FeedResponseContent.AboveExpectation} {isSelected("overallExperience", FeedResponseContent.AboveExpectation) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-blue-200 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                                onClick={() => updateField("overallExperience", FeedResponseContent.Satisfactory)}
                                >
                                {FeedResponseContent.Satisfactory} {isSelected("overallExperience", FeedResponseContent.Satisfactory) && <IconCheck size={15}/>}
                            </button>
                            <button type="button" 
                                className="flex bg-red-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                                onClick={() => updateField("overallExperience", FeedResponseContent.BelowExpectation)}
                                >
                                {FeedResponseContent.BelowExpectation} {isSelected("overallExperience", FeedResponseContent.BelowExpectation) && <IconCheck size={15}/>}
                            </button>
                        </div>
                        
                        <textarea className='mx-5 my-3 border rounded w-full sm:w-3/4'
                            placeholder='Any other comments...'
                            value={formData.feedback}
                            rows={2}
                            onChange={(e) => updateField("feedback", e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center mt-4'>
                        {/* <div className='w-1/4'></div> */}
                        <button className='border rounded bg-blue-600 text-white px-4 py-2 sm:w-auto w-full' type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
