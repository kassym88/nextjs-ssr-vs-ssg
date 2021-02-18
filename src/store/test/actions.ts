import { TestActionPayload } from './types';
import { actionCreator } from '../utils';

export const SET_TEST_DATA = 'set/test';

export const setTestData = actionCreator<TestActionPayload>(SET_TEST_DATA);
