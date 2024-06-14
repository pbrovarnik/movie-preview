import { createTypedHooks } from 'easy-peasy';
import { Model } from './model';

const typedHooks = createTypedHooks<Model>();

export const { useStoreActions, useStoreState } = typedHooks;
