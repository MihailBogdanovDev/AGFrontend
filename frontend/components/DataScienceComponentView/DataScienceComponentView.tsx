'use client';
import React, { useState } from 'react';
import { Group, Button, Checkbox, ScrollArea, Slider, Text, Radio, RadioGroup } from '@mantine/core';
import classes from './DataScienceComponentView.module.css'
import { useMediaQuery } from '@mantine/hooks';


type CheckboxStates = {
    [key: string]: boolean;
};

type SVGToggleStates = {
    [key: string]: boolean;
};


export default function DataScienceComponentView() {

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
    const [svgToggleStates, setSvgToggleStates] = useState<SVGToggleStates>({
        svg1: false,
        svg2: false,
        svg3: false,
        svg4: false,
        svg5: false,
        svg6: false
        // Add more if needed
    });

    const largeScreen = useMediaQuery('(min-width: 2000px)');


    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
    };

    // Specify the types for parameters
    const handleCheckboxChange = (id: string) => {
        setCheckboxStates(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleSvg = (svgId: string) => {
        setSvgToggleStates(prevState => ({
            ...prevState,
            [svgId]: !prevState[svgId]
        }));
    };

    // Specify the types for parameters
    const renderCheckbox = (id: string, label: string) => (
        <div className={checkboxStates[id] ? classes.inputBox : classes.inputBoxNotActivated}>
            <Checkbox
                label={label}
                checked={!!checkboxStates[id]} // Convert to boolean
                onChange={() => handleCheckboxChange(id)}
                size="sm"
            />
        </div>
    );
    const scrollAreaHeight = largeScreen ? 1200 : 595;
    return (
        <Group className={classes.groupbox}>
            <div>
                <p className={classes.componentViewText}>Component View</p>
            </div>
            <div className={classes.ScrollArea}>
                <ScrollArea h={scrollAreaHeight} scrollbarSize={5}>
                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg1')}>
                            <p className={classes.hierarchiesHeaderText}>Location Hierarchy</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg1 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg1 &&
                            (
                                <>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox1', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox2', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox3', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox4', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox5', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                    </div>
                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg2')}>
                            <p className={classes.hierarchiesHeaderText}>Product Hierarchy</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg2 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg2 &&
                            (
                                <>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox6', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox7', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox8', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox9', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox11', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                    </div>
                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg3')}>
                            <p className={classes.hierarchiesHeaderText}>Sales Hierarchy</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg3 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg3 &&
                            (
                                <>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox12', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox13', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox14', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox15', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.filterDropdownList}>
                                        <div className={classes.input}>
                                            <div className={classes.inputField}>
                                                {renderCheckbox('checkbox16', 'I agree to sell my privacy')}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                    </div>




                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg4')}>
                            <p className={classes.hierarchiesHeaderText}>Driver Impact</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg4 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg4 &&
                            (
                                <>
                                    <div className={classes.filterDropdownListDrivers}>
                                        <div className={classes.inputFieldDriver}>
                                            <Checkbox
                                                label={'checkbox17'}
                                                size="sm"
                                            />
                                        </div>
                                        <div className={classes.inputFieldDriver}>
                                            <Checkbox
                                                label={'checkbox18'}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                    </div>















                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg5')}>
                            <p className={classes.hierarchiesHeaderText}>Forecast Horizon</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg5 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg5 &&
                            (
                                <>
                                    <Slider
                                        color="blue"
                                        size={10}
                                        max={48}
                                        marks={[
                                            { value: 1, label: '1' },
                                            { value: 4, },
                                            { value: 8, },
                                            { value: 12, label: '12' },
                                            { value: 16, },
                                            { value: 20, },
                                            { value: 24, label: '24' },
                                            { value: 28, },
                                            { value: 32, },
                                            { value: 36, label: '36' },
                                            { value: 40, },
                                            { value: 44, },
                                            { value: 48, label: '48' },
                                        ]}
                                    />
                                    <Text mt="md" size="sm" style={{ textAlign: 'center' }}>
                                        Weeks
                                    </Text>

                                </>
                            )}
                    </div>







                    <div className={classes.filterSelection}>
                        <div className={classes.hierarchiesHeader} onClick={() => toggleSvg('svg6')}>
                            <p className={classes.hierarchiesHeaderText}>Forecast Bucket</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={svgToggleStates.svg6 ? classes.rotateIcon : ""}
                            >
                                <path d="M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10" stroke="#7C8B9D" stroke-width="1.67" stroke-linecap="round" />

                            </svg>
                        </div>
                        {svgToggleStates.svg6 &&
                            (
                                <>
                                    <Radio.Group>
                                        <Group mt="xs">
                                            <Radio value="Daily" label="Daily" />
                                            <Radio value="Weekly" label="Weekly" />
                                            <Radio value="Monthly" label="Monthly" />
                                        </Group>
                                    </Radio.Group>
                                </>
                            )}
                    </div>


                </ScrollArea>
            </div>
        </Group >
    );
}