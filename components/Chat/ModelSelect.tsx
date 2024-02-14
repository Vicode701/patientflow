import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';
import { OpenAIModel } from '@/types/openai';
import HomeContext from '../../types/home.context';

export const ModelSelect = () => {

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // selectedConversationSubset &&
    //   handleUpdateConversation(selectedConversationSubset, {
    //     key: 'model',
    //     value: models.find(
    //       (model) => model.id === e.target.value,
    //     ) as OpenAIModel,
    //   });
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {'Model'}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={'Select a model' || ''}
          value={selectedConversation?.model?.id || defaultModelId}
          onChange={handleChange}
        >
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
