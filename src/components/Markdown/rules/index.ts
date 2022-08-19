import { defaultRules, ParserRules } from 'simple-markdown';

import checkList from './checkList';
import heading from './heading';
import paragraph from './paragraph';
import strong from './strong';
import text from './text';

const rules: ParserRules = {
	...defaultRules,
	paragraph,
	text,
	strong,
	heading,
	checkList,
};

export default rules;
