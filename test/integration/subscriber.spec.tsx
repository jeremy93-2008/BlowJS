import React, {useState} from "react";
import Enzyme, {shallow} from 'enzyme';
//@ts-ignore
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSubscriber} from "../../src/subscriber";
import {ITestActions, ITestStore, testStore} from "../store";
import {ICreateSubscriberReturn} from "../../src/typing/blow.typing";
import {useEmitter} from "../../src/useEmitter";
import {useCallback} from "react";
import {useDataSubscription} from "../../src/useDataSubscription";
import {useSubscription} from "../../src/useSubscription";
import {TestComponent} from "../testComponent";

Enzyme.configure({ adapter: new Adapter() })

describe("globalSubscribers", () => {
    test("Emit Action", () => {
        const globalSubscribers = createSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = shallow(
            <TestComponent subscribers={globalSubscribers} />
        )

        component.find("button.emitBtn").simulate("click")

        expect(component.find("span").text()).toEqual("Jeremy")
    })

    test("Emit and subscribe with correct action name are executed", () => {
        const globalSubscribers = createSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = shallow(
            <TestComponent subscribers={globalSubscribers} />
        )

        component.find("button.subscribeBtn").simulate("click")

        expect(component.find(".subscribe").text()).toEqual("Buenas")
    })

    test("Broadcast subscriber execute everything", () => {
        const globalSubscribers = createSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = shallow(
            <TestComponent subscribers={globalSubscribers} />
        )

        component.find("button.broadcastBtn").simulate("click")

        expect(component.find(".subscribe").text()).toEqual("Buenas")
    })
})