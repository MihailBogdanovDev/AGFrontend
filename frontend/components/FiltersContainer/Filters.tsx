'use client'
import React from "react";
import { ControlsCloseSmallTypeStrokeSize16Px } from "./ControlsCloseSmallTypeStrokeSize16Px";
import { DownRegular } from "./DownRegular";
import { Icon } from "./Icon";
import { IconComponentNode } from "./IconComponentNode";
import { LoFiText } from "./LoFiText";
import "./style.css";

export const LoFiHorizontal = () => {
  return (
    <div className="lo-fi-horizontal">
      <header className="header">
        <div className="text-wrapper-2">Historical Sales Model</div>
      </header>
      <div className="inputs">
        <div className="input-field">
          <div className="input-box">
            <div className="text-wrapper-3">+ Add New Hierarchy</div>
          </div>
        </div>
      </div>
      <div className="low-fi-side-menu">
        <div className="text-wrapper-4">Country Hierarchy</div>
        <div className="paragraph-container">
          <LoFiText
            center="off"
            className="lo-fi-text-instance"
            hasText={false}
            hasTextWrapper={false}
            size="fifteen"
            textClassName="design-component-instance-node"
          />
        </div>
        <DownRegular className="chevron-down-regular" />
      </div>
      <div className="filter-dropdown-list">
        <div className="frame">
          <div className="div-2">
            <div className="label-text">Location</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
          <div className="div-2">
            <div className="label-text-2">Sales</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
          <div className="div-2">
            <div className="label-text-2">Lorem Ipsum</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
        </div>
        <div className="frame">
          <div className="div-2">
            <div className="label-text-2">Date</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
          <div className="div-2">
            <div className="label-text-2">Lorem Ipsum</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
          <div className="div-2">
            <div className="label-text-2">Lorem Ipsum</div>
            <ControlsCloseSmallTypeStrokeSize16Px
              className="controls-close-small-type-stroke-size-16px"
              color="white"
            />
          </div>
        </div>
      </div>
      <div className="filter-section">
        <div className="low-fi-side-menu-2">
          <div className="text-wrapper-5">Driver Impact</div>
          <div className="paragraph-container">
            <LoFiText
              center="off"
              className="lo-fi-text-instance"
              hasText={false}
              hasTextWrapper={false}
              size="fifteen"
              textClassName="lo-fi-text-2"
            />
          </div>
          <DownRegular className="down-regular" />
        </div>
        <div className="filter-dropdown-list-2">
          <div className="container">
            <div className="low-fi-check">
              <div className="checkbox-base">
                <Icon className="icon-instance" />
              </div>
              <div className="text-wrapper-6">Use historical</div>
            </div>
            <div className="low-fi-check">
              <div className="checkbox-base-2" />
              <div className="text-wrapper-7">Use project lifecycle</div>
            </div>
          </div>
          <div className="container">
            <div className="low-fi-check">
              <div className="checkbox-base">
                <Icon className="icon-instance" />
              </div>
              <div className="text-wrapper-6">Use historical</div>
            </div>
            <div className="low-fi-check">
              <div className="checkbox-base-3" />
              <div className="text-wrapper-6">Use historical</div>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-section">
        <div className="low-fi-side-menu-2">
          <div className="text-wrapper-5">Forecast Periods</div>
          <div className="paragraph-container">
            <LoFiText
              center="off"
              className="lo-fi-text-instance"
              hasText={false}
              hasTextWrapper={false}
              size="fifteen"
              textClassName="lo-fi-text-3"
            />
          </div>
          <DownRegular className="down-regular" />
        </div>
        <div className="low-fi-slider">
          <div className="slider">
            <div className="progress">
              <div className="overlap-group">
                <div className="line" />
                <div className="knob" />
              </div>
            </div>
          </div>
          <div className="navbar">
            <div className="text-wrapper-8">12</div>
            <div className="text-wrapper-9">24</div>
            <div className="text-wrapper-9">48</div>
            <div className="text-wrapper-9">60</div>
            <div className="text-wrapper-9">120</div>
          </div>
        </div>
      </div>
      <div className="low-fi-dropdown">
        <div className="text-wrapper-10">Start Date</div>
        <div className="search">
          <div className="text-wrapper-11">18/08/2023</div>
          <div className="text-container">
            <div className="text-3" />
          </div>
          <IconComponentNode className="down-regular-instance" />
        </div>
      </div>
    </div>
  );
};
