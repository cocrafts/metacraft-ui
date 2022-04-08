import React, { FC, Fragment } from 'react';
import { useSnapshot } from 'valtio';

import { modalState } from '../../utils/store/modal';

import ModalContainer from './ModalContainer';
export const ModalManager: FC = () => {
	const { hashmap } = useSnapshot(modalState);
	const instances = Object.values(hashmap);

	return (
		<Fragment>
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item} />;
			})}
		</Fragment>
	);
};

export default ModalManager;

export * from './shared';
