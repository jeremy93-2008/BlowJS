import React from "react";
import Enzyme, {mount} from 'enzyme';
import 'jsdom-global/register';
//@ts-ignore
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ITestActions, ITestStore, testStore} from "../store";
import {createScopeSubscriber} from "../../src/scope";
import {TestComponent} from "../testComponent";

Enzyme.configure({ adapter: new Adapter() })

describe("scopeSubscribers", () => {
    test("Emit Action", () => {
        const scopedSubscribers = createScopeSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = mount(
            <TestComponent subscribers={scopedSubscribers.Scope.subscribers as any} />
            ,{
                wrappingComponent: scopedSubscribers.Scope.Provider,
            }
        )

        component.find("button.emitBtn").simulate("click")

        expect(component.find("span").text()).toEqual("Jeremy")
    })

    test("Emit and subscribe with correct action name are executed", () => {
        const scopedSubscribers = createScopeSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = mount(
            <TestComponent subscribers={scopedSubscribers.Scope.subscribers as any} />
            ,{
                wrappingComponent: scopedSubscribers.Scope.Provider,
            }
        )

        component.find("button.subscribeBtn").simulate("click")

        expect(component.find(".subscribe").text()).toEqual("Buenas")
    })

    test("Broadcast subscriber execute everything", () => {
        const scopedSubscribers = createScopeSubscriber<ITestStore, ITestActions, any>(testStore)

        const component = mount(
            <TestComponent subscribers={scopedSubscribers.Scope.subscribers as any} />
            ,{
                wrappingComponent: scopedSubscribers.Scope.Provider,
            }
        )

        component.find("button.broadcastBtn").simulate("click")

        expect(component.find(".subscribe").text()).toEqual("Buenas")
    })
})