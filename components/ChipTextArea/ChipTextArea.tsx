import { IconX } from '@tabler/icons-react';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CommonWorkupOptions, CommonHistoryOptions } from '@/utils/app/const';

interface ChipProps {
    value: string;
    onClose: (value: string) => void;
}

const Chip: React.FC<ChipProps> = ({ value, onClose }) => {
    return (
        <span className="inline-flex items-center bg-gray-200 rounded px-2 py-1 m-1 text-black">
            {value}
            <IconX
                className="ml-2 bg-orange-500 text-white rounded-full h-4 w-4 flex items-center justify-center"
                size={18}
                onClick={() => onClose(value)}
            />
        </span>
    );
};

interface ChipTextAreaProps {
    placeHolder: string;
    chips: string[];
    onChipsChange: (chips: string[]) => void;
    name: string;
    
}

const ChipTextArea: React.FC<ChipTextAreaProps> = ({ placeHolder,chips, onChipsChange, name }) => {
    const [text, setText] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const options = useMemo(() => {
        switch (name) {
            case "history":
                return CommonHistoryOptions;
            case "workup":
                return CommonWorkupOptions;
            default:
                return [];
        }
    }, [name]);
    
    useEffect(() => {
        if (!dropdownVisible) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownVisible(false);
            }
        };
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value.includes(',')) {
            const newChips = value.split(',').map(s => s.trim()).filter(s => s);
            onChipsChange([...chips, ...newChips]);
            setText('');
            if (inputRef.current) inputRef.current.value = '';  // clear contentEditable div
        } else {
            setText(value);
        }
    };

    const handleChipClose = (chipValue: string) => {
        const newChips = chips.filter(chip => chip !== chipValue);
        onChipsChange(newChips);
    };

    const handleOptionClick = (option: string) => {
        const isAlreadySelected = chips.includes(option);
        if (isAlreadySelected) {
            const newChips = chips.filter(chip => chip !== option);
            onChipsChange(newChips);
        } else {
            onChipsChange([...chips, option]);
        }
    };

    const handleDoubleClick = () => {
        setDropdownVisible(true);
    };

    const handleDropdownConfirm = () => {
        onChipsChange([...chips, ...selectedOptions]);
        setSelectedOptions([]);
        setDropdownVisible(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredOptions = useMemo(() => (
        options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [options, searchTerm]);
    
    return (
        <div className="relative border-neutral-200 w-full bg-white px-10 py-2 rounded-md text-black md:mb-0 md:mt-2">
            <div className="flex flex-col">
                <div className='max-h-20 overflow-y-auto'>
                    {chips.map(chip => (
                        <Chip key={chip} value={chip} onClose={handleChipClose} />  // Render chips
                    ))}
                </div>
                <input
                    className="outline-none w-4/5" //focus:outline-2 focus:outline-blue-500/50" 
                    onInput={handleInputChange} 
                    onDoubleClick={handleDoubleClick}
                    ref={inputRef}
                    placeholder={placeHolder}
                />
            </div>
            {dropdownVisible && (
                <div ref={dropdownRef} className="text-white bg-[#5c77da] rounded border border-blue-300 p-2 mt-2 w-3/4 max-h-40 overflow-y-auto">
                    <input 
                        type="text" 
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 mb-2 border rounded text-black focus:outline-none"
                    />

                    {filteredOptions.map(option => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`cursor-pointer p-2 rounded ${chips.includes(option) ? 'bg-[#556BB1]' : ''}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChipTextArea;
